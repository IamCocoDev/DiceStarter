import React from 'react';
import {NavLink} from 'react-router-dom';
import './createButtonRouter.css';

function CreateButtonRouter() {
  const User = JSON.parse(localStorage.getItem('user') || '{}');
  return (
     User.role === 'Admin' ?
    <div className='createButtonRouterGrid'>
      <NavLink to='/create/product' className='createButtonRouterProduct'>
        <button className='createButtonRouterProductButton'>
          New Product </button>
      </NavLink>
      <NavLink to='/create/category' className='createButtonRouterCategory'>
        <button className='createButtonRouterCategoryButton'>
          New Category</button>
      </NavLink>
    </div> : <div>401 Not Authorized</div>
  );
}
export default CreateButtonRouter;
