import React from 'react';
import {NavLink} from 'react-router-dom';
import SearchBar from '../searchBar/searchBar';
import './navBar.css';
import {Route} from 'react-router-dom';

function NavBar(props:any): JSX.Element {
  const route:string = props.location.pathname;
  if (route === '/list/productlist') {
    return (
      <div className='navBarGridList'>
        <div className='navBarLogo'>
          <NavLink to={`/home?page=1`}>
            <h1>DS</h1>
          </NavLink>
        </div>
        <Route exact path ='/list/productlist'>
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
      <div className='navBarCart'>
        <NavLink to='/cart'>
          <svg xmlns="http://www.w3.org/2000/svg" height="2.5vw" viewBox="0 0 24 24" width="2.5vw" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </NavLink>
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
        <NavLink exact to={'/admin/home'}>        <button>
          <i className='material-icons'>account_circle</i>
        </button>
        </NavLink>

      </div>
    </div>
  );
}

export default NavBar;
