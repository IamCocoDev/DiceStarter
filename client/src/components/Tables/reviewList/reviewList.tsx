import React from 'react';
import './reviewList.css';
import RatingStars from '../../DummyComponents/ratingStars/ratingStars';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {deleteReviews} from '../../../app/actions/reviewsActions/index';
import {userToken} from '../../../app/reducers/registerReducer';
import {NavLink} from 'react-router-dom';
import swal from 'sweetalert2';

const ReviewList = (props:{
    comment:string,
    rating:number,
    name:string,
    id:number,
    productId: string,
    userId:string,
}) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const handleDelete = () => {
    swal.fire({
      title: 'Delete review?',
      text: 'Are you sure you want to Delete this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#74009D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
      background: '#202020',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReviews(props.id, props.productId, token));
        swal.fire({
          text: `Review deleted!`,
          icon: 'info',
          background: '#202020',
        });
      }
    }).catch((err) => console.error(err));
  };
  return (
    <div className='reviewListAll'>
      <NavLink to={`/profile/${props.userId}`} className='reviewListName'>
        {props.name}
      </NavLink>
      <p className='reviewListComment'>
        {props.comment}
      </p>
      <div className='reviewListRating'>
        <RatingStars rating={props.rating}/>
      </div>
      <button className='reviewListDeleteButton' onClick={handleDelete}>
        <i className='material-icons'>delete</i>
      </button>
    </div>
  );
};

export default ReviewList;
