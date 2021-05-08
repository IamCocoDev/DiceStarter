import React from 'react';
import {NavLink} from 'react-router-dom';

function CreateButtonRouter() {
  return (
    <div>
      <NavLink to='/create/product'>
        <button>Go to create new product </button>
      </NavLink>
      <NavLink to='/create/category'>
        <button>Go to create new category</button>
      </NavLink>
    </div>
  );
}
export default CreateButtonRouter;
