import React, {useState, useEffect} from 'react';
import './postedUserReviews.css';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {ReviewRes} from '../../types';
import {deleteReviews,
  getReviews} from '../../app/actions/reviewsActions/index';

const PostedUserReviews = (props:{id:string}) => {
  const [toggle, setToggle] = useState(false);
  const postedReviews = useAppSelector(reviewsResponse);
  const dispatch = useAppDispatch();
  const handleOnClick = (e: any) => {
    if (e.target.value > 0) {
      dispatch(deleteReviews(e.target.value, props.id));
      dispatch(getReviews(props.id));
    }
  };
  const toggleEdit = () => setToggle(!toggle);
  useEffect(() => {
    dispatch(getReviews(props.id));
  }, [dispatch, props]);
  useEffect(() => {}, [postedReviews]);
  return (
    <div className='postedUserReviewsAll'>
      {
        postedReviews !== null && postedReviews.map((review: ReviewRes) => (
          <div className='postedUserReviewsReview' key={review.id}>
            <p className='postedUserReviewsRating'>{review.rating}</p>
            {
              toggle === false &&
              <p className='postedUserReviewsComment'>{review.comment}</p>
            }
            {
              toggle === true &&
              <p className='postedUserReviewsComment'
                suppressContentEditableWarning={true} contentEditable>
                {review.comment}
              </p>
            }
            <button className='postedUserReviewsButtonDelete' type='button'
              onClick={handleOnClick} value={review.id}>
               Delete Opinion
            </button>
            <button className='postedUserReviewsEditButton'
              onClick={toggleEdit}> Edit </button>
          </div>
        ))
      }
    </div>
  );
};

export default PostedUserReviews;
