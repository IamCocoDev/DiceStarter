import React, {useEffect} from 'react';
import './home.css';
import ProductCards from '../productCards/productCards';
import {useAppDispatch} from '../../app/hooks';
import {getProductsAsync} from '../../app/reducers/handleProductsSlice';

function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductsAsync({name: '', page: 1}));
  }, []);
  return (
    <div>
      <ProductCards></ProductCards>
    </div>
  );
}

export default Home;
