import {
  SET_USER,
  SET_USERS,
} from '../constants/constants';

// Types
import {FormRegisterState} from '../../types';
import {RootState} from '../store';

const initialState: FormRegisterState = {
  inputs: JSON.parse(localStorage.getItem('user') || '{}'),
  users: null,
};


const formReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        inputs: action.payload,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;

export const userInfo = (state: RootState) =>
  state.handleRegister.inputs;
export const users = (state: RootState) =>
  state.handleRegister.users;


