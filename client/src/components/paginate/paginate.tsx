import React from 'react';
import {NavLink} from 'react-router-dom';

const Paginate = (props: {page:number, pagesTotal:number}) => {
  return (
    <div>
      {
        props.page > 1 &&
     <NavLink to={`/home?page=${props.page - 1}`}>
        Previous
     </NavLink>
      }{
        props.page < props.pagesTotal &&
        <NavLink to={`/home?page=${props.page + 1}`}>
        Next
        </NavLink>
      }
    </div>
  );
};

export default Paginate;
