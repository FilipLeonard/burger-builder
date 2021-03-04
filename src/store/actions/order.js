import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const purchaseBurger = orderData => {
  return async function (dispatch) {
    dispatch(purchaseBurgerStart());
    try {
      const { data } = await axios.post('/orders.json', orderData);
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

export const fetchOrders = () => {
  return async function (dispatch) {
    dispatch(fetchOrdersStart());
    try {
      const { data } = await axios.get('/orders.json');
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
