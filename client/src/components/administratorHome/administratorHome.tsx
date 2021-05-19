import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../app/actions/actionsUser';
import {Redirect} from 'react-router';
import './administratorHome.css';

const AdministratorHome = () => {
  const dispatch = useAppDispatch();
  const User = JSON.parse(localStorage.getItem('user') || '{}');
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [registerRedirect, setRegisterRedirect] = useState(false);
  const hangleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    alert('Logged out!');
    setLoginRedirect(true);
  };
  return (
    <div className='administratorHomeAll'>
      { loginRedirect === true && <Redirect to={'/login'}></Redirect>}
      { registerRedirect === true && <Redirect to={`/register`}></Redirect>}
      {User.name ?
        <h1 className='administratorHomeH1'> Welcome {User.name}</h1> :
        <h3 className='administratorHomeH3'>Login please</h3>}
      {User.name ?
        <input className='administratorHomeButtonLogout'
          type="button" value='Logout'
          onClick={hangleLogout} /> :
        <input className='administratorHomeButtonLogin'
          type="button" value='Login' onClick={() => setLoginRedirect(true)} />}
      {
        !User.name &&
           <input className='administratoreHomeButtonRegister' type='button'
             value='Register' onClick={() => setRegisterRedirect(true)}/>
      }
      <h3 className='administratorHomeH3'>
           We expect you to enjoy your experience in DiceStarter!
      </h3>
    </div>
  );
};

export default AdministratorHome;
