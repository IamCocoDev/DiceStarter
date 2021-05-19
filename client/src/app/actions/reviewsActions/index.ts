import axios from 'axios';
import {
  SET_REVIEWS,
} from '../../constants/constants';
import {ReviewRes, ReviewPost} from '../../../types';
// send Review status handling
// sends reviews to store
const setReviews = (reviewResponse: ReviewRes) => ({
  payload: reviewResponse,
  type: SET_REVIEWS,
});

// Async requests to the back-end

const postReview = (review: ReviewPost) => {
  return async (dispatch: any) => {
    try {
      console.log(review.id);
      await axios.post(`http://localhost:3001/product/${review.id}/review`, review);
    } catch (err) {
      console.error(err);
    }
  };
};

const getReviews = (id: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`http://localhost:3001/product/${id}/review`);
      const reviews = res.data.map((review: ReviewRes) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
      }));
      console.log('Done!');
      dispatch(setReviews(reviews));
    } catch (err) {
      console.error(err);
    }
  };
};

const deleteReviews = (id: number, productId: string) => {
  return async (dispatch: any) => {
    try {
      console.log(id);
      const res = await axios.delete(`http://localhost:3001/product/review/${id}`);
      console.log(res.data);
      dispatch(getReviews(productId));
    } catch (err) {
      console.error(err);
    };
  };
};

const modifyReview = (id: number) => {
  return async (dispatch: any) => {
    try {
      console.log(id);
      const res = await axios.post(`http://localhost:3001/product/review/${id}`);
      console.table(res.data);
    } catch (err) {
      console.error(err);
    }
  };
};

export {
  postReview,
  getReviews,
  deleteReviews,
  modifyReview,
};
