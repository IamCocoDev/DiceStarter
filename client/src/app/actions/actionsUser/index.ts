/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {BACK_ROUTE} from '../../../ROUTE.js';

import axios from 'axios';
import {getProductsInCart} from '../cartActions';
import {SET_USER,
  SET_USERS,
  SET_TOKEN,
  USER_LOGIN_FAILED,
} from '../../constants/constants';
import {userChanges} from '../../../types';

function arrayUnique(array) {
  const a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i].id === a[j].id) {
        a.splice(j--, 1);
      }
    }
  }

  return a;
}

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

const loginFailed = () => ({
  type: USER_LOGIN_FAILED,
  payload: {},
});

const sendFormAsync = (form: any) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`${BACK_ROUTE}/user/signup`, form);
    } catch (err) {
      console.log(err);
    }
  };
};

const loginFormAsync = (form: any) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post(`${BACK_ROUTE}/user/signin`, form);
      const loginUser = res.data;
      console.log('llega');
      if (typeof res.data !== 'object') {
        dispatch(loginFailed());
      } else {
        localStorage.setItem('user', JSON.stringify(loginUser.user));
        localStorage.setItem('token', JSON.stringify(loginUser.token));
        dispatch(setUser(loginUser.user));
        const cartLocal = await JSON.parse(localStorage.getItem('cart') || '[]');
        const cartUser = await dispatch(getProductsInCart(loginUser.user.id));
        console.log('hola?');
        const nuevo = arrayUnique(cartLocal.concat(cartUser.payload));
        const produsctId = nuevo.map((el) => el.id);
        await axios.post(`${BACK_ROUTE}/orders/${loginUser.user.id}/invited/cart`, {products: produsctId, address: 'cordoba'});
        dispatch(setToken(loginUser.token));
      }
    } catch (err) {
      dispatch(loginFailed());
      console.error(err);
    }
  };
};

const loginGoogle = (googleUser) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post(`${BACK_ROUTE}/user/signupgoogle`, googleUser);
      console.log(res);
      const loginUser = res.data;
      console.log(res.data.token);
      if (typeof res.data !== 'object') {
        dispatch(loginFailed());
      } else {
        console.log(loginUser);
        localStorage.setItem('user', JSON.stringify(loginUser.user));
        localStorage.setItem('token', JSON.stringify(loginUser.token));
        dispatch(setUser(loginUser.user));
        const cartLocal = await JSON.parse(localStorage.getItem('cart') || '[]');
        const cartUser = await dispatch(getProductsInCart(loginUser.user.id));
        const nuevo = arrayUnique(cartLocal.concat(cartUser.payload));
        const produsctId = nuevo.map((el) => el.id);
        await axios.post(`${BACK_ROUTE}/orders/${loginUser.user.id}/invited/cart`, {products: produsctId, address: 'cordoba'});
        dispatch(setToken(loginUser.token));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const logout = () => {
  return async (dispatch: any) => {
    try {
      localStorage.setItem('user', '{}');
      localStorage.removeItem('cart');
      dispatch(setUser({}));
    } catch (err) {
      console.log(err);
    }
  };
};

const modifyUser = (changes:userChanges, token:string) => {
  return async (dispatch) => {
    try {
      dispatch(setUser(changes));
      await axios.put(`${BACK_ROUTE}/user/${changes.id}`, changes, {
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
  return async (dispatch) => {
    try {
      const res = await axios.get(`${BACK_ROUTE}/users`, {
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
