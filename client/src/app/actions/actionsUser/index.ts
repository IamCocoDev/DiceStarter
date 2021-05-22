import axios from 'axios';
import {SET_USER,
  SET_USERS,
  SET_TOKEN,
} from '../../constants/constants';
import {userChanges} from '../../../types';

// Status setters for async calls
const setUser = (user: any) => ({
  type: SET_USER,
  payload: user,
});

const setUsers = (users:any) => ({
  type: SET_USERS,
  payload: users,
});

const setToken = (token:string) => ({
  type: SET_TOKEN,
  payload: token,
});

const sendFormAsync = (form: any) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`http://localhost:3001/user/signup`, form);
      dispatch(loginFormAsync(form));
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
      localStorage.setItem('user', JSON.stringify(loginUser.user));
      localStorage.setItem('token', JSON.stringify(loginUser.token));
      dispatch(setToken(loginUser.token));
      dispatch(setUser(loginUser.user));
    } catch (err) {
      console.error(err);
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
      localStorage.setItem('token', '');
      dispatch(setUser({}));
    } catch (err) {
      console.log(err);
    }
  };
};

const modifyUser = (changes:userChanges, token:string) => {
  return async (dispatch:any) => {
    try {
      dispatch(setUser(changes));
      dispatch(setToken(token));
      await axios.put(`http://localhost:3001/user/${changes.id}`, changes, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
};

const getUsers = (token:string) => {
  return async (dispatch:any) => {
    try {
      const res = await axios.get(`http://localhost:3001/users`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
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
