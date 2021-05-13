import {
  SEND_FORM_BEGIN,
  SEND_FORM_FAILURE,
  SEND_FORM_SUCCESS,
  RESET_FORM_STATUS,
  SET_USER,
} from '../actions/actionsUser';

// Types
import {FormRegisterState} from '../../types';
import {RootState} from '../store';

const initialState: FormRegisterState = {
  inputs: {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    birthday: '',
    profilePicture: '',
    address: '',
    city: '',
    postalCode: 0,
    phone: '',
    country: '',
    role: '',
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
    case SET_USER:
      return {
        ...state,
        inputs: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;

export const formRegisterStatus = (state: RootState) =>
  state.handleForm.status;
export const userInfo = (state: RootState) =>
  state.handleRegister.inputs;
