import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.css';

const button = props => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.onPress}
  >
    {props.children}
  </button>
);

button.propTypes = {
  btnType: PropTypes.oneOf(['Success', 'Danger']),
};

export default button;
