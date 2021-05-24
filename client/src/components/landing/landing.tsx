import React from 'react';
import {NavLink} from 'react-router-dom';
import './landing.css';
import dices from '../../img/dices.png';

function Landing() {
  return (
    <div className='background'>
      <div className='landingBackground'>
        <h1 className='landingLogo'>DiceStarter</h1>
        <div className='landingText'>BRINGING YOU CLOSER TO THE TABLE</div>
        <NavLink className='landingButton' to={'/home'}>
          <button className='landingButtonText'>Find Your Game
            <div className='landingChevron'>{'>'}</div>
          </button>
        </NavLink>
      </div>
      <img className='landingImage' src={dices}/>
    </div>

  );
}
export default Landing;
