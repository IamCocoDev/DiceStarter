import React from 'react';
/* import {useAppSelector} from '../../app/hooks'; */
import './productCards.css';
import ProductCard from '../productCard/productCard';
import {productsList} from '../../app//reducers/handleProductsReducer';
import {useSelector} from 'react-redux';
import './productCards.css';

function ProductCards() {
  const products = useSelector(productsList);
  return (
    <div className='productCardsFlex'>
      {
        products !== null && products.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            name={product.name}
            image={product.picture}
            price={product.price}
            stock={product.stock}
            rating={product.rating}
            priceDiscount={product.priceDiscount}
          />
        ))
      }

    </div>
  );
}
export default ProductCards;
