import React from 'react';
import {NavLink} from 'react-router-dom';
import './listButtonRouter.css';

function listButtonRouter() {
  return (
    <div className='listButtonRouterGrid'>
      <NavLink className='listButtonRouterProduct' to='/list/productlist'>
        <button className='listButtonRouterProductButton'>
          Go to view products </button>
      </NavLink>
      <NavLink className='listButtonRouterCategory' to='/list/productcategory'>
        <button className='listButtonRouterCategoryButton'>
          Go to view categories</button>
      </NavLink>
    </div>
  );
}

export default listButtonRouter;
