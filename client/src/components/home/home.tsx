import React, {useEffect} from 'react';
import ProductCards from '../productCards/productCards';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  productsListStatus, totalPages,
  queryFilter,
  queryName,
  querySort,
} from '../../app/reducers/handleProductsReducer';
import ProductsSelect from '../productSelects/productSelects';
import Paginate from '../paginate/paginate';
import {getProductsAsync} from '../../app/actions/handleProductsActions';

function Home(props: any) {
  const asyncProducts = useAppSelector(productsListStatus);
  const searchName = useAppSelector(queryName);
  const searchFilter = useAppSelector(queryFilter);
  const searchSort = useAppSelector(querySort);
  const pagesTotal = useAppSelector(totalPages);
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
      {
        <ProductsSelect />
      }
      {
       asyncProducts !== 'loading' ? <ProductCards></ProductCards> : <div>
         loading products...
       </div>
      }
      <div>
        <Paginate page={page} pagesTotal={pagesTotal}/>
      </div>
    </div>
  );
}

export default Home;
