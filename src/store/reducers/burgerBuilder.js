import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 4,
};

const addIngredient = (state, { ingredientType, howMany }) => {
  const oldCount = state.ingredients[ingredientType];
  const newCount = oldCount + howMany;
  if (newCount < 0) return state;
  const updatedIngredients = updateObject(state.ingredients, {
    [ingredientType]: newCount,
  });
  const updatedPrice =
    state.totalPrice + INGREDIENT_PRICES[ingredientType] * howMany;

  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: Number.parseFloat(updatedPrice.toFixed(2)),
  });
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
  });
};

const fetchIngredientsFailed = state => updateObject(state, { error: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
};

export default reducer;
