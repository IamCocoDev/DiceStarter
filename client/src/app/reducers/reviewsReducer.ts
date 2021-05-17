import {RootState} from '../store';
import {ReviewState} from '../../types';
import {SET_REVIEWS} from '../constants/constants';

const initialState: ReviewState = {
  reviewsResponse: null,
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
    default:
      return state;
  }
};

export default reviewReducer;

export const reviewsResponse = (state: RootState) =>
  state.handleReview.reviewsResponse;

