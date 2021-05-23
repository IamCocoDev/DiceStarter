/* eslint-disable max-len */
import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {deleteReviews,
  getReviews} from '../../app/actions/reviewsActions/index';
const UserReview = (props:{review, token, user, id}) => {
  const {review, token} = props;
  const [editMode, setEditMode] = useState(false);
  const [changes, setChanges] = useState({
    rating: review.rating,
    comment: review.comment,
  });
  const dispatch = useAppDispatch();
  const handleEditMode = () => setEditMode(!editMode);
  const handleCommentChange = (e: any) => {
    setChanges({...changes, comment: e.target.innerText});
  };
  const handleRatingChange = (e: any) => {
    if (parseInt(e.target.innerText) <= 5) {
      setChanges({...changes, rating: e.target.innerText});
    }
  };
  const handleDelete = (e) => {
    dispatch(deleteReviews(e.target.value, props.id, token));
    dispatch(getReviews(props.id));
  };
  return (
    <div>
      <p suppressContentEditableWarning={true} contentEditable={editMode} onInput={handleRatingChange}>{review.rating}</p>
      <p suppressContentEditableWarning={true} contentEditable={editMode} onInput={handleCommentChange}>{review.comment}</p>
      <button onClick={handleEditMode}>Edit </button>
      <button onClick={handleDelete} value={review.id}> Delete Review </button>
      {
        changes.comment !== review.comment || changes.rating !== review.rating ?
        <button onClick={handleDelete}>Save Changes</button> : null
      }
    </div>
  );
};

export default UserReview;
