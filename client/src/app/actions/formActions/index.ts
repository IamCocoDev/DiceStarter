import axios from 'axios';
// eslint-disable-next-line no-unused-vars
const sendFormAsync = (form: any) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`http://localhost:3001/product`, form);
    } catch (err) {
      console.log(err);
    }
  };
};

export {
  sendFormAsync,
};
