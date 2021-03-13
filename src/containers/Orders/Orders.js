import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {
  const { token, userId } = props;
  useEffect(() => {
    props.onFetchOrders(token, userId);
  }, [token, userId]);

  const orders = props.loading ? (
    <Spinner />
  ) : (
    props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ))
  );

  return <div>{orders}</div>;
};

const mapStateToProps = state => ({
  loading: state.order.loadingOrders,
  orders: state.order.orders,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) =>
    dispatch(actionCreators.fetchOrders(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
