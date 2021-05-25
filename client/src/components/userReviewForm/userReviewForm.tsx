import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import './userReviewForm.css';
import {postReview} from '../../app/actions/reviewsActions/index';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {userInfo, userToken} from '../../app/reducers/registerReducer';
import {Redirect} from 'react-router-dom';

const UserReviewForm = (props: {id:string}) => {
  const user = useAppSelector(userInfo);
  const postedReviews = useAppSelector(reviewsResponse);
  const token = useAppSelector(userToken);
  const [redirect, setRedirect] = useState(false);
  const [input, setInput] = useState({
    comment: '',
    rating: 0,
    userId: user.id,
  });
  const dispatch = useAppDispatch();
  const handleReviewChange = (e: any) => setInput({...input,
    [e.target.name]: e.target.value});
  const handleClickStarValue = (e: any) => {
    setInput({...input, rating: e.target.value});
  };
  // flags for authenticating users and reviews
  let flag = true;
  let guestFlag = true;
  const handleReviewSubmit = (e: any) => {
    e.preventDefault();
    if (!user.name) {
      alert('You must be logged in for writing a review!');
      guestFlag = false;
      setRedirect(true);
    }
    postedReviews !== null && postedReviews.forEach((r:any) => {
      if (r.user.name === user.name) flag = false;
    });
    if (flag === false) return alert('You already gave your opinion');
    if (input.comment && flag === true && guestFlag === true) {
      if (input.comment.length < 255) {
        if (input.rating > 0) {
          dispatch(postReview({...input, id: props.id}, props.id, token));
        } else {
          alert('A rating score is required for posting a review');
        }
      } else {
        alert('Your review must have less than 255 characters');
      }
      // Prevents unnecessary alerts
    } else if (guestFlag === true && flag === true) {
      alert('Your review must have something to say');
    }
  };
  return (
    redirect === true ? <Redirect to='/register'></Redirect> :
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
          Send
        </button>
      </div>
    </form>
  );
};

export default UserReviewForm;
