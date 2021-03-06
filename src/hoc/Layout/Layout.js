import React from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  state = {
    isSideDrawerOpened: false,
  };

  drawerToggledHandler = () => {
    this.setState(prevState => ({
      isSideDrawerOpened: !prevState.isSideDrawerOpened,
    }));
  };

  sideDrawerClosedHandler = () => {
    this.setState({ isSideDrawerOpened: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.drawerToggledHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.isSideDrawerOpened}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
