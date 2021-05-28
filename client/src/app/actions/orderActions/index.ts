/* eslint-disable no-unused-vars */
import axios from 'axios';
import {BACK_ROUTE} from '../../../ROUTE.js';

export const GET_ORDERS = 'GET_ORDERS';

const setOrders = (orders) => ({
  type: GET_ORDERS,
  payload: orders,
});

const getOrders = (token, orderStatus) => {
  return async (dispatch: any) => {
    try {
      // eslint-disable-next-line max-len
      const res = await axios.get(`${BACK_ROUTE}/orders/status/${orderStatus}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      dispatch(setOrders(res.data));
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
};

const putOrderStatus = (idUser, newStatus, token) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`${BACK_ROUTE}/orders/${idUser}/update/cart`, newStatus);
      const res = await axios.get(`${BACK_ROUTE}/orders/status/allorders`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      dispatch(setOrders(res.data));
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
};

const getUserOrders = (userId) => {
  return async (dispatch: any) => {
    try {
      // eslint-disable-next-line max-len
      const res = await axios.post(`${BACK_ROUTE}/orders/search/user/${userId}/`);
      dispatch(setOrders(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  getOrders,
  putOrderStatus,
  getUserOrders,
};
