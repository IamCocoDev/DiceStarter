import React from 'react';
import './productCard.css';
import {NavLink} from 'react-router-dom';

function ProductCard(
    props:{
    name:string,
    price:string,
    image:string,
    id:string}) {
  return (
    <div className='productCardGrid'>
      <NavLink className='productCardName' to={`/product/${props.id}`}>
        <h1>{props.name}</h1>
      </NavLink>
      <p className='productCardPrice'>{props.price}</p>
      <img className='productCardImage' src={props.image} alt='Photo'/>
    </div>
  );
}

export default ProductCard;
