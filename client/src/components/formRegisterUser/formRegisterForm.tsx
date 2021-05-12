import React, {useState, useEffect} from 'react';
import {formData, formInputData, registerInput} from '../../types';
import CountrySelect from '../countrySelect/countrySelect';
import {useAppDispatch} from '../../app/hooks';
import {sendFormAsync} from '../../app/actions/actionsUser';

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
  const dispatch = useAppDispatch();
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
      console.log(input);
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
    console.log(input);
  }, [input]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">name</label>
          <input type="text"
            name="name"
            onChange={handleChange}
            value={input.name}
          />
          <p>{errors.name}</p>
        </div>
        <div>
          <label htmlFor="">firstName</label>
          <input type="text"
            name="firstName"
            onChange={handleChange}
            value={input.firstName}
          />
          <p>{errors.firstName}</p>
          <label htmlFor="">lastName</label>
          <input type="text"
            name="lastName"
            onChange={handleChange}
            value={input.lastName}
          />
          <p>{errors.lastName}</p>
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
          <label htmlFor="">Birth birthday</label>
          <input type="date"
            name="birthday"
            onChange={handleChange}
            min={'1921-01-01'}
            max={'2008-12-31'}
            value={input.birthday}
          />
          <p>{errors.birthday}</p>
        </div>
        <div>
          <CountrySelect handle={handleChange}
            val={input.country} />
          <p>{errors.country}</p>
        </div>
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
