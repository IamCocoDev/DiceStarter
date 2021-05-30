import axios from 'axios';
import {BACK_ROUTE} from '../../../ROUTE';
import {
  SET_REVIEWS,
  SET_ALL_REVIEWS,
} from '../../constants/constants';
import {ReviewRes, ReviewPost} from '../../../types';
// sends reviews to store
const setReviews = (reviewResponse: ReviewRes) => ({
  payload: reviewResponse,
  type: SET_REVIEWS,
});

const setAllReviews = (reviews: ReviewRes) => {
  return {
    payload: reviews,
    type: SET_ALL_REVIEWS,
  };
};

const postReview = (review: ReviewPost, id:string, token) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`${BACK_ROUTE}/product/${review.id}/review`, review, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      dispatch(getReviews(id));
    } catch (err) {
      console.error(err);
    }
  };
};

const getReviews = (id: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${BACK_ROUTE}/product/${id}/review`);
      const reviews = res.data.all.map((review: any) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        user: review.user,
      }));
      dispatch(setReviews(reviews));
    } catch (err) {
      console.error(err);
    }
  };
};

const deleteReviews = (id: number, productId: string, token:string) => {
  return async (dispatch: any) => {
    try {
      await axios.delete(`${BACK_ROUTE}/product/review/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      dispatch(getReviews(productId));
      dispatch(getAllReviews(token));
    } catch (err) {
      console.error(err);
    };
  };
};

const modifyReview = (id: number, changes:any, token:string) => {
  return async (dispatch: any) => {
    try {
      await axios.put(`${BACK_ROUTE}/product/review/${id}`, changes, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
};

const getAllReviews = (token:string) => {
  return async (dispatch:any) => {
    try {
      const res = await axios.get(`${BACK_ROUTE}/product/reviews/allreviews`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      dispatch(setAllReviews(res.data));
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
  getAllReviews,
};
