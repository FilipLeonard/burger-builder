import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actionCreators.logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
