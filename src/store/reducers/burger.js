import * as actionTypes from '../actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const addIngredientAndGetUpdatedState = (oldState, ingredientType, howMany) => {
  const oldCount = oldState.ingredients[ingredientType];
  const newCount = oldCount + howMany;
  if (newCount < 0) return oldState;
  const updatedIngredients = {
    ...oldState.ingredients,
    [ingredientType]: newCount,
  };
  const updatedPrice =
    oldState.totalPrice + INGREDIENT_PRICES[ingredientType] * howMany;

  return {
    ingredients: updatedIngredients,
    totalPrice: Number.parseFloat(updatedPrice.toFixed(2)),
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredientAndGetUpdatedState(state, action.ingredientType, 1);
    case actionTypes.REMOVE_INGREDIENT:
      return addIngredientAndGetUpdatedState(state, action.ingredientType, -1);
    default:
      return state;
  }
};

export default reducer;
