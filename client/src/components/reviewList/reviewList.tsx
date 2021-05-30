import React from 'react';
import './reviewList.css';
import RatingStars from '../ratingStars/ratingStars';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteReviews} from '../../app/actions/reviewsActions/index';
import {userToken} from '../../app/reducers/registerReducer';
import {NavLink} from 'react-router-dom';

const ReviewList = (props:{
    comment:string,
    rating:number,
    name:string,
    id:number,
    productId: string,
    userId:string,
}) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const handleDelete = () => {
    dispatch(deleteReviews(props.id, props.productId, token));
  };
  return (
    <div className='ReviewListAll'>
      <NavLink to={`/profile/${props.userId}`} className='ReviewListName'>
        {props.name}
      </NavLink>
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
