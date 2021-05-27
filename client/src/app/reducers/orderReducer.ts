import {GET_ORDERS} from '../actions/orderActions';
import {RootState} from '../store';

const initialState = {
  orders: [],
};

const handleOrderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default handleOrderReducer;

export const orderList = (state: RootState) =>
  state.handleOrder.orders;
