// Actions
import {
  SEND_FORM_BEGIN,
  SEND_FORM_FAILURE,
  SEND_FORM_SUCCESS,
  RESET_FORM_STATUS,
} from '../constants/constants';
// Types
import {FormState} from '../../types';
import {RootState} from '../store';

const initialState : FormState = {
  inputs: {
    categories: [],
    description: '',
    color: [],
    name: '',
    picture: [],
    price: '',
    size: '',
    stock: 0,
    available: true,
  },
  status: 'idle',
};

const formReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEND_FORM_BEGIN:
      return {
        ...state,
        status: 'loading',
      };
    case SEND_FORM_FAILURE:
      return {
        ...state,
        status: 'failed',
      };
    case SEND_FORM_SUCCESS:
      return {
        ...state,
        status: 'idle',
      };
    case RESET_FORM_STATUS:
      return {
        ...state,
        status: 'idle',
      };
    default:
      return state;
  }
};

export default formReducer;

export const formStatus = (state: RootState) =>
  state.handleForm.status;
