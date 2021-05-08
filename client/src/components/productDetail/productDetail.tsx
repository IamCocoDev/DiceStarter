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
        <div>
          <h1>{product.name}</h1>
          <img src={product.picture}/>
          <p>
        Price: {product.price}
          </p>
          <p>
       Stock: {product.stock}
          </p>
          <p>
       Rating: {product.rating}
          </p>
          <p>Size: {product.size}</p>
          {product.available === true ? <p>Available</p> : <p>Sold</p>}
          <p>{product.description}</p>
          <p>Color: {product.color}</p>
        </div>
      }
    </div>
  );
}

export default ProductDetail;
