/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteReviews,
  getReviews,
  modifyReview} from '../../app/actions/reviewsActions/index';
import {userInfo} from '../../app/reducers/registerReducer';
import './userReview.css';
import RatingStars from '../ratingStars/ratingStars';
const UserReview = (props:{review, token, user, id}) => {
  const user = useAppSelector(userInfo);
  const [toggle, setToggle] = useState(false);
  const {review, token} = props;
  const [editMode, setEditMode] = useState(false);
  const [changes, setChanges] = useState({
    rating: review.rating,
    comment: review.comment,
    id: review.id,
  });
  const dispatch = useAppDispatch();
  const handleEditMode = () => setEditMode(!editMode);
  const handleCommentChange = (e: any) => {
    setChanges({...changes, comment: e.target.innerText});
  };
  const handleDelete = (e) => {
    dispatch(deleteReviews(e.target.value, props.id, token));
    dispatch(getReviews(props.id));
  };
  useEffect(() => {
    review.user.name === user.name ? setToggle(true) : null;
  });
  return (
    <div className='userReviewAll'>
      <div className='userReviewBox'>
        <h2 className='userReviewTitle'>{review.user.name}</h2>
        <p className='userReviewRating' ><RatingStars rating={review.rating}/></p>
        <p className='userReviewComment' suppressContentEditableWarning={true} contentEditable={editMode && toggle} onInput={handleCommentChange}>{review.comment}</p>
      </div>
      <div className='userReviewButtons'>
        { toggle === true &&
          <button className='material-icons userReviewEditButton' onClick={handleEditMode}>edit</button>
        }
        { toggle === true && review.user.name === user.name &&
        <button className='material-icons userReviewDeleteButton' onClick={handleDelete} value={review.id}>delete</button>
        }
      </div>
      {
        changes.comment !== review.comment || changes.rating !== review.rating ?
        <button className='material-icons userReviewSaveButton' onClick={() => dispatch(modifyReview(review.id, changes, token))}>save</button> : null
      }
    </div>
  );
};

export default UserReview;
