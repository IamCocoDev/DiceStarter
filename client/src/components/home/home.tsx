import React, {useEffect} from 'react';
import './home.css';
import ProductCards from '../productCards/productCards';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getProductsAsync,
  productsListStatus,
  totalPages} from '../../app/reducers/handleProductsSlice';
import ProductsSelect from '../productSelects/productSelects';
import {NavLink} from 'react-router-dom';
import Paginate from '../paginate/paginate';

function Home(props: any) {
  const asyncProducts = useAppSelector(productsListStatus);
  const pagesTotal = useAppSelector(totalPages);
  const dispatch = useAppDispatch();
  const foundQueryNumber = props.location.search.indexOf('=');
  let page = parseInt(props.location.search.slice(foundQueryNumber +1));
  useEffect(() => {
    if (!page) page = 1;
    if (page === NaN) page = 1;
    dispatch(getProductsAsync({name: '', page: page, filter: ''}));
  }, [page]);
  return (
    <div>
      {
        <ProductsSelect />
      }
      {
       asyncProducts !== 'loading' ? <ProductCards></ProductCards> : <div>
         loading products...
       </div>
      }
      <div>
        {
          page > 1 &&
        <NavLink to={`/home?page=${page - 1}`}>
        Previous
        </NavLink>
        }{
          page < pagesTotal &&
        <NavLink to={`/home?page=${page + 1}`}>
        Next
        </NavLink>
        }
        <Paginate />
      </div>
    </div>
  );
}

export default Home;
