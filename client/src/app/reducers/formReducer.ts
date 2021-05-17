// Actions
// Types
import {FormState} from '../../types';

const initialState : FormState = {
  inputs: {
    categories: [],
    description: '',
    color: [],
    name: '',
    picture: [],
    price: '',
    size: '',
    stock: 0,
    available: true,
  },
};

const formReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default formReducer;
