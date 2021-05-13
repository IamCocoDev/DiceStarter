import axios from 'axios';
import {
  SEND_REVIEW_BEGIN,
  SEND_REVIEW_SUCCESS,
  SEND_REVIEW_FAILURE,
  GET_REVIEWS_BEGIN,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  DELETE_REVIEWS_BEGIN,
  DELETE_REVIEWS_SUCCESS,
  DELETE_REVIEWS_FAILURE,
  CHANGE_REVIEWS_BEGIN,
  CHANGE_REVIEWS_SUCCESS,
  CHANGE_REVIEWS_FAILURE,
} from '../../constants/constants';
import {ReviewState} from '../../../types';
// send Review status handling
const sendReviewBegin = () => ({
  type: SEND_REVIEW_BEGIN,
});
const sendReviewSuccess = () => ({
  type: SEND_REVIEW_SUCCESS,
});
const sendReviewFailure = (error: any) => ({
  payload: error,
  type: SEND_REVIEW_FAILURE,
});
// get Reviews status handling
const getReviewsBegin = () => ({
  type: GET_REVIEWS_BEGIN,
});
const getReviewsSuccess = () => ({
  type: GET_REVIEWS_SUCCESS,
});
const getReviewsFailure = (error: any) => ({
  payload: error,
  type: GET_REVIEWS_FAILURE,
});
// delete Reviews status handling
const deleteReviewsBegin = () => ({
  type: DELETE_REVIEWS_BEGIN,
});
const deleteReviewsSuccess = () => ({
  type: DELETE_REVIEWS_SUCCESS,
});
const deleteReviewsFailure = (error: any) => ({
  payload: error,
  type: DELETE_REVIEWS_FAILURE,
});
// change Reviews status handling
const changeReviewsBegin = () => ({
  type: CHANGE_REVIEWS_BEGIN,
});

const changeReviewsSuccess = () => ({
  type: CHANGE_REVIEWS_SUCCESS,
});

const changeReviewsFailure = (error: any) => ({
  payload: error,
  type: CHANGE_REVIEWS_FAILURE,
});

// Async requests to the back-end

const postReview = (review: ReviewState) => {
  return async (dispatch: any) => {
    dispatch(sendReviewBegin);
    try {
      await axios.post('http://localhost:3001/product/id/review', review);
      dispatch(sendReviewSuccess);
    } catch (err) {
      dispatch(sendReviewFailure(err));
    }
  };
};

export {
  sendReviewBegin,
  sendReviewSuccess,
  sendReviewFailure,
  getReviewsBegin,
  getReviewsSuccess,
  getReviewsFailure,
  deleteReviewsBegin,
  deleteReviewsSuccess,
  deleteReviewsFailure,
  changeReviewsBegin,
  changeReviewsFailure,
  changeReviewsSuccess,
  postReview,
};
