import React, {useEffect} from 'react';
import ProductCards from '../productCards/productCards';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {productsListStatus,
  totalPages} from '../../app/reducers/handleProductsReducer';
import ProductsSelect from '../productSelects/productSelects';
import Paginate from '../paginate/paginate';
import {getProductsAsync} from '../../app/actions/handleProductsActions';

function Home(props: any) {
  const asyncProducts = useAppSelector(productsListStatus);
  const pagesTotal = useAppSelector(totalPages);
  const dispatch = useAppDispatch();
  const foundQueryNumber = props.location.search.indexOf('=');
  let page = parseInt(props.location.search.slice(foundQueryNumber +1));
  useEffect(() => {
    if (!page) page = 1;
    if (page === NaN) page = 1;
    console.log(page);
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
        <Paginate page={page} pagesTotal={pagesTotal}/>
      </div>
    </div>
  );
}

export default Home;
