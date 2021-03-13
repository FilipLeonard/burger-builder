import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
  const [isSideDrawerOpened, setIsSideDrawerOpened] = useState(false);

  const drawerToggledHandler = () => {
    setIsSideDrawerOpened(prevState => !prevState);
  };

  const sideDrawerClosedHandler = () => {
    setIsSideDrawerOpened(false);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={drawerToggledHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={isSideDrawerOpened}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(layout);
