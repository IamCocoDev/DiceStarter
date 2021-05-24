/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteReviews,
  getReviews,
  modifyReview} from '../../app/actions/reviewsActions/index';
import {userInfo} from '../../app/reducers/registerReducer';
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
  const handleRatingChange = (e: any) => {
    if (parseInt(e.target.innerText) <= 5) {
      setChanges({...changes, rating: e.target.innerText});
    }
  };
  const handleDelete = (e) => {
    dispatch(deleteReviews(e.target.value, props.id, token));
    dispatch(getReviews(props.id));
  };
  useEffect(() => {
    review.user.name === user.name || user.role === 'Admin' ? setToggle(true) : null;
  });
  return (
    <div>
      <h1>{review.user.name}</h1>
      <p suppressContentEditableWarning={true} contentEditable={editMode && toggle} onInput={handleRatingChange}>{review.rating}</p>
      <p suppressContentEditableWarning={true} contentEditable={editMode && toggle} onInput={handleCommentChange}>{review.comment}</p>
      { toggle === true &&
          <button onClick={handleEditMode}>Edit </button>
      }
      { toggle === true &&
        <button onClick={handleDelete} value={review.id}> Delete Review </button>
      }
      {
        changes.comment !== review.comment || changes.rating !== review.rating ?
        <button onClick={() => dispatch(modifyReview(review.id, changes, token))}>Save Changes</button> : null
      }
    </div>
  );
};

export default UserReview;
