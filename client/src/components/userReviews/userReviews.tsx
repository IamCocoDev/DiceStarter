import React, {useState} from 'react';
import './userReviews.css';

const UserReviews = () => {
  const [input, setInput] = useState('');
  const handleReviewChange = (e: any) => setInput(e.target.value);
  return (
    <div >
      <form className='userReviewsAll'>
        <div className='userReviewsStarOne'>
          <i className='material-icons'>star_rating</i>
          <i className='material-icons'>star_rating</i>
          <i className='material-icons'>star_rating</i>
          <i className='material-icons'>star_rating</i>
          <i className='material-icons'>star_rating</i>
        </div>
        <div className='userReviewsText'>
          <label className='userReviewsLabelOne'>Leave your opinion</label>
          <textarea
            value={input}
            name='Review'
            className='usersReviewsDescription'
            onChange={handleReviewChange}
          >
          </textarea>
        </div>
      </form>
    </div>
  );
};

export default UserReviews;
