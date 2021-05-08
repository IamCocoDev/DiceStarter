import React from 'react';
import './productCard.css';


function ProductCard(
    props:{
    name:string,
    price:string,
    image:string,
    id:string}) {
  return (
    <div className='productCardGrid'>
      <h1 className='productCardName'>{props.name}</h1>
      <p className='productCardPrice'>{props.price}</p>
      <img className='productCardImage' src={props.image} alt='Photo'/>
    </div>
  );
}

export default ProductCard;
