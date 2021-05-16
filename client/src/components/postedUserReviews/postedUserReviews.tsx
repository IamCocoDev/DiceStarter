import React from 'react';
import './postedUserReviews.css';
import {useAppSelector} from '../../app/hooks';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {ReviewRes} from '../../types';

const PostedUserReviews = () => {
  const postedReviews = useAppSelector(reviewsResponse);
  return (
    <div className='postedUserReviewsAll'>
      {
        postedReviews !== null && postedReviews.map((review: ReviewRes) => (
          <div className='postedUserReviewReview' key={review.id}>
            <p className='postedUserReviewsRating'>{review.rating}</p>
            <p className='postedUserReviewsComment'>{review.comment} </p>
          </div>
        ))
      }
    </div>
  );
};

export default PostedUserReviews;
