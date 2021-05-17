import React from 'react';
import './userReviews.css';
import UserReviewForm from '../userReviewForm/userReviewForm';
import PostedUserReviews from '../postedUserReviews/postedUserReviews';

const UserReviews = (props:{id: string}) => {
  return (
    <div className='userReviewsAll' >
      <UserReviewForm id={props.id} />
      <PostedUserReviews id={props.id}/>
    </div>
  );
};

export default UserReviews;
