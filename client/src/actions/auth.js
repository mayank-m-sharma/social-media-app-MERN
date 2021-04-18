import axios from 'axios';
import { setAlert } from './alert';
import M from 'materialize-css';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (
  dispatch
) => {

  // const body = JSON.stringify({ name, email, password, username });

  try {
    const res = await axios.post('/api/users', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout user
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

//Password reset mail -
export const sendResetLink = (resetEmail) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    email: resetEmail,
  };
  try {
    const res = axios.post('/api/resetpassword', body, config);
  } catch (error) {
    console.log(error);
  }
};

// Forget Password
export const forgetPassword = (pack) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    axios
      .post('/api/resetpassword/newpassword', pack, config)
      .then((res) => {
        if (res.data.errcode === 'err-001') {
          M.toast({
            html: `${res.data.msg}`,
            classes: '#d32f2f red darken-2',
          });
        }
        if (res.data.successcode === 'succ-001') {
          M.toast({
            html: `${res.data.msg}`,
            classes: '#81c784 green lighten-2',
          });
        }
        setTimeout(function () {
          window.location.replace('http://localhost:3000/login');
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};


// Change Profile Picture-
export const changeProfilePic = (formData, userid) => {
  try {
    axios.put(`/api/users/changeProfilePicture/${userid}`, formData)
    M.toast({
      html: `Profile Image Updated`,
      classes: '#81c784 green lighten-2',
    })
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  } catch (err) {
    console.log(err);
    M.toast({
      html: `Something went wrong`,
      classes: '#81c784 green lighten-2',
    });
  }
};