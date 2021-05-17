import React from 'react';
import './administratorHome.css';

const AdministratorHome = () => {
  const User = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <div className='administratorHomeAll'>
      {User.name ?
        <h1 className='administratorHomeH1'> Welcome {User.name}</h1> :
        <h3 className='administratorHomeH3'>Login please</h3>}
      <h3 className='administratorHomeH3'>
           We expect you to enjoy your experience in DiceStarter!
      </h3>
    </div>
  );
};

export default AdministratorHome;
