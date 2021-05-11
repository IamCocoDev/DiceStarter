import axios from 'axios';
// Local status
export const RESET_FORM_STATUS = 'RESET_FORM_STATUS';
// Async status
export const SEND_FORM_BEGIN = 'SEND_FORM_BEGIN';
export const SEND_FORM_SUCCESS = 'FETCH_DETAIL_SUCCESS';
export const SEND_FORM_FAILURE = 'FETCH_DETAIL_FAILURE';

// Local status reseter
// eslint-disable-next-line no-unused-vars
const resetFormStatus = (status: string) => ({
  type: RESET_FORM_STATUS,
  payload: status,
});
// Status setters for async calls
const sendFormBegin = () => ({
  type: SEND_FORM_BEGIN,
});
const sendFormSuccess = (detail: any) => ({
  type: SEND_FORM_SUCCESS,
  payload: {detail},
});
const sendFormFailure = (error: any) => ({
  type: SEND_FORM_FAILURE,
  payload: {error},
});

const sendFormAsync = (form: any) => {
  return async (dispatch: any) => {
    dispatch(sendFormBegin);
    try {
      await axios.post(`http://localhost:3001/product`, form);
      dispatch(sendFormSuccess);
    } catch (err) {
      dispatch(sendFormFailure(err));
    }
  };
};

export {
  resetFormStatus,
  sendFormBegin,
  sendFormFailure,
  sendFormSuccess,
  sendFormAsync,
};
