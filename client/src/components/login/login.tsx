import React, {useState, useEffect} from 'react';
import {formData, formInputData, loginInput} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {loginFormAsync} from '../../app/actions/actionsUser/index';
import {userInfo} from '../../app/reducers/registerReducer';

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
      alert('bien');
      dispatch(loginFormAsync(input));
    } else {
      alert('mal');
    }
  };
  useEffect(() => {
    seterrors(validate(input));
  }, [input]);
  useEffect(() => {
    console.log(User);
  }, [User]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Login</label>
          <input type="text"
            placeholder='enter your username or email'
            value={input.username}
            name="username"
            onChange={handleChange}
          />
          <p>{errors.username}</p>
        </div>
        <div>
          <label>password</label>
          <input type="password"
            placeholder='enter your password'
            value={input.password}
            name="password"
            onChange={handleChange}
          />
          <p>{errors.password}</p>
        </div>
        <input type="submit" value='login' />
      </form>
      <p>{User.username}</p>
    </div>
  );
};

export default Login;
