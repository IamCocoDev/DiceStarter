import React from 'react';
import './productCard.css';
import {Link} from 'react-router-dom';

function ProductCard(
    props:{
    name:string,
    price:string,
    image:string,
    id:number}) {
  return (
    <div className='productCardGrid'>
      <h1 className='productCardName'>{props.name}</h1>
      <p className='productCardPrice'>{props.price}</p>
      <img className='productCardImage' src={props.image} alt='Photo'/>
      <Link className='productCardEdit' to={`/product/${props.id}`}>
        <button className='productCardEditButton' value='edit'>
            Edit
        </button>
      </Link>
      <Link className='productCardDelete' to={`/home`}>
        <button className='productCardDeleteButton' value='delete'>
            Delete
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
