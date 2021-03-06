import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  purchased: false,
  loading: false,
  loadingOrders: false,
};

const purchaseInit = state => updateObject(state, { purchased: false });

const purchaseBurgerStart = state => updateObject(state, { loading: true });

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {
    id: action.orderId,
  });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = state =>
  updateObject(state, { loading: false, purchased: false });

const fetchOrdersStart = state => updateObject(state, { loadingOrders: true });

const fetchOrdersSuccess = (state, action) =>
  updateObject(state, {
    orders: action.orders,
    loadingOrders: false,
  });

const fetchOrdersFailed = state =>
  updateObject(state, { loadingOrders: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state);
    default:
      return state;
  }
};

export default reducer;
