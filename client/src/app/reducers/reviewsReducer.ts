import {RootState} from '../store';
import {ReviewState} from '../../types';
import {SET_REVIEWS, SET_ALL_REVIEWS} from '../constants/constants';

const initialState: ReviewState = {
  reviewsResponse: null,
  allReviews: null,
  body: '',
  id: '',
};

const reviewReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_REVIEWS:
      return {
        ...state,
        reviewsResponse: action.payload,
      };
    case SET_ALL_REVIEWS:
      return {
        ...state,
        allReviews: action.payload,
      };
    default:
      return state;
  }
};

export default reviewReducer;

export const reviewsResponse = (state: RootState) =>
  state.handleReview.reviewsResponse;

export const allReviews = (state: RootState) =>
  state.handleReview.allReviews;
