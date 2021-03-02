import React from 'react';

import classes from './BuildControl.css';

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.onClickLess}
      disabled={props.disabledLess}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.onClickMore}>
      More
    </button>
  </div>
);

export default buildControl;
