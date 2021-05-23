const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: 'dicestarter@gmail.com',
    pass: 'deetzmdfdiibdxkc',
  },
  tls: {
    rejectUnauthorized: false,
  },
});
module.exports = {
  transporter,
};
