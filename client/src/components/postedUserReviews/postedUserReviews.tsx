import React, {useState} from 'react';
import './postedUserReviews.css';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {ReviewRes} from '../../types';
import {deleteReviews} from '../../app/actions/reviewsActions/index';

const PostedUserReviews = (props:{id:string}) => {
  const [reviewId, setReviewId] = useState(0);
  const postedReviews = useAppSelector(reviewsResponse);
  const dispatch = useAppDispatch();
  console.log(postedReviews);
  const handleOnClick = (e: any) => {
    console.log(reviewId);
    console.log(e.target);
    console.log(e.target.value);
    setReviewId(e.target.value);
    console.log(reviewId);
    dispatch(deleteReviews(reviewId, props.id));
  };
  return (
    <div className='postedUserReviewsAll'>
      {
        postedReviews !== null && postedReviews.map((review: ReviewRes) => (
          <div className='postedUserReviewReview' key={review.id}>
            <p className='postedUserReviewsRating'>{review.rating}</p>
            <p className='postedUserReviewsComment'>{review.comment} </p>
            <button className='postedUserReviewsButtonDelete'
              onClick={handleOnClick} value={review.id}>
              Delete Opinion
            </button>
          </div>
        ))
      }
    </div>
  );
};

export default PostedUserReviews;
