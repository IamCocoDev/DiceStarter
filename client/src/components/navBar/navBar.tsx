import './navBar.css';
import React from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../app/hooks';
import {userInfo} from '../../app/reducers/registerReducer';
import {cartsReducer} from '../../app/reducers/cartReducer';

function NavBar(props: any): JSX.Element {
  const cart = useAppSelector(cartsReducer);
  const User = useAppSelector(userInfo);
  return (
    <div className='navBarGrid'>
      <Link to={`/home?page=1`} className='navBarLogo'>
        <h1>DiceStarter</h1>
      </Link>
      <div className='navBarMenuIcons'>
        { cart.length !== 0 || User.role !== 'Admin' ?
         <div className='navBarCart'>
           <p className='navBarCartCount'>{cart.length}</p>
           <Link className='material-icons cartIcon' to='/cart'>
           shopping_cart
           </Link>
           <Link className='material-icons wishlistIcon' to='/wishlist'>
           favorite
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
        <Link to={`/profile`} className='navBarProfile'>
          <i className='material-icons'>account_circle</i>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
