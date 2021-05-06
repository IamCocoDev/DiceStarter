import React from 'react';
import {NavLink} from 'react-router-dom';
import SearchBar from '../searchBar/searchBar';
import './navBar.css';

function NavBar(): JSX.Element {
  return (
    <div className='navBarGrid'>
      <div className='navBarLogo'>
        <NavLink to={`/home`}>
          <h1>DS</h1>
        </NavLink>
      </div>
      <div className='navBarSearchBar'>
        <SearchBar />
      </div>
      <div className='navBarListAll'>
        <NavLink exact to={'/list'}>
          <i className='material-icons'>view_list</i>
        </NavLink>
      </div>
      <div className='navBarCreateProduct'>
        <NavLink exact to={`/create`}>
          <button className='NavBarBtnOne'>
            <i className='material-icons'>add_circle</i>
          </button>
        </NavLink>
      </div>
      <div className='navBarProfile'>
        <button>
          <i className='material-icons'>account_circle</i>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
