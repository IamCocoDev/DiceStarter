import React from 'react';
import './productCard.css';
import {NavLink} from 'react-router-dom';

function ProductCard(
    props:{
    name:string,
    price:string,
    image:string[],
    id:string,
    stock:number,
  }) {
  return (
    <div>
      {
        props.stock > 0 ?
      <NavLink to={`/product/${props.id}`}>
        <div className='productCardGrid'>
          <h1 className='productCardName'>{props.name}</h1>
          <p className='productCardPrice'>{props.price}</p>
          <img className='productCardImage' src={props.image[0]} alt='Photo'/>
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
