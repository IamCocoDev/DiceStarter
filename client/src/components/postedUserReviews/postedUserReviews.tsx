/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import './postedUserReviews.css';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {ReviewPost} from '../../types';
import {getReviews} from '../../app/actions/reviewsActions/index';
import {userInfo, userToken} from '../../app/reducers/registerReducer';
import UserReview from '../userReview/userReview';

const PostedUserReviews = (props:{id:string}) => {
  const postedReviews = useAppSelector(reviewsResponse);
  const [numberReviews, setNumberReviews] = useState(10);
  const token = useAppSelector(userToken);
  const user = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  const numberReviewIncrease = () => setNumberReviews(numberReviews + 10);
  useEffect(() => {
    dispatch(getReviews(props.id));
  }, [dispatch]);
  useEffect(() => {}, [postedReviews]);
  const reviewPagination = (array:number[], num:number): number[] => {
    if (array !== null) {
      const reviewPaginationArr = array.slice(0, num);
      return reviewPaginationArr;
    }
    return array;
    // input: [1, 2, 3, 4, 5, 6, 7, 8, 9 ... 100]
    // output: Array de objetos que incrementa su length al invocar la funcion
  };
  let reviewsPaginated = [];
  reviewsPaginated = reviewPagination(postedReviews, numberReviews);
  return (
    <div className='postedUserReviewsAll'>
      {
        reviewsPaginated !== null && reviewsPaginated.map((r: ReviewPost, i:number) => (
          <UserReview review={r} key={i} token={token} user={user} id={props.id}/>
        ))
      }
      { reviewsPaginated?.length !== postedReviews?.length &&
        <button className='postedUserReviewsButtonMore' onClick={numberReviewIncrease}>Load More</button>
      }
    </div>
  );
};

export default PostedUserReviews;
