import React from 'react';
import {NavLink} from 'react-router-dom';
import './paginate.css';

const Paginate = (props: {page:number, pagesTotal:number}) => {
  return (
    <div className='paginateGrid'>
      {
        props.page > 1 &&
          <NavLink className='paginatePrevious'
            to={`/home?page=${props.page - 1}`}>
              Previous
          </NavLink>
      }{
        props.page < props.pagesTotal &&
          <NavLink className='paginateNext'
            to={`/home?page=${props.page + 1}`}>
              Next
          </NavLink>
      }
    </div>
  );
};

export default Paginate;
