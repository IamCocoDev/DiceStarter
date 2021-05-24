import axios from 'axios';
import {BACK_ROUTE} from '../../../ROUTE.js';
// eslint-disable-next-line no-unused-vars
const sendFormAsync = (form: any, token:string) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`${BACK_ROUTE}/product`, form, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export {
  sendFormAsync,
};
