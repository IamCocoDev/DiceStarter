import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../app/actions/actionsUser';
import {Redirect} from 'react-router';
import './administratorHome.css';

const AdministratorHome = () => {
  const dispatch = useAppDispatch();
  const User = JSON.parse(localStorage.getItem('user') || '{}');
  const [redirect, setRedirect] = useState(false);
  const hangleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    alert('Logged out!');
    setRedirect(true);
  };
  return (
    <div className='administratorHomeAll'>
      { redirect === true && <Redirect to={'/login'}></Redirect>}
      {User.name ?
        <h1 className='administratorHomeH1'> Welcome {User.name}</h1> :
        <h3 className='administratorHomeH3'>Login please</h3>}
      {User.name ?
        <input type="button" value='logout' onClick={hangleLogout} /> :
        <input type="button" value='login' onClick={() => setRedirect(true)} />}
      <h3 className='administratorHomeH3'>
           We expect you to enjoy your experience in DiceStarter!
      </h3>
    </div>
  );
};

export default AdministratorHome;
