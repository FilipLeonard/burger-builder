import React from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get('/orders.json');
      const orders = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      this.setState({ orders, loading: false });
    } catch (error) {
      console.log('[Orders] componentDidMount - axios error', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const orders = this.state.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
