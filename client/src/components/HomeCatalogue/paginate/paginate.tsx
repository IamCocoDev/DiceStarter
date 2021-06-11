import React from 'react';
import {NavLink} from 'react-router-dom';
import './paginate.css';

const Paginate = (props:any) => {
  const pages = [];
  for (let i = 0; i < props.pagesTotal; i+=1) {
    pages.push(i + 1);
  }
  // eslint-disable-next-line max-len
  return (
    <div className='paginateGrid'>
      <div className='paginateDivPrevious'>
        {
          props.page > 1 &&
          <NavLink className='paginatePrevious material-icons'
            to={`/home?page=${props.page - 1}`}>
              chevron_left
          </NavLink>
        }
      </div>
      <ul className='paginateNumbers'>
        {
          pages.map((p:number) => (
            props.page === p ?
            <li key={p}>
              <NavLink className='paginateCurrentPage' to={`/home?page=${p}`}>
                {p}
              </NavLink>
            </li> :
            <li key={p}>
              <NavLink className='paginatePages' to={`/home?page=${p}`}>
                {p}
              </NavLink>
            </li>
          ))
        }
        {
          pages.length > 10 ?
          <li>
            <NavLink to={`/home?page=${pages.length - 1}`}></NavLink>
          </li> : null
        }
      </ul>
      <div className='paginateDivNext'>
        {
          props.page < props.pagesTotal &&
          <NavLink className='paginateNext material-icons'
            to={`/home?page=${props.page + 1}`}>
             chevron_right
          </NavLink>
        }
      </div>
    </div>
  );
};

export default Paginate;
