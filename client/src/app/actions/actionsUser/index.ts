/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {BACK_ROUTE} from '../../../ROUTE.js';

import axios from 'axios';
import {getProductsInCart} from '../cartActions';
import {SET_USER,
  SET_USERS,
  SET_TOKEN,
  USER_LOGIN_FAILED,
  SET_USER_PROFILE,
} from '../../constants/constants';
import {DELETE_ALL_CART} from '../cartActions';
import {userChanges, Address} from '../../../types';

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
const setUser = (user: any) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

// sets users locally
const setUsers = (users:any) => ({
  type: SET_USERS,
  payload: users,
});

// sets JWT
const setToken = (token:string) => ({
  type: SET_TOKEN,
  payload: token,
});

// sets redux state to empty (this prevents the app from crashing)
const loginFailed = () => ({
  type: USER_LOGIN_FAILED,
  payload: {},
});

// sets the user for profile page
const setUserProfile = (user:any) => ({
  type: SET_USER_PROFILE,
  payload: user,
});

// requests register to back-end
const sendFormAsync = (form: any) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`${BACK_ROUTE}/user/signup`, form);
      dispatch(loginFormAsync(form));
    } catch (err) {
      console.log(err);
      // this is for error handling
      if (err) return 'error';
    }
  };
};

// requests login to back-end
const loginFormAsync = (form: any) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post(`${BACK_ROUTE}/user/signin`, form);
      const loginUser = res.data;
      if (typeof res.data !== 'object') {
        dispatch(loginFailed());
      } else {
        localStorage.setItem('user', JSON.stringify(loginUser.user));
        localStorage.setItem('token', JSON.stringify(loginUser.token));
        dispatch(setUser(loginUser.user));
        const cartLocal = await JSON.parse(localStorage.getItem('cart') || '[]');
        const cartUser = await dispatch(getProductsInCart(loginUser.user.id));
        if (cartUser) {
          const nuevo = arrayUnique(cartLocal.concat(cartUser.payload));
          const produsctId = nuevo.map((el) => el.id);
          await axios.post(`${BACK_ROUTE}/orders/${loginUser.user.id}/invited/cart`, {products: produsctId, address: 'cordoba'});
        }
        dispatch(setToken(loginUser.token));
      }
    } catch (err) {
      dispatch(loginFailed());
      console.error(err);
      // this is here for helping with error handling
      if (err) return 'error';
    }
  };
};

// requests login with google to back-end
const loginGoogle = (googleUser) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post(`${BACK_ROUTE}/user/signupgoogle`, googleUser);
      const loginUser = res.data;
      if (typeof res.data !== 'object') {
        dispatch(loginFailed());
      } else if (!res.data.token || !res.data.user) {
        alert('SignUp successfuly, please Log in');
      } else {
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

// logs out locally
const logout = () => {
  return async (dispatch: any) => {
    try {
      localStorage.setItem('user', '{}');
      localStorage.setItem('token', '');
      localStorage.removeItem('cart');
      await dispatch(setUser({}));
      await dispatch({type: DELETE_ALL_CART});
    } catch (err) {
      console.log(err);
    }
  };
};

// request to modify user to back-end
const modifyUser = (changes:userChanges, token:string) => {
  return async (dispatch:any) => {
    try {
      localStorage.setItem('user', JSON.stringify(changes));
      await axios.put(`${BACK_ROUTE}/user/${changes.id}`, changes, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      dispatch(setUser(changes));
    } catch (err) {
      console.error(err);
      if (err) return 'error';
    }
  };
};

// request to modify user adress to back-end

const modifyAddress = (address:Address, token:string) => {
  return async (dispatch:any) => {
    try {
      dispatch(setUser(address));
      dispatch(setToken(token));
      console.log(address);
      await axios.put(`${BACK_ROUTE}/user/${address.id}`, address, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
    } catch (err) {
      console.error(err);
      // this is for error handling
      if (err) return 'error';
    }
  };
};

// request all users to back-end
const getUsers = (token:string) => {
  return async (dispatch:any) => {
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

const setSubscribe = (email:string) => {
  return async (dispatch:any) => {
    try {
      await axios.put(`${BACK_ROUTE}/user/${email}/subscribe`);
    } catch (err) {
      console.error(err);
    }
  };
};

const getUser = (id:string, token:string) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${BACK_ROUTE}/user/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      const userProfile = res.data;
      dispatch(setUserProfile(userProfile));
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
  modifyAddress,
  setUser,
  setSubscribe,
  getUser,
};
