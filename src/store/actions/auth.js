import axios from 'axios';
import { addSeconds, differenceInSeconds, isPast } from 'date-fns';

import * as actionTypes from './actionTypes';
import { waitSeconds } from '../../shared/utility';

const FIREBASE = {
  API_KEY: 'AIzaSyBKSmpoz7VpAV-dQ6jpgE8XcfAfB1wHFoA',
  SIGN_UP: 'signUp',
  SIGN_IN: 'signInWithPassword',
};

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const setAuthExpiryTimeout = expirationTime => {
  return async function (dispatch) {
    await waitSeconds(expirationTime);
    dispatch(logout());
  };
};

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (email, password, isSignUp) => {
  return async function (dispatch) {
    dispatch(authStart());

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${
      isSignUp ? FIREBASE.SIGN_UP : FIREBASE.SIGN_IN
    }?key=${FIREBASE.API_KEY}`;

    const authRequestData = { email, password, returnSecureToken: true };

    try {
      const { data: authData } = await axios.post(url, authRequestData);

      localStorage.setItem('token', authData.idToken);
      const expirationDate = addSeconds(new Date(), authData.expiresIn);

      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', authData.localId);

      dispatch(authSuccess(authData.idToken, authData.localId));
      dispatch(setAuthExpiryTimeout(authData.expiresIn));
    } catch (error) {
      console.log({ error });
      dispatch(authFail(error.message || error.response.data.error));
    }
  };
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const checkAuthState = () => {
  return function (dispatch) {
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (!token || isPast(expirationDate)) {
      return dispatch(logout());
    }

    const userId = localStorage.getItem('userId');
    dispatch(authSuccess(token, userId));
    dispatch(
      setAuthExpiryTimeout(differenceInSeconds(expirationDate, Date.now()))
    );
  };
};

// const isTokenValid = () => {
//   const token = localStorage.getItem('token');
//   const expirationDate = new Date(localStorage.getItem('expirationDate'));

//   return token && isFuture(expirationDate);
// };
