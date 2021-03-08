import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

import * as actionCreators from '../actions/index';

export function* purchaseBurgerSaga({ orderData, token }) {
  console.log('saga token', token);
  yield put(actionCreators.purchaseBurgerStart());

  try {
    const { data } = yield axios.post(`/orders.json?auth=${token}`, orderData);
    yield put(actionCreators.purchaseBurgerSuccess(data.name, orderData));
  } catch (error) {
    yield put(actionCreators.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga({ token, userId }) {
  yield put(actionCreators.fetchOrdersStart());

  const searchParams = new URLSearchParams({
    auth: token,
    orderBy: `"userId"`,
    equalTo: `"${userId}"`,
  });

  try {
    const { data } = yield axios.get(`/orders.json?${searchParams.toString()}`);
    const orders = Object.keys(data).map(key => ({
      id: key,
      ...data[key],
    }));
    yield put(actionCreators.fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(actionCreators.fetchOrdersFailed(error));
  }
}
