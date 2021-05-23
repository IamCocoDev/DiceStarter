import './navBar.css';
import React from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../app/hooks';
import {userInfo} from '../../app/reducers/registerReducer';

function NavBar(props: any): JSX.Element {
  const User = useAppSelector(userInfo);
  console.log(User);
  return (
    <div className='navBarGrid'>
      <Link to={`/home?page=1`} className='navBarLogo'>
        <h1>DiceStarter</h1>
      </Link>
      <div className='navBarMenuIcons'>
        {User.role !== 'Admin' ? <div className='navBarCart'>
          <Link to='/cart'>
            <svg xmlns="http://www.w3.org/2000/svg" height="3.5vh" viewBox="0 0 24 24" width="3.5vw" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </Link>
        </div> : null}
        {
          User.role === 'Admin' ?
          <div className='navBarAcountManager'>
            <Link to={'/list'} className='navBarListAll'>
              <i className='material-icons'>view_list</i>
            </Link>
            <Link to={`/create`} className='navBarCreateProduct'>
              <i className='material-icons'>add_circle</i>
            </Link>
          </div> : null
        }
        {User.name ?
      <div className='userName'>Hello, {User.firstName}!</div>:
      <div className='userName'>Hello, Guest!</div>}
        <Link to={'/profile'} className='navBarProfile'>
          <i className='material-icons'>account_circle</i>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
