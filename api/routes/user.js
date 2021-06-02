/* eslint-disable no-console */
const express = require('express');

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isAdmin = require('../middleware/auth');
const { isNotLogged } = require('../middleware/logged');
const { transporter } = require('../configs/mailer');
const template = require('./emails/emailRegistration');
const templateForgottenPassword = require('./emails/emailForgottenPassword');
const templatePassword = require('./emails/emailPassword');
const templateSubscribe = require('./emails/emailSubscribe');
const templateUnsubscribe = require('./emails/emailUnsubscribe');

const {
  accessTokenSecret,
} = process.env;

let {
  NEW_ID,
} = process.env;

// eslint-disable-next-line radix
NEW_ID = parseInt(NEW_ID);

const router = express.Router();

const { User } = require('../db');

router.get('/:id', isAdmin, (req, res, next) => {
  User.findByPk(req.params.id)
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

router.post('/signup', isNotLogged, (req, res, next) => {
  const id = uuidv4();
  let { password } = req.body;
  const {
    name,
    firstName,
    lastName,
    birthday,
    country,
    email,
  } = req.body;
  const today = new Date();
  const birth = new Date(birthday);
  const currentYear = today.getFullYear();
  const birthYear = birth.getFullYear();
  if (currentYear - birthYear < 13) return res.send('Must be over 13 years old');
  if (currentYear - birthYear > 100) return res.send('The maximum age is 100 years');
  bcrypt.hash(password, 10, (err, hash) => {
    password = hash;
    if (err) {
      next(err);
    }
    const newUser = {
      id,
      name,
      firstName,
      lastName,
      birthday,
      country,
      email,
      password,
    };
    User.create(newUser).then(async (info) => {
      // error handling for the client
      if (newUser.name === name) return res.send('Username already exists');
      if (newUser.email === email) return res.send('Email already exists');
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"DiceStarter 👻" <dicestarter@gmail.com>', // sender address
        to: newUser.email, // list of receivers
        subject: 'SignUp Success ✔', // Subject line
        html: template(newUser.name, newUser.firstName, newUser.lastName), // html body
      });
      return res.send(info);
    })
      .catch((e) => {
        res.status(400);
        next(e);
      });
  });
  return null;
});

router.post('/signupgoogle', async (req, res, next) => {
  const id = uuidv4();
  const {
    name,
    firstName,
    lastName,
    email,
    googleId,
    profilePicture,
  } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    const accessToken = jwt.sign({
      name: user.name,
      role: user.role,
    }, accessTokenSecret);
    return res.send({
      user: user.dataValues,
      token: accessToken,
    });
  }
  const newUser = {
    id,
    name: `${name}#${NEW_ID}`,
    firstName,
    lastName,
    email,
    googleId,
    profilePicture,
  };
  NEW_ID += 1;
  User.create(newUser).then(async () => {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"DiceStarter 🎲" <dicestarter@gmail.com>', // sender address
      to: newUser.email, // list of receivers
      subject: 'SignUp Success ✔', // Subject line
      html: template(newUser.name, newUser.firstName, newUser.lastName), // html body
    });
    return res.send({ msg: 'User created' });
  })
    .catch((e) => {
      res.status(400);
      next(e);
    });
  return null;
});

router.post('/signin', isNotLogged, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    let user;
    const emailRegEx = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (username && password) {
      // eslint-disable-next-line no-unused-expressions
      emailRegEx.test(username)
        ? user = await User.findOne({ where: { email: username } })
        : user = await User.findOne({ where: { name: username } });
      if (user.status === 'Banned') return res.status(401).send('User banned');
      if (user.status === 'Closed') return res.status(401).send('Account closed');
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.send('password invalid');
        if (result) {
          const accessToken = jwt.sign({
            name: user.name,
            role: user.role,
          }, accessTokenSecret);
          return res.send({
            user: user.dataValues,
            token: accessToken,
          });
        }
        return res.send('User not found');
      });
    }
    if (!password || !username) {
      return res.send('Input invalid');
    }
  } catch (e) {
    res.status(400).send('User not Found');
    next(e);
  }
  return null;
});

router.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.send('Logout successful');
});

router.post('/admin', (req, res, next) => {
  const id = uuidv4();
  try {
    let { password } = req.body;
    const {
      name,
      firstName,
      lastName,
      birthday,
      country,
      email,
    } = req.body;
    const role = 'Admin';
    bcrypt.hash(password, 10, (err, hash) => {
      password = hash;
      if (err) {
        next(err);
      }
      const newUser = {
        id,
        name,
        firstName,
        lastName,
        birthday,
        country,
        email,
        role,
        password,
      };
      User.create(newUser).then((info) => res.send(info))
        .catch((error) => next(error));
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    User.findByPk(id)
      .then((response) => {
        response.update(body, { where: { id } });
        res.status(200).send('OK');
      }).catch((e) => next(e));
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.put('/:id/updatePassword', (req, res, next) => {
  const { id } = req.params;
  let { password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    password = hash;
    if (err) {
      next(err);
    }
    req.body.password = password;
    User.findByPk(id)
      .then((response) => {
        response.update({ password }, { where: { id } })
          .then(async () => {
            await transporter.sendMail({
              from: '"DiceStarter 🎲" <dicestarter@gmail.com>', // sender address
              to: response.email, // list of receivers
              subject: 'Recover your password', // Subject line
              html: templatePassword(response.firstName, response.lastName), // html body
            });
            res.send('Password Update');
          });
      }).catch((e) => next(e));
  });
});

router.put('/:email/subscribe', (req, res, next) => {
  const { email } = req.params;
  User.findOne({ where: { email } })
    .then((response) => {
      const subscriber = response.subscriber === 'false' ? 'true' : 'false';
      response.update({ subscriber })
        .then(async () => {
          if (response.subscriber === 'true') {
            await transporter.sendMail({
              from: '"DiceStarter 🎲" <dicestarter@gmail.com>', // sender address
              to: response.email, // list of receivers
              subject: 'Subscribe Success ✔', // Subject line
              html: templateSubscribe(response.firstName, response.lastName), // html body
            });
            res.status(200).send('Thank you for subscribe');
          } else {
            await transporter.sendMail({
              from: '"DiceStarter 🎲" <dicestarter@gmail.com>', // sender address
              to: response.email, // list of receivers
              subject: 'Unsubscribe Success ✔', // Subject line
              html: templateUnsubscribe(response.firstName, response.lastName), // html body
            });
            res.status(200).send('unsubscribe');
          }
        });
    }).catch((e) => next(e));
});

router.put('/:email/recoverpassword', (req, res, next) => {
  const { email } = req.params;
  let { password } = req.body;
  const { confirmPassword } = req.body;
  if (password === confirmPassword) {
    bcrypt.hash(password, 10, (err, hash) => {
      password = hash;
      if (err) {
        return next(err);
      }
      req.body.password = password;
      User.findOne({ where: { email } })
        .then((response) => {
          response.update({ password }, { where: { email } })
            .then(async () => {
              await transporter.sendMail({
                from: '"DiceStarter 🎲" <dicestarter@gmail.com>', // sender address
                to: response.email, // list of receivers
                subject: 'Recover your password', // Subject line
                html: templatePassword(response.firstName, response.lastName), // html body
              });
              return res.send('Password Update');
            });
        }).catch((e) => next(e));
      return null;
    });
  } else {
    return res.status(400).send('The two passwords must match');
  }
  return null;
});

router.get('/:email/recoverpassword', (req, res, next) => {
  const { email } = req.params;
  User.findOne({ where: { email } })
    .then(async (response) => {
      if (response) {
        await transporter.sendMail({
          from: '"DiceStarter 🎲" <dicestarter@gmail.com>', // sender address
          to: response.email, // list of receivers
          subject: 'Recover your password', // Subject line
          html: templateForgottenPassword(response.firstName,
            response.lastName,
            email), // html body
        });
        return res.send('E-mail sent');
      }
      return res.status(404).send('Account no exist');
    }).catch((e) => next(e));
});

module.exports = router;
