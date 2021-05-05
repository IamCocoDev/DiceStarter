import React from 'react';
import {NavLink} from 'react-router-dom';
import SearchBar from '../searchBar/searchBar';
import './NavBar.css';

function NavBar(): JSX.Element {
  return (
    <div className='NavBar'>
      <p className='NavBarLogo'>DiceStarter</p>
      <div className='NavBarLiOne'>
        <SearchBar />
      </div>
      <div className='NavBarLiTwo'>
        <button className='NavBarBtnOne'>
          Create Product
        </button>
      </div>
      <div className='NavBarLiThree'>
        <NavLink exact to='/home' className='NavBarLinkOne'>
           CrowdFunding
        </NavLink>
      </div>
      <div className='NavBarLiFour'>
        <button>
          Profile
        </button>
      </div>
    </div>
  );
}

export default NavBar;
