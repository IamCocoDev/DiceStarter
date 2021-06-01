import React from 'react';
import {NavLink} from 'react-router-dom';
import './listButtonRouter.css';

function listButtonRouter() {
  return (
    <div className='listButtonRouterGrid'>
      <NavLink className='listButtonRouterProduct' to='/list/productlist'>
        <button className='listButtonRouterProductButton'>
          Products
        </button>
      </NavLink>
      <NavLink className='listButtonRouterCategory'to='/list/productcategory'>
        <button className='listButtonRouterCategoryButton'>
          Categories
        </button>
      </NavLink>
      <NavLink to='/list/userlist' className='listButtonRouterUsers'>
        <button className='listButtonRouterUsersButton'>
          Users
        </button>
      </NavLink>
      <NavLink to='/list/order' className='listButtonRouterUsers'>
        <button className='listButtonRouterUsersButton'>
          Orders
        </button>
      </NavLink>
      <NavLink to={'/list/reviews'} className='listButtonRouterReviews'>
        <button className='listButtonRouterUsersButton'>
          Reviews
        </button>
      </NavLink>
    </div>
  );
}

export default listButtonRouter;
