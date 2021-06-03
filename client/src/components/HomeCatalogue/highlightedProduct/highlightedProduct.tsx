import React from 'react';
import RatingStars from '../../DummyComponents/ratingStars/ratingStars';
import './highlightedProduct.css';
import {NavLink} from 'react-router-dom';

const HighlightedProduct = (props:{
    id
    name,
    rating,
    picture,
    discount
}) => {
  const {
    id,
    name,
    rating,
    picture,
    discount,
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
        { discount > 0 ?
        <div className='HighlightedProductPrice'>
           OFFER
          <p className='HighlightedProductDiscount'>
          - %{discount}
          </p>
        </div> : null
        }
      </div>
    </NavLink>
  );
};

export default HighlightedProduct;
