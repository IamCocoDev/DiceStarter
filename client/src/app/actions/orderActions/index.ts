/* eslint-disable no-unused-vars */
import axios from 'axios';
import {BACK_ROUTE} from '../../../ROUTE.js';

export const GET_ORDERS = 'GET_ORDERS';
export const GET_ONE_ORDERS = 'GET_ONE_ORDERS';

const setOrders = (orders) => ({
  type: GET_ORDERS,
  payload: orders,
});

const setOneOrders = (order) => ({
  type: GET_ONE_ORDERS,
  payload: order,
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
      const res = await axios.get(`${BACK_ROUTE}/orders/search/user/${userId}/`);
      dispatch(setOrders(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const clearOrders = () => {
  return async (dispatch: any) => {
    try {
      dispatch(setOrders([]));
    } catch (error) {
      console.log(error);
    }
  };
};

const clearOneOrder = () => {
  return async (dispatch: any) => {
    try {
      dispatch(setOneOrders({}));
    } catch (error) {
      console.log(error);
    }
  };
};

const getOneOrder = (order, total) => {
  return async (dispatch: any) => {
    try {
      const neworder = {...order, price: total};
      dispatch(setOneOrders(neworder));
    } catch (error) {
      console.log(error);
    }
  };
};

const setAddress = (idUser, price, address) => {
  return async (dispatch: any) => {
    try {
      await axios.put(`${BACK_ROUTE}/orders/${idUser}/updateorder`,
          {price, address});
      const res = await axios
          .get(`${BACK_ROUTE}/orders/search/user/${idUser}/`);
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
  clearOrders,
  clearOneOrder,
  getOneOrder,
  setAddress,
};
