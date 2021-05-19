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
          Go to create new product </button>
      </NavLink>
      <NavLink to='/create/category' className='createButtonRouterCategory'>
        <button className='createButtonRouterCategoryButton'>
          Go to create new category</button>
      </NavLink>
    </div> : <div>401 Not Authorized</div>
  );
}
export default CreateButtonRouter;
