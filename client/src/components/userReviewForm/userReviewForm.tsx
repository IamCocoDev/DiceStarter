import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import './userReviewForm.css';
import {postReview} from '../../app/actions/reviewsActions/index';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {userInfo} from '../../app/reducers/registerReducer';
import {ReviewRes} from '../../types';

const UserReviewForm = (props: {id:string}) => {
  const user = useAppSelector(userInfo);
  const postedReviews = useAppSelector(reviewsResponse);
  const [input, setInput] = useState(user);
  const dispatch = useAppDispatch();
  const handleReviewChange = (e: any) => setInput({...input,
    [e.target.name]: e.target.value});
  const handleClickStarValue = (e: any) => {
    setInput({...input, rating: e.target.value});
  };
  let flag = true;
  const handleReviewSubmit = (e: any) => {
    e.preventDefault();
    //  if (!user.id);
    postedReviews.forEach((r:ReviewRes) => {
      if (r.name === user.id) flag = false;
    });
    if (flag === false) return alert('You already gave your opinion');
    if (input.comment) {
      if (input.comment.length < 255) {
        if (input.rating > 0) {
          dispatch(postReview({...input, id: props.id}, props.id));
        } else {
          alert('A rating score is required for posting a review');
        }
      } else {
        alert('Your review must have less than 255 characters');
      }
    } else {
      alert('Your review must have something to say');
    }
  };
  return (
    <form className='userReviewFormAll' onSubmit={handleReviewSubmit}>
      <div className='userReviewFormText'>
        <h2 className='userReviewFormLabelOne'>
          Reviews
        </h2>
        <div className='userReviewFormStarOne'>
          <button onClick={handleClickStarValue}
            value={1}
            type='button' className='userReviewFormRating'>★
          </button>
          <button onClick={handleClickStarValue} value={2}
            type='button' className='userReviewFormRating'>★
          </button>
          <button onClick={handleClickStarValue} value={3}
            type='button' className='userReviewFormRating'>★
          </button>
          <button onClick={handleClickStarValue} value={4}
            type='button' className='userReviewFormRating'>★
          </button>
          <button onClick={handleClickStarValue} value={5}
            type='button' className='userReviewFormRating'>★
          </button>
        </div>
        <textarea
          value={input.comment}
          name='comment'
          className='usersReviewsDescription'
          onChange={handleReviewChange}
        >
        </textarea>
        <button className='userReviewFormButton' type='submit'>
          Post Opinion
        </button>
      </div>
    </form>
  );
};

export default UserReviewForm;
