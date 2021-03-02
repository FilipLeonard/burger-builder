import React from 'react';

// webpack will assign burgerLogo the final, after-build path of the image
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
