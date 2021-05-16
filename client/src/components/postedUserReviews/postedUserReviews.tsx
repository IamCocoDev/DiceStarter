import React from 'react';
import './postedUserReviews.css';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {ReviewRes} from '../../types';
import {deleteReviews} from '../../app/actions/reviewsActions/index';

const PostedUserReviews = (props:{id:string}) => {
  const postedReviews = useAppSelector(reviewsResponse);
  const dispatch = useAppDispatch();
  const handleOnClick = () => dispatch(deleteReviews(props.id));
  return (
    <div className='postedUserReviewsAll'>
      {
        postedReviews !== null && postedReviews.map((review: ReviewRes) => (
          <div className='postedUserReviewReview' key={review.id}>
            <p className='postedUserReviewsRating'>{review.rating}</p>
            <p className='postedUserReviewsComment'>{review.comment} </p>
            <button className='postedUserReviewsButtonDelete'
              onClick={handleOnClick}>
              Delete Opinion
            </button>
          </div>
        ))
      }
    </div>
  );
};

export default PostedUserReviews;
