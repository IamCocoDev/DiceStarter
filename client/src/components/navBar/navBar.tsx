import React from 'react';
import {NavLink} from 'react-router-dom';
import SearchBar from '../searchBar/searchBar';
import './navBar.css';
import {Route} from 'react-router-dom';

function NavBar(): JSX.Element {
  return (
    <div className='navBarGrid'>
      <div className='navBarLogo'>
        <NavLink to={`/home?page=1`}>
          <h1>DS</h1>
        </NavLink>
      </div>
      <Route exact path ='/home'>
        <div className='navBarSearchBar'>
          <SearchBar />
        </div>
      </Route>
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
        <NavLink exact to={'/admin/home'}>        <button>
          <i className='material-icons'>account_circle</i>
        </button>
        </NavLink>

      </div>
    </div>
  );
}

export default NavBar;
