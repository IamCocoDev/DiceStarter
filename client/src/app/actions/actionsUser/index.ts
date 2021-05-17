import axios from 'axios';

// Local status
export const RESET_FORM_STATUS = 'RESET_FORM_STATUS';
export const SET_USER = 'SET_USER';

// Local status reseter
// eslint-disable-next-line no-unused-vars
const resetFormStatus = (status: string) => ({
  type: RESET_FORM_STATUS,
  payload: status,
});
// Status setters for async calls
const setUser = (user: any) => ({
  type: SET_USER,
  payload: {user},
});


const sendFormAsync = (form: any) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`http://localhost:3001/user/signup`, form);
    } catch (err) {
      console.log(err);
    }
  };
};

const loginFormAsync = (form: any) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post(`http://localhost:3001/user/signin`, form);
      const loginUser = res.data;
      localStorage.setItem('user', JSON.stringify(loginUser));
      dispatch(setUser(loginUser));
    } catch (err) {
      console.log(err);
    }
  };
};

const loginGoogle = (user: any) => {
  return async (dispatch: any) => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
    }
  };
};

const logout = () => {
  return async (dispatch: any) => {
    try {
      localStorage.setItem('user', '{}');
      dispatch(setUser({}));
    } catch (err) {
      console.log(err);
    }
  };
};
export {
  resetFormStatus,
  sendFormAsync,
  loginFormAsync,
  loginGoogle,
  logout,
};
