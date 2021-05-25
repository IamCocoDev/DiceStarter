import React, {useState, useEffect} from 'react';
import {formData, formInputData, registerInput} from '../../types';
import CountrySelect from '../countrySelect/countrySelect';
import {useAppDispatch} from '../../app/hooks';
import {sendFormAsync} from '../../app/actions/actionsUser';
import './formRegisterForm.css';
import {Redirect} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import GoogleComp from '../googleComp/googleComp';

function deepEqualError(a: registerInput) {
  return JSON.stringify(a) === JSON.stringify({
    name: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    country: '',
  });
};

function validate(input: registerInput) {
  const errors: registerInput = {
    name: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    country: '',
  };
  if (!input.name) {
    errors.name = 'name is required';
  } else if (!/[0-9a-zA-Z]{5,}/.test(input.name)) {
    errors.name = 'name is invalid';
  }
  if (!input.email) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
    errors.email = 'Email is invalid';
  }
  if (!input.firstName) {
    errors.firstName = 'firstName is required';
  } else if (/[\d.]/.test(input.firstName)) {
    errors.firstName = 'firstName is invalid';
  }
  if (!input.lastName) {
    errors.lastName = 'lastName is required';
  } else if (/[\d.]/.test(input.lastName)) {
    errors.lastName = 'lastName is invalid';
  }
  if (!input.birthday) {
    errors.birthday = 'birthday is required';
  }
  if (!input.password) {
    errors.password = 'Password is required';
  } else if (!/[0-9a-zA-Z]{6,}/.test(input.password)) {
    errors.password = 'Password is invalid';
  }
  if (input.password !== input.confirmPassword || !input.confirmPassword) {
    errors.confirmPassword = 'Passwords are not equal';
  } else if (!/[0-9a-zA-Z]{6,}/.test(input.password) &&
    /[0-9]/.test(input.password)) {
    errors.password = 'Password is invalid';
  }
  if (!input.country || input.country === '0') {
    errors.country = 'Select a country';
  }
  return errors;
};

const FormRegisterForm = () => {
  const dispatch = useAppDispatch();
  const [redirect, setRedirect] = useState(false);
  const [input, setInput] = useState<registerInput>({
    name: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    country: '0',
  });

  const [errors, setErrors] = useState<registerInput>({
    name: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    country: '',
  });

  const handleSubmit = (e: formData) => {
    e.preventDefault();
    if (deepEqualError(errors)) {
      alert('Register completed!');
      dispatch(sendFormAsync(input));
      setRedirect(true);
      setInput({
        name: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        birthday: '',
        country: '',
      });
    } else {
      alert('Complete the requiered spaces!');
    }
  };

  const handleChange = (e: formInputData) => {
    const data: string = e.target.value;
    setInput({...input, [e.target.name]: data});
  };

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);
  return (
    <div className='registerBackground'>
      {
        redirect === true &&
        <Redirect to={`/home?page=1`}></Redirect>
      }
      <form className='registerGrid' onSubmit={handleSubmit}>
        <div className='registerName'>
          <label className='registerH1' htmlFor="">Name</label>
          <input className='registerInput'
            type="text"
            name="name"
            onChange={handleChange}
            value={input.name}
          />
          <p className='registerError'>{errors.name}</p>
        </div>
        <div className='registerFirstName'>
          <label className='registerH1' htmlFor="">First Name</label>
          <input className='registerInput'
            type="text"
            name="firstName"
            onChange={handleChange}
            value={input.firstName}
          />
          <p className='registerError'>{errors.firstName}</p>
        </div>
        <div className='registerLastName'>
          <label className='registerH1' htmlFor="">Last Name</label>
          <input className='registerInput'
            type="text"
            name="lastName"
            onChange={handleChange}
            value={input.lastName}
          />
          <p className='registerError'>{errors.lastName}</p>
        </div>
        <div className='registerEmail'>
          <label className='registerH1' htmlFor="">Email</label>
          <input className='registerInput'
            type="email"
            name="email"
            onChange={handleChange}
            value={input.email}
          />
          <p className='registerError'>{errors.email}</p>
        </div>
        <div className='registerBirthDay'>
          <label className='registerH1' htmlFor="">Date of Birth</label>
          <input className='registerInput'
            type="date"
            name="birthday"
            onChange={handleChange}
            min={'1921-01-01'}
            max={'2008-12-31'}
            value={input.birthday}
          />
          <p className='registerError'>{errors.birthday}</p>
        </div>
        <div className='registerCountry'>
          <CountrySelect
            handle={handleChange}
            val={input.country} />
          <p className='registerError'>{errors.country}</p>
        </div>
        <div className='registerPassword'>
          <label className='registerH1' htmlFor="">Password</label>
          <input className='registerInput'
            type="password"
            name="password"
            onChange={handleChange}
            value= {input.password}
          />
          <p className='registerError'>{errors.password}</p>
        </div>
        <div className='registerConfirmPassword'>
          <label className='registerH1' htmlFor="">Confirm Password</label>
          <input className='registerInput'
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={input.confirmPassword}
          />
          <p className='registerError'>{errors.confirmPassword}</p>
        </div>
        <button className='registerSendRegister' type="submit">Register</button>
        <div className='loginGoogle1'>
          <GoogleComp/>
        </div>
      </form>
    </div>
  );
};

export default FormRegisterForm;
