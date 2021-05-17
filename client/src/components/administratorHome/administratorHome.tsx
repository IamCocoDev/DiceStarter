import React from 'react';
import './administratorHome.css';
import {useAppSelector} from '../../app/hooks';
import {userInfo} from '../../app/reducers/registerReducer';

const AdministratorHome = () => {
  const User = useAppSelector(userInfo);
  return (
    <div className='administratorHomeAll'>
      {User.user ?
        <h1 className='administratorHomeH1'> Welcome {User.user.name}</h1> :
        <h3 className='administratorHomeH3'>Login please</h3>}
      <h3 className='administratorHomeH3'>
           We expect you to enjoy your experience in DiceStarter!
      </h3>
    </div>
  );
};

export default AdministratorHome;
