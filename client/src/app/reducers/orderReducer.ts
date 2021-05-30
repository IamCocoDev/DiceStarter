import {GET_ORDERS, GET_ONE_ORDERS} from '../actions/orderActions';
import {RootState} from '../store';

const initialState = {
  orders: [],
  orderInfo: {},
};

const handleOrderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_ONE_ORDERS:
      return {
        ...state,
        orderInfo: action.payload,
      };
    default:
      return state;
  }
};

export default handleOrderReducer;

export const orderList = (state: RootState) =>
  state.handleOrder.orders;
export const orderInfo = (state: RootState) =>
  state.handleOrder.orderInfo;
