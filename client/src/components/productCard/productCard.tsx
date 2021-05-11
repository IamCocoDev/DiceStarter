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
    <NavLink to={`/product/${props.id}`}>
      <div className='productCardGrid'>
        <h1 className='productCardName'>{props.name}</h1>
        <p className='productCardPrice'>{props.price}</p>
        <img className='productCardImage' src={props.image} alt='Photo'/>
      </div>
    </NavLink>
  );
}

export default ProductCard;
