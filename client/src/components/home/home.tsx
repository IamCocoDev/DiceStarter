import React, {useEffect} from 'react';
import './home.css';
import ProductCards from '../productCards/productCards';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getProductsAsync,
  productsListStatus} from '../../app/reducers/handleProductsSlice';
import FilterSelect from '../productSelects/productSelects';

function Home() {
  const asyncProducts = useAppSelector(productsListStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductsAsync({name: '', page: 1, filter: ''}));
  }, []);
  return (
    <div>
      {
        <FilterSelect />
      }
      {
       asyncProducts !== 'loading' ? <ProductCards></ProductCards> : <div>
         loading products...
       </div>
      }
    </div>
  );
}

export default Home;
