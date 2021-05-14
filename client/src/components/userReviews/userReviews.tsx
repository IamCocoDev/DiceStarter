import React, {useEffect} from 'react';
import './userReviews.css';
import UserReviewForm from '../userReviewForm/userReviewForm';
import {useAppDispatch} from '../../app/hooks';
import {getReviews} from '../../app/actions/reviewsActions/index';
import PostedUserReviews from '../postedUserReviews/postedUserReviews';

const UserReviews = (props:{id: string}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getReviews(props.id));
  }, []);
  return (
    <div >
      <UserReviewForm id={props.id} />
      <PostedUserReviews />
    </div>
  );
};

export default UserReviews;
