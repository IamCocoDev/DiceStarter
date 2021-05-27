/* eslint-disable no-unused-vars */
import axios from 'axios';
import {BACK_ROUTE} from '../../../ROUTE.js';

export const GET_ORDERS = 'GET_ORDERS';

const setOrders = (orders) => ({
  type: GET_ORDERS,
  payload: orders,
});

const getOrders = (token) => {
  return async (dispatch: any) => {
    try {
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

export {
  getOrders,
};
