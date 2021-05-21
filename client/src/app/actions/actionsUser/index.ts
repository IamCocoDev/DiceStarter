/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import axios from 'axios';
import {getProductsInCart} from '../cartActions';
import {SET_USER,
  SET_USERS,
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
      // eslint-disable-next-line no-unused-vars
      const cartLocal = await JSON.parse(localStorage.getItem('cart') || '[]');
      const cartUser = await dispatch(getProductsInCart(loginUser.id));
      const nuevo = arrayUnique(cartLocal.concat(cartUser.payload));
      const produsctId = nuevo.map((el) => el.id);
      console.log(nuevo);
      await axios.post(`http://localhost:3001/orders/${loginUser.id}/invited/cart`, {products: produsctId, address: 'cordoba'});
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
      localStorage.removeItem('cart');
      dispatch(setUser({}));
    } catch (err) {
      console.log(err);
    }
  };
};

const modifyUser = (changes:userChanges) => {
  return async (dispatch) => {
    try {
      const toSend = {
        id: '8ef25ffe-04a5-4cf6-a1cc-2e568536ebad',
        role: 'Admin',
        status: 'Active',
      };
      dispatch(setUser(changes));
      await axios.put(`http://localhost:3001/user/${changes.id}`, toSend);
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
