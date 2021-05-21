import React, {useState, useEffect} from 'react';
import './postedUserReviews.css';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {ReviewPost} from '../../types';
import {deleteReviews,
  getReviews} from '../../app/actions/reviewsActions/index';
import {userInfo} from '../../app/reducers/registerReducer';

const PostedUserReviews = (props:{id:string}) => {
  const [toggle, setToggle] = useState(false);
  const postedReviews = useAppSelector(reviewsResponse);
  const user = useAppSelector(userInfo);
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
  console.log(toggle);
  return (
    user.role === 'Admin' ?
    <div className='postedUserReviewsAll'>
      {
        postedReviews !== null && postedReviews.map((review: ReviewPost) => (
          <div className='postedUserReviewsReview' key={review.id}>
            {
                toggle === false ?
                <p className='postedUserReviewsComment'>{review.comment}</p> :
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
    </div> :
    postedReviews !== null && postedReviews.map((review: ReviewPost) => (
      <div className='postedUserReviewsReview' key={review.id}>
        {
          review.userId === user.id &&
            toggle === false ?
            <p className='postedUserReviewsComment'>{review.comment}</p> :
            <p className='postedUserReviewsComment'
              suppressContentEditableWarning={true} contentEditable>
              {review.comment}
            </p>
        }
        <button className='postedUserReviewsEditButton'
          onClick={toggleEdit}> Edit </button>
      </div>
    ))
  );
};

export default PostedUserReviews;
