import React from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {
  async componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    const orders = this.props.loading ? (
      <Spinner />
    ) : (
      this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))
    );

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => ({
  loading: state.order.loadingOrders,
  orders: state.order.orders,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actionCreators.fetchOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
