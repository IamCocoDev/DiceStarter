import React, {useEffect} from 'react';
import './productDetail.css';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getProductByIdAsync,
  productDetail} from '../../app/reducers/handleProductsSlice';

function ProductDetail(props:any ) {
  const dispatch = useAppDispatch();
  const product = useAppSelector(productDetail);
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(getProductByIdAsync(id)), [];
  });
  return (
    <div>
      { product &&
        <div className='ProductDetailAll'>
          <h1 className='ProductDetailName' contentEditable>{product.name}</h1>
          <img className='ProductDetailImage' src={product.picture}/>
          <p className='ProductDetailPrice' contentEditable>
        Price: {product.price}
          </p>
          <p className='ProductDetailStock' contentEditable>
       Stock: {product.stock}
          </p>
          <p className='ProductDetailRating'contentEditable>
       Rating: {product.rating}
          </p>
        </div>
      }
    </div>
  );
}

export default ProductDetail;
