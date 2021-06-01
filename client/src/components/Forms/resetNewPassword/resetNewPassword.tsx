/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {useAppDispatch} from '../../../app/hooks';
import {setNewPassword} from '../../../app/actions/actionsUser';
import './resetNewPassword.css';

function deepEqualError(a) {
  return JSON.stringify(a) === JSON.stringify({
    password: '',
    confirmPassword: '',
  });
};

function validate(input) {
  const errors = {
    password: '',
    confirmPassword: '',
  };
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
  return errors;
};

const ResetNewPassword = (props) => {
  const email = props.match.params.email;
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });
  const handleChange = (e) => {
    const data: string = e.target.value;
    setInput({...input, [e.target.name]: data});
  };
  useEffect(() => {
    setErrors(validate(input));
  }, [input]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (deepEqualError(errors)) {
      dispatch(setNewPassword(email, input));
      alert('Password reseted!');
    } else {
      alert('please enter a valid password');
    }
  };
  return (
    <div className='resetNewPasswordAll'>
      <form onSubmit={handleSubmit} >
        <div>
          <label className='resetNewPasswordText' htmlFor="password">New password</label>
          <input className='resetNewPasswordInput' type="password" name='password' value={input.password}
            onChange={handleChange}
          />
          <p className='registerError'>{errors.password}</p>
        </div>
        <div>
          <label className='resetNewPasswordText' htmlFor="confirmPassword">Confirm password</label>
          <input className='resetNewPasswordInput' type="password" name='confirmPassword' value={input.confirmPassword}
            onChange={handleChange}
          />
          <p className='registerError'>{errors.confirmPassword}</p>
        </div>
        <input className='resetNewPasswordButton' type="submit" value='Send' />
      </form>
    </div>
  );
};

export default ResetNewPassword;
