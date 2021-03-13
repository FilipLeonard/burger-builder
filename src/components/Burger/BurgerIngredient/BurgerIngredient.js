import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

const ingredients = {
  'bread-bottom': <div className={classes.BreadBottom}></div>,
  'bread-top': (
    <div className={classes.BreadTop}>
      <div className={classes.Seeds1}></div>
      <div className={classes.Seeds2}></div>
    </div>
  ),
  meat: <div className={classes.Meat}></div>,
  cheese: <div className={classes.Cheese}></div>,
  salad: <div className={classes.Salad}></div>,
  bacon: <div className={classes.Bacon}></div>,
};

const burgerIngredient = props => {
  return ingredients[props.type];
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngredient;
