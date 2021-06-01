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
    <div className='reviewListAll'>
      <NavLink to={`/profile/${props.userId}`} className='reviewListName'>
        {props.name}
      </NavLink>
      <p className='reviewListComment'>
        {props.comment}
      </p>
      <div className='reviewListRating'>
        <RatingStars rating={props.rating}/>
      </div>
      <button className='reviewListDeleteButton' onClick={handleDelete}>
        <i className='material-icons'>delete</i>
      </button>
    </div>
  );
};

export default ReviewList;
