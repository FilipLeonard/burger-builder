import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};

const orderSummary = props => {
  const ingredientsSummary = Object.entries(props.ingredients)
    .filter(([_, count]) => count > 0)
    .map(([ingr, count]) => (
      <li key={ingr}>
        <span style={{ textTransform: 'capitalize' }}>{ingr}</span> x {count}: $
        {(count * INGREDIENT_PRICES[ingr]).toFixed(2)}
      </li>
    ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" onPress={props.onCancelOrder}>
        CANCEL
      </Button>
      <Button btnType="Success" onPress={props.onContinueOrder}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
