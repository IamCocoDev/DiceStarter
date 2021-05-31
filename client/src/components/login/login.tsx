import React, {useState, useEffect} from 'react';
import {formData, formInputData, loginInput} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {loginFormAsync} from '../../app/actions/actionsUser/index';
import {userInfo} from '../../app/reducers/registerReducer';
import swal from 'sweetalert2';
import './login.css';
import GoogleComp from '../googleComp/googleComp';
import {getProductsInCart} from '../../app/actions/cartActions/index';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

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
  const [redirect, setRedirect] = useState(false);
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
      dispatch(loginFormAsync(input))
          .then((r) => {
            console.log(r);
            if (r !== 'error') {
              swal.fire({
                title: 'Logged in succesfully!',
                icon: 'success',
                // fix buttons
              })
                  .then((ok) => {
                    if (ok) {
                      setTimeout(() => {
                        setRedirect(true);
                        dispatch(getProductsInCart());
                      }, 4000);
                    }
                  })
                  .catch((err) => console.error(err));
            } else {
              swal.fire({
                text: 'The email or username does not exist',
                icon: 'error',
              });
            }
          }).catch((err) => console.error(err));
    } else {
      swal.fire('You need to insert an e-mail and a password');
    }
  };
  useEffect(() => {
    seterrors(validate(input));
  }, [input]);
  useEffect(() => {
  }, [User]);
  return (
    <div className='loginBackground'>
      {
        redirect === true &&
        <Redirect to={`/home?page=1`}></Redirect>
      }
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
          <Link to='/user/recoverpassword' >
            <p>Forgot your password?</p>
          </Link>
          <p className='loginErrors'>{errors.password}</p>
        </div>
        <button className='loginSend' type="submit">Login</button>
        <div className='loginGoogle'>
          <GoogleComp/>
        </div>
        <Link
          className='registerLink' to='/register'>
          New to DiceStarter? Register here!
        </Link>
      </form>
    </div>
  );
};

export default Login;
