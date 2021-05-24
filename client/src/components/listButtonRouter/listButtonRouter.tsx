import React from 'react';
import {NavLink} from 'react-router-dom';
import './listButtonRouter.css';

function listButtonRouter() {
  return (
    <div className='listButtonRouterGrid'>
      <button className='listButtonRouterProductButton'>
        <NavLink className='listButtonRouterProduct' to='/list/productlist'>
          Products
        </NavLink>
      </button>
      <button className='listButtonRouterCategoryButton'>
        <NavLink className='listButtonRouterCategory'
          to='/list/productcategory'>
          Categories
        </NavLink>
      </button>
      <button className='listButtonRouterUsersButton'>
        <NavLink to='/list/userlist' className='listButtonRouterUsers'>
          Users
        </NavLink>
      </button>
    </div>
  );
}

export default listButtonRouter;
