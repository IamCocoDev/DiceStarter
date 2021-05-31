import React from 'react';
import RatingStars from '../ratingStars/ratingStars';
import './highlightedProduct.css';

const HighlightedProduct = (props:{
    id:string
    name:string,
    rating:string,
    picture:string[],
    price:number,
    priceDiscount:number,
}) => {
  const {
    name,
    rating,
    picture,
    price,
    priceDiscount,
  } = props;
  const photo = picture[0];
  return (
    <div className='HighlightedProductAll'>
      <h1 className='HighlightedProductTitle'>
        {name}
      </h1>
      <div className='HighlightedProductRating'>
        <RatingStars rating={rating}/>
      </div>
      <img className='HighlightedProductImage' src={photo}/>
      <p className='HighlightedProductPrice'>
        {price}
      </p>
      <p>
        {priceDiscount}
      </p>
    </div>
  );
};

export default HighlightedProduct;
