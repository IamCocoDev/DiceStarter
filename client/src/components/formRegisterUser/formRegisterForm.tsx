import React, {useState, useEffect} from 'react';
import {formData, formInputData, registerInput} from '../../types';
import CountrySelect from '../countrySelect/countrySelect';

function deepEqualError(a: registerInput) {
  return JSON.stringify(a) === JSON.stringify({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    date: '',
    country: '',
  });
};

function validate(input: registerInput) {
  const errors: registerInput = {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    date: '',
    country: '',
  };
  if (!input.username) {
    errors.username = 'Username is required';
  } else if (!/[0-9a-zA-Z]{5,}/.test(input.username)) {
    errors.username = 'Username is invalid';
  }
  if (!input.email) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
    errors.email = 'Email is invalid';
  }
  if (!input.firstname) {
    errors.firstname = 'Firstname is required';
  } else if (!/[\d.]/.test(input.firstname)) {
    errors.firstname = 'firstname is invalid';
  }
  if (!input.lastname) {
    errors.lastname = 'Lastname is required';
  } else if (!/[\d.]/.test(input.lastname)) {
    errors.lastname = 'lastname is invalid';
  }
  if (!input.date) {
    errors.date = 'Date is required';
  }
  if (!input.password) {
    errors.password = 'Password is required';
  } else if (!/(?=.*[0-9]){5,}/.test(input.password)) {
    errors.password = 'Password is invalid';
  }
  if (input.password !== input.confirmPassword || !input.confirmPassword) {
    errors.confirmPassword = 'Passwords are not equal';
  } else if (!/(?=.*[0-9]){5,}/.test(input.password)) {
    errors.password = 'Password is invalid';
  }
  if (!input.country || input.country === '0') {
    errors.country = 'Select a country';
  }
  return errors;
};

const FormRegisterForm = () => {
  const [input, setInput] = useState<registerInput>({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    date: '',
    country: '',
  });

  const [errors, setErrors] = useState<registerInput>({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    date: '',
    country: '',
  });

  const handleSubmit = (e: formData) => {
    e.preventDefault();
    if (deepEqualError(errors)) {
      alert('Register completed!');
      console.log(input);
      setInput({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        date: '',
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
    console.log(input);
  }, [input]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input type="text"
            name="username"
            onChange={handleChange}
            value={input.username}
          />
          <p>{errors.username}</p>
        </div>
        <div>
          <label htmlFor="">Firstname</label>
          <input type="text"
            name="firstname"
            onChange={handleChange}
            value={input.firstname}
          />
          <p>{errors.firstname}</p>
          <label htmlFor="">Lastname</label>
          <input type="text"
            name="lastname"
            onChange={handleChange}
            value={input.lastname}
          />
          <p>{errors.lastname}</p>
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email"
            name="email"
            onChange={handleChange}
            value={input.email}
          />
          <p>{errors.email}</p>
        </div>
        <div>
          <label htmlFor="">Birth date</label>
          <input type="date"
            name="date"
            onChange={handleChange}
            min={'1921-01-01'}
            max={'2008-12-31'}
            value={input.date}
          />
          <p>{errors.date}</p>
        </div>
        <CountrySelect handle={handleChange} />
        <div>
          <label htmlFor="">Password</label>
          <input type="password"
            name="password"
            onChange={handleChange}
            value= {input.password}
          />
          <p>{errors.password}</p>
        </div>
        <div>
          <label htmlFor="">Confirm Password</label>
          <input type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={input.confirmPassword}
          />
          <p>{errors.confirmPassword}</p>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default FormRegisterForm;
