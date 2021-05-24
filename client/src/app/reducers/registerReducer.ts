import {
  SET_USER,
  SET_USERS,
  SET_TOKEN,
  USER_LOGIN_FAILED,
} from '../constants/constants';

// Types
import {FormRegisterState} from '../../types';
import {RootState} from '../store';

const initialState: FormRegisterState = {
  inputs: JSON.parse(localStorage.getItem('user') || '{}'),
  userToken: JSON.parse(localStorage.getItem('token') || '{}'),
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
    case SET_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case USER_LOGIN_FAILED:
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
export const users = (state: RootState) =>
  state.handleRegister.users;
export const userToken = (state: RootState) =>
  state.handleRegister.userToken;
