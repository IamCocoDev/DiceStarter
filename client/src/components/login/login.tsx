import React, {useState, useEffect} from 'react';
import {formData, formInputData, loginInput} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {loginFormAsync} from '../../app/actions/actionsUser/index';
import {userInfo} from '../../app/reducers/registerReducer';
import './login.css';
import GoogleComp from '../googleComp/googleComp';
import {getProductsInCart} from '../../app/actions/cartActions/index';

function deepEqualError(a: loginInput) {
  return JSON.stringify(a) === JSON.stringify({
    username: '',
    password: '',
  });
}

const validate = (input: loginInput) => {
  const errors: loginInput = {
    username: '',
    password: '',
  };
  if (!input.username) {
    errors.username = 'Username required';
  }
  if (!input.password) {
    errors.password = 'Password required';
  }
  return errors;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const User = useAppSelector(userInfo);
  const login: loginInput = {
    username: '',
    password: '',
  };
  const [errors, seterrors] = useState<loginInput>(login);
  const [input, setinput] = useState<loginInput>(login);
  const handleChange = (e: formInputData) => {
    setinput({...input, [e.target.name]: e.target.value});
  };
  const handleSubmit = (e: formData) => {
    e.preventDefault();
    if (deepEqualError(errors)) {
      dispatch(loginFormAsync(input));
      if (!User.id) return alert('Password or Username are not correct');
      dispatch(getProductsInCart());
    } else {
      alert('mal');
    }
  };
  useEffect(() => {
    seterrors(validate(input));
  }, [input]);
  useEffect(() => {
  }, [User]);
  return (
    <div className='loginBackground'>
      <form className='loginGrid' onSubmit={handleSubmit}>
        <div className='loginUserName'>
          <label className='loginUserNameText'>Login</label>
          <input type="text" className='loginUserInput'
            placeholder='Enter your Username or Email'
            value={input.username}
            name="username"
            onChange={handleChange}
          />
          <p className='loginErrors'>{errors.username}</p>
        </div>
        <div className='loginPassword'>
          <label className='loginPasswordText'>Password</label>
          <input type="password" className='loginUserInput'
            placeholder='Enter your Password'
            value={input.password}
            name="password"
            onChange={handleChange}
          />
          <p className='loginErrors'>{errors.password}</p>
        </div>
        <button className='loginSend' type="submit">Login</button>
        <div className='loginGoogle'>
          <GoogleComp/>
        </div>
      </form>
    </div>
  );
};

export default Login;
