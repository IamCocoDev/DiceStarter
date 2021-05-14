import React from 'react';
import './productCard.css';
import {NavLink} from 'react-router-dom';
// import {useAppSelector, useAppDispatch} from '../../app/hooks';
// import {productDetail} from '../../app/reducers/handleProductsReducer';
// import {userInfo} from '../../app/reducers/registerReducer';

function ProductCard(
    props:{
    name:string,
    price:string,
    image:string[],
    id:string,
    stock:number,
  }) {
  // const productToCart = useAppSelector(productDetail);
  // const user = useAppSelector(userInfo)
  // const {id} = userInfo;
  return (
    <div>
      {
        props.stock > 0 ?
      <NavLink to={`/product/${props.id}`}>
        <div className='productCardGrid'>
          <h1 className='productCardName'>{props.name}</h1>
          <p className='productCardPrice'>{props.price}</p>
          <img className='productCardImage' src={props.image[0]} alt='Photo'/>
          <button type='button' className='productCardCartButton'>
            Add to cart
          </button>
        </div>
      </NavLink> :
      <div className='productCardGrid'>
        <h1 className='productCardName'>{props.name}</h1>
        <p className='productCardPrice'>{props.price}</p>
        <img className='productCardImageSold' src={props.image[0]} alt='Photo'/>
        <h1 className='productCardSold'>Sold Out</h1>
      </div>
      }
    </div>
  );
}

export default ProductCard;
