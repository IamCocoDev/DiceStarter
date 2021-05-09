import React, {useEffect, useState} from 'react';
import './home.css';
import ProductCards from '../productCards/productCards';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getCategoriesAsync, getProductsAsync,
  productCategories,
  productsListStatus} from '../../app/reducers/handleProductsSlice';
import Select from 'react-select';

function Home() {
  const [filter, setFilter] = useState<string>('');
  const asyncProducts = useAppSelector(productsListStatus);
  const productsCategories = useAppSelector(productCategories);
  const dispatch = useAppDispatch();
  const handleSelectChange = (e: any) => {
    setFilter(e.label);
    dispatch(getProductsAsync({name: '', page: 1, filter: filter}));
  };
  useEffect(() => {
    dispatch(getCategoriesAsync());
    dispatch(getProductsAsync({name: '', page: 1, filter: ''}));
  }, []);
  return (
    <div>
      {
        productsCategories && <Select
          options={productsCategories}
          onChange={handleSelectChange}
        >
        </Select>
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
