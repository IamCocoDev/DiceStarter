import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import './userReviewForm.css';
import {postReview} from '../../app/actions/reviewsActions/index';
// import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {getReviews} from '../../app/actions/reviewsActions/index';

const UserReviewForm = (props: {id:string}) => {
  const [input, setInput] = useState({
    comment: '',
    rating: 0,
    name: 'chococtorta23',
  });
  const dispatch = useAppDispatch();
  const handleReviewChange = (e: any) => setInput({...input,
    [e.target.name]: e.target.value});
  const handleClickStarValue = (e: any) => {
    setInput({...input, rating: e.target.value});
  };
  const handleReviewSubmit = (e: any) => {
    e.preventDefault();
    if (input.rating > 0) {
      dispatch(postReview({...input, id: props.id}));
      dispatch(getReviews(props.id));
    } else {
      alert('A rating score is required for posting a review');
    }
  };
  return (
    <form className='userReviewFormAll' onSubmit={handleReviewSubmit}>
      <div className='userReviewFormText'>
        <label className='userReviewFormLabelOne'>
            Leave your opinion about this product
        </label>
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
