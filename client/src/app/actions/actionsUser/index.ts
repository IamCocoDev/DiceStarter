import axios from 'axios';
import {SET_USER,
  SET_USERS,
} from '../../constants/constants';
import {userChanges} from '../../../types';

// Status setters for async calls
const setUser = (user: any) => ({
  type: SET_USER,
  payload: {user},
});

const setUsers = (users:any) => ({
  type: SET_USERS,
  payload: users,
});

const sendFormAsync = (form: any) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`http://localhost:3001/user/signup`, form);
    } catch (err) {
      console.log(err);
    }
  };
};

const loginFormAsync = (form: any) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post(`http://localhost:3001/user/signin`, form);
      const loginUser = res.data;
      localStorage.setItem('user', JSON.stringify(loginUser));
      dispatch(setUser(loginUser));
    } catch (err) {
      console.log(err);
    }
  };
};

const loginGoogle = (user: any) => {
  return async (dispatch: any) => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
    }
  };
};

const logout = () => {
  return async (dispatch: any) => {
    try {
      localStorage.setItem('user', '{}');
      dispatch(setUser({}));
    } catch (err) {
      console.log(err);
    }
  };
};

const modifyUser = (changes:userChanges) => {
  return async (dispatch) => {
    try {
      dispatch(setUser(changes));
      await axios.put(`http://localhost:3001/user/${changes.id}`, changes);
    } catch (err) {
      console.error(err);
    }
  };
};

const getUsers = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/users`);
      const users = res.data;
      dispatch(setUsers(users));
    } catch (err) {
      console.error(err);
    }
  };
};

export {
  sendFormAsync,
  loginFormAsync,
  loginGoogle,
  logout,
  modifyUser,
  getUsers,
};
