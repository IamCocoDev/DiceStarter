import React from 'react';
import {NavLink} from 'react-router-dom';

function listButtonRouter() {
  return (
    <div>
      <NavLink to='/list/productlist'>
        <button>Go to view products </button>
      </NavLink>
      <NavLink to='/list/productcategory'>
        <button>Go to view categories</button>
      </NavLink>
    </div>
  );
}

export default listButtonRouter;
