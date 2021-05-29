import React from 'react';
import './reviewList.css';
import RatingStars from '../ratingStars/ratingStars';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteReviews} from '../../app/actions/reviewsActions/index';
import {userToken, userInfo} from '../../app/reducers/registerReducer';

const ReviewList = (props:{
    comment:string,
    rating:number,
    name:string,
    id:number,
    productId: string,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userInfo)
  const token = useAppSelector(userToken);
  const handleDelete = () => {
    dispatch(deleteReviews(props.id, props.productId, token));
  };
  return (
    <div className='ReviewListAll'>
      <p className='ReviewListName'>
        {props.name}
      </p>
      <p className='ReviewListComment'>
        {props.comment}
      </p>
      <RatingStars rating={props.rating}/>
      <button className='ReviewListDeleteButton' onClick={handleDelete}>
          Delete Review
      </button>
    </div>
  );
};

export default ReviewList;
