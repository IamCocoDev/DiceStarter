import React, {useState, useEffect} from 'react';
import './postedUserReviews.css';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {ReviewRes} from '../../types';
import {deleteReviews,
  getReviews} from '../../app/actions/reviewsActions/index';

const PostedUserReviews = (props:{id:string}) => {
  const [reviewId, setReviewId] = useState(0);
  const postedReviews = useAppSelector(reviewsResponse);
  const dispatch = useAppDispatch();
  const handleOnClick = (e: any) => {
    setReviewId(e.target.value);
    dispatch(deleteReviews(reviewId, props.id));
  };
  useEffect(() => {
    dispatch(getReviews(props.id));
  }, [postedReviews]);
  return (
    <div className='postedUserReviewsAll'>
      {
        postedReviews !== null && postedReviews.map((review: ReviewRes) => (
          <div className='postedUserReviewsReview' key={review.id}>
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
