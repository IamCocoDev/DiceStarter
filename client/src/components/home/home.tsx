import React, {useEffect} from 'react';
import ProductCards from '../productCards/productCards';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {totalPages,
  queryFilter,
  queryName,
  querySort,
  productsList,
} from '../../app/reducers/handleProductsReducer';
import ProductsSelect from '../productSelects/productSelects';
import Paginate from '../paginate/paginate';
import {getProductsAsync} from '../../app/actions/handleProductsActions';
import './home.css';

function Home(props: any) {
  const User = JSON.parse(localStorage.getItem('user') || '{}');
  const searchName = useAppSelector(queryName);
  const searchFilter = useAppSelector(queryFilter);
  const searchSort = useAppSelector(querySort);
  const pagesTotal = useAppSelector(totalPages);
  const products = useAppSelector(productsList);
  const dispatch = useAppDispatch();
  const foundQueryNumber = props.location.search.indexOf('=');
  let page = parseInt(props.location.search.slice(foundQueryNumber +1));
  useEffect(() => {
    if (!page) page = 1;
    if (page === NaN) page = 1;
    dispatch(getProductsAsync({
      name: searchName,
      page: page,
      filter: searchFilter,
      sort: searchSort,
    }));
  }, [page]);
  return (
    <div className='homeBackground'>
      {User.id ? <p>hello! {User.name}</p>: null}
      {
        <ProductsSelect />
      }
      {
        products === null &&
       <div className='homeLoading'>
         Loading...
       </div>
      }
      <div>
        { products !== null &&
          <div className='homeGood'>
            <ProductCards></ProductCards>
            <Paginate page={page} pagesTotal={pagesTotal}/>
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
