import axios from 'axios';
import { put, delay } from 'redux-saga/effects';
import { addSeconds, differenceInSeconds, isPast } from 'date-fns';

import * as actionCreators from '../actions/index';

const FIREBASE = {
  API_KEY: 'AIzaSyBKSmpoz7VpAV-dQ6jpgE8XcfAfB1wHFoA',
  SIGN_UP: 'signUp',
  SIGN_IN: 'signInWithPassword',
};

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');

  yield put(actionCreators.logoutSuceed());
}

export function* setAuthExpiryTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actionCreators.logout());
}

export function* authUserSaga({ email, password, isSignUp }) {
  yield put(actionCreators.authStart());

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${
    isSignUp ? FIREBASE.SIGN_UP : FIREBASE.SIGN_IN
  }?key=${FIREBASE.API_KEY}`;

  const authRequestData = { email, password, returnSecureToken: true };

  try {
    const { data: authData } = yield axios.post(url, authRequestData);

    yield localStorage.setItem('token', authData.idToken);
    const expirationDate = addSeconds(new Date(), authData.expiresIn);

    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', authData.localId);

    yield put(actionCreators.authSuccess(authData.idToken, authData.localId));
    yield put(actionCreators.setAuthExpiryTimeout(authData.expiresIn));
  } catch (error) {
    yield put(actionCreators.authFail(error.response.data.error));
  }
}

export function* checkAuthStateSaga() {
  const token = yield localStorage.getItem('token');
  const expirationDate = new Date(yield localStorage.getItem('expirationDate'));
  if (!token || isPast(expirationDate)) {
    return yield put(actionCreators.logout());
  }

  const userId = yield localStorage.getItem('userId');
  yield put(actionCreators.authSuccess(token, userId));
  yield put(
    actionCreators.setAuthExpiryTimeout(
      differenceInSeconds(expirationDate, Date.now())
    )
  );
}

// const isTokenValid = () => {
//   const token = localStorage.getItem('token');
//   const expirationDate = new Date(localStorage.getItem('expirationDate'));

//   return token && isFuture(expirationDate);
// };
