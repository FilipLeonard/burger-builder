import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreators from './store/actions/index';

const LazyCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const LazyOrders = React.lazy(() => import('./containers/Orders/Orders'));
const LazyAuth = React.lazy(() => import('./containers/Auth/Auth'));

const app = props => {
  const { tryAutoLogin } = props;
  useEffect(() => {
    tryAutoLogin();
  }, [tryAutoLogin]);

  const routes = props.isAuthenticated ? (
    <Switch>
      <Route path="/checkout" render={props => <LazyCheckout {...props} />} />
      <Route path="/orders" render={props => <LazyOrders {...props} />} />
      <Route path="/logout" component={Logout} />
      <Route path="/auth" render={props => <LazyAuth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/auth" render={() => <LazyAuth />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  tryAutoLogin: () => dispatch(actionCreators.checkAuthState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
