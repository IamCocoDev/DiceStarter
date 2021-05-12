import React from 'react';
import {useAppSelector} from '../../app/hooks';
import './productCards.css';
import ProductCard from '../productCard/productCard';
import {productsList} from '../../app//reducers/handleProductsReducer';

function ProductCards() {
  const products = useAppSelector(productsList);
  return (
    <div className='productCardsFlex'>
      {
        products !== null && products.map((product, index) => (
          <div key={index}>
            <ProductCard
              id={product.id}
              name={product.name}
              image={product.picture}
              price={product.price}
              stock={product.stock}
            />
            {/* product.stock > 0 ?:
            <ProductCard
              id={product.id}
              name={product.name}
              image={product.picture}
              price={product.price}
              stock={product.stock}
                />*/}
          </div>
        ))
      }

    </div>
  );
}
export default ProductCards;
