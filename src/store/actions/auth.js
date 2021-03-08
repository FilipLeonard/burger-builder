import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});

export const logout = () => ({
  type: actionTypes.AUTH_INITIATE_LOGOUT,
});

export const logoutSuceed = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const setAuthExpiryTimeout = expirationTime => ({
  type: actionTypes.SET_AUTH_EXPIRY_TIMEOUT,
  expirationTime,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const authUser = (email, password, isSignUp) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignUp,
});

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const checkAuthState = () => ({
  type: actionTypes.CHECK_AUTH_STATE,
});
