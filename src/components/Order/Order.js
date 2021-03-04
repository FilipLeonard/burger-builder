import React from 'react';

import classes from './Order.css';

const order = props => {
  if (!props.ingredients) return null;
  const formattedIngredients = Object.entries(props.ingredients).map(
    ([ingr, amount]) => (
      <span
        key={ingr}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        {ingr} ({amount})
      </span>
    )
  );

  return (
    <div className={classes.Order}>
      <p>Ingrdients: {formattedIngredients}</p>
      <p>
        Price: <strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default order;
