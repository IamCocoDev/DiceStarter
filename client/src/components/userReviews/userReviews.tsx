import React, {useEffect} from 'react';
import './userReviews.css';
import {useAppDispatch} from '../../app/hooks';
import UserReviewForm from '../userReviewForm/userReviewForm';
import PostedUserReviews from '../postedUserReviews/postedUserReviews';
import {getReviews} from '../../app/actions/reviewsActions/index';

const UserReviews = (props:{id: string}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getReviews(props.id));
  }, []);
  return (
    <div className='userReviewsAll' >
      <UserReviewForm id={props.id} />
      <PostedUserReviews id={props.id}/>
    </div>
  );
};

export default UserReviews;
