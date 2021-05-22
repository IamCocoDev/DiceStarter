import axios from 'axios';
// eslint-disable-next-line no-unused-vars
const sendFormAsync = (form: any, token:string) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`http://localhost:3001/product`, form, {
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
