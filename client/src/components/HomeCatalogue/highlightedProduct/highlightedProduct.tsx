import React from 'react';
import RatingStars from '../../DummyComponents/ratingStars/ratingStars';
import './highlightedProduct.css';
import {NavLink} from 'react-router-dom';

const HighlightedProduct = (props:{
    id
    name,
    rating,
    picture,
    price,
    priceDiscount,
}) => {
  const {
    id,
    name,
    rating,
    picture,
    price,
    priceDiscount,
  } = props;
  const photo = picture[0];
  return (
    <NavLink to={`/product/${id}`}>
      <div className='HighlightedProductAll'>
        <h1 className='HighlightedProductTitle'>
          {name}
        </h1>
        <div className='HighlightedProductRating'>
          <RatingStars rating={rating}/>
        </div>
        <img className='HighlightedProductImage' src={photo}/>
        <p className='HighlightedProductPrice'>
          ${price}
        </p>
        {
          priceDiscount !== null &&
          <p className='HighlightedProductDiscount'>
            ${priceDiscount}
          </p>
        }
      </div>
    </NavLink>
  );
};

export default HighlightedProduct;
