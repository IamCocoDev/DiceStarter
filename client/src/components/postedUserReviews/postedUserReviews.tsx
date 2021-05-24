/* eslint-disable max-len */
import React, {useEffect} from 'react';
import './postedUserReviews.css';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {ReviewPost} from '../../types';
import {getReviews} from '../../app/actions/reviewsActions/index';
import {userInfo, userToken} from '../../app/reducers/registerReducer';
import UserReview from '../userReview/userReview';

const PostedUserReviews = (props:{id:string}) => {
  const postedReviews = useAppSelector(reviewsResponse);
  const token = useAppSelector(userToken);
  const user = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getReviews(props.id));
  }, [dispatch, props]);
  useEffect(() => {}, [postedReviews]);
  return (
    <div className='postedUserReviewsAll'>
      {
        postedReviews !== null && postedReviews.map((r: ReviewPost, i:number) => (
          <UserReview review={r} key={i} token={token} user={user} id={props.id}/>
        ))
      }
    </div>
  );
};

export default PostedUserReviews;
