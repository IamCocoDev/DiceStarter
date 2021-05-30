import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {userInfo, userToken} from '../../app/reducers/registerReducer';
import {getAllReviews} from '../../app/actions/reviewsActions/index';
import {allReviews} from '../../app/reducers/reviewsReducer';
import ReviewList from '../reviewList/reviewList';
import './reviewsList.css';

const ReviewsList = () => {
  const user = useAppSelector(userInfo);
  const token = useAppSelector(userToken);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllReviews(token));
  }, []);
  const reviews = useAppSelector(allReviews);
  // this UF is watching for changes in redux state, do not delete
  useEffect(() => {

  }, [reviews]);
  return (
      user.role === 'Admin' ?
    <div className='ReviewsListAll'>
      <p className='ReviewsListName'>Username</p>
      <p className='ReviewsListComment'>Comment</p>
      <p className='ReviesListComment'>Rating</p>
      {
          reviews === null ?
          <div className='ReviewsListLoading'>Loading...</div> :
          reviews.map((r) => (
            <div className='ReviewsListReview' key={r.id}>
              <ReviewList
                comment={r.comment}
                rating={r.rating}
                name={r.user?.name}
                id={r.id}
                productId={r.productId}
                userId={r.user?.id}/>
            </div>
          ))
      }
    </div> :
    <div className='ReviewsListRestriction'>401 not authorized</div>
  );
};

export default ReviewsList;
