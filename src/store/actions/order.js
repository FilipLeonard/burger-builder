import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const purchaseBurger = (orderData, token) => {
  return async function (dispatch) {
    dispatch(purchaseBurgerStart());

    try {
      const { data } = await axios.post(
        `/orders.json?auth=${token}`,
        orderData
      );
      dispatch(purchaseBurgerSuccess(data.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const fetchOrders = (token, userId) => {
  return async function (dispatch) {
    dispatch(fetchOrdersStart());

    const searchParams = new URLSearchParams({
      auth: token,
      orderBy: `"userId"`,
      equalTo: `"${userId}"`,
    });

    try {
      const { data } = await axios.get(
        `/orders.json?${searchParams.toString()}`
      );
      const orders = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      dispatch(fetchOrdersSuccess(orders));
    } catch (error) {
      dispatch(fetchOrdersFailed(error));
    }
  };
};

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFailed = error => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error,
});
