import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = props => {
  const handleNavLinkClick = () => {
    props.onNavLinkClick();
  };

  return (
    <li className={classes.NavigationItem}>
      <NavLink
        exact
        to={{ pathname: props.link }}
        activeClassName={classes.active}
        onClick={handleNavLinkClick}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
