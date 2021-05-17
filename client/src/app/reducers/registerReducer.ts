import {
  RESET_FORM_STATUS,
  SET_USER,
} from '../actions/actionsUser';

// Types
import {FormRegisterState} from '../../types';
import {RootState} from '../store';

const initialState: FormRegisterState = {
  inputs: JSON.parse(localStorage.getItem('user') || '{}'),
};


const formReducer = (state = initialState, action: any) => {
  switch (action.type) {
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

export const userInfo = (state: RootState) =>
  state.handleRegister.inputs;
