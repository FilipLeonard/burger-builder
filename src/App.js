import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actionCreators from './store/actions/index';

const AsyncCheckout = asyncComponent(() =>
  import('./containers/Checkout/Checkout')
);
const AsyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const AsyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

class App extends Component {
  constructor(props) {
    super(props);
    props.tryAutoLogin();
  }

  render() {
    const routes = this.props.isAuthenticated ? (
      <Switch>
        <Route path="/checkout" component={AsyncCheckout} />
        <Route path="/orders" component={AsyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/auth" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  tryAutoLogin: () => dispatch(actionCreators.checkAuthState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
