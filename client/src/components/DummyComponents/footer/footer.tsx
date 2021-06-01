/* eslint-disable max-len */
import React from 'react';
import {NavLink} from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <div className='FooterAll'>
      <NavLink className='FooterAbout' to='/about'>About Us</NavLink>
      <NavLink className='FooterRules' to='/rules'>Rules</NavLink>
      <a href='https://www.instagram.com/DiceStarter/'><p className="fa fa-instagram"></p></a>
      <a href='https://twitter.com/DiceStarter'><p className='fa fa-twitter'></p></a>
      <a className='fa fa-facebook'href='https://www.facebook.com/DiceStarter'><p></p></a>
      <p className='FooterName'>©Dicestarter</p>
    </div>
  );
};
export default Footer;
