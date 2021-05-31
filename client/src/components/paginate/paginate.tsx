import React from 'react';
import {NavLink} from 'react-router-dom';
import './paginate.css';

const Paginate = (props: {page:number, pagesTotal:number}) => {
  const pages = [];
  for (let i = 0; i < props.pagesTotal; i+=1) {
    pages.push(i + 1);
  }
  return (
    <div className='paginateGrid'>
      {
        props.page > 1 &&
          <NavLink className='paginatePrevious material-icons'
            to={`/home?page=${props.page - 1}`}>
              chevron_left
          </NavLink>
      }
      <ul className='paginateNumbers'>
        {
          pages.map((p:number) => (
            <li key={p}>
              <NavLink className='paginatePages' to={`/home?page=${p}`}>
                {p}
              </NavLink>
            </li>
          ))
        }
      </ul>
      {
        props.page < props.pagesTotal &&
          <NavLink className='paginateNext material-icons'
            to={`/home?page=${props.page + 1}`}>
             chevron_right
          </NavLink>
      }
    </div>
  );
};

export default Paginate;
