import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../app/actions/actionsUser';
import {Redirect} from 'react-router';
import './profile.css';

const Profile = () => {
  const dispatch = useAppDispatch();
  const User = JSON.parse(localStorage.getItem('user') || '{}');
  console.log(User);
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [registerRedirect, setRegisterRedirect] = useState(false);
  const hangleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    alert('Logged out!');
    setLoginRedirect(true);
  };
  return (
    <div>
      { loginRedirect === true && <Redirect to={'/login'}></Redirect>}
      { registerRedirect === true && <Redirect to={`/register`}></Redirect>}
      {User.name ?
        <h1> Welcome {User.name}</h1> :
        <div>
          <h3>Sign in</h3>
        </div>
      }
      {User.name ?
        <input type="button" value='Logout'
          onClick={hangleLogout} /> :
        <input
          type="button" value='Login' onClick={() => setLoginRedirect(true)} />}
      {
        !User.name &&
           <input type='button'
             value='Register' onClick={() => setRegisterRedirect(true)}/>
      }
      <h3>
           We expect you to enjoy your experience in DiceStarter!
      </h3>
    </div>
  );
};

export default Profile;
