import React from 'react';
import './postedUserReviews.css';
import {useAppSelector} from '../../app/hooks';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {ReviewRes} from '../../types';

const PostedUserReviews = () => {
  const postedReviews = useAppSelector(reviewsResponse);
  const starsArr = [];
  return (
    <div>
      {
        postedReviews !== null && postedReviews.map((review: ReviewRes) => {
          for (let i:number = 0; i < review.rating; i++) {
            starsArr.push(i);
            '';
          }
          console.log(starsArr);
          return (
            <div className='postedReviewsAll' key={review.id}>
              <p>{review.comment}</p>
              {
                starsArr.map((star) => (
                  <p className='postedReviewsStar' key={star}>★</p>
                ))
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default PostedUserReviews;
