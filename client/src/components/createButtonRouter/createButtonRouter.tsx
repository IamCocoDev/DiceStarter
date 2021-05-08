import React from 'react';
import {NavLink} from 'react-router-dom';
import './createButtonRouter.css';

function CreateButtonRouter() {
  return (
    <div className='createButtonRouterGrid'>
      <NavLink to='/create/product' className='createButtonRouterProduct'>
        <button className='createButtonRouterProductButton'>
          Go to create new product </button>
      </NavLink>
      <NavLink to='/create/category' className='createButtonRouterCategory'>
        <button className='createButtonRouterCategoryButton'>
          Go to create new category</button>
      </NavLink>
    </div>
  );
}
export default CreateButtonRouter;
