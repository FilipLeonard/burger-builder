import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
  const handleNavItemClick = () => {
    props.onNavItemClick && props.onNavItemClick();
  };

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem onNavLinkClick={handleNavItemClick} link="/">
        Burger Builder
      </NavigationItem>
      {props.isAuth ? (
        <React.Fragment>
          <NavigationItem onNavLinkClick={handleNavItemClick} link="/orders">
            Orders
          </NavigationItem>
          <NavigationItem onNavLinkClick={handleNavItemClick} link="/logout">
            Logout
          </NavigationItem>
        </React.Fragment>
      ) : (
        <NavigationItem onNavLinkClick={handleNavItemClick} link="/auth">
          Authenticate
        </NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
