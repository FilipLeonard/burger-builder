import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon', type: 'bacon' },
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>${props.price.toFixed(2)}</strong>
    </p>
    {controls.map(({ label, type }) => (
      <BuildControl
        key={label}
        label={label}
        onClickMore={() => props.addIngredient(type)}
        onClickLess={() => props.removeIngredient(type)}
        disabledLess={props.disabled[type]}
      />
    ))}
    <button
      onClick={props.startPurchase}
      className={classes.OrderButton}
      disabled={!props.purchasable}
    >
      ORDER NOW
    </button>
  </div>
);

export default buildControls;
