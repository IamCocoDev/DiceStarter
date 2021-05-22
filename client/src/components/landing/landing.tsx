import React from 'react';
import {NavLink} from 'react-router-dom';

import './landing.css';

function Landing() {
  return (
    <div className='landingBackground'>
      <h1>DiceStarter</h1>
      <p>BRINGING YOU CLOSER TO THE TABLE</p>
      <NavLink className='landingButton' to={'/home'}>
        <button >Find Your Game
          <i className='material-icons'>chevron_left</i>
        </button>
      </NavLink>
    </div>
  );
}
export default Landing;
