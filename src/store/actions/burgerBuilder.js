import * as actionTypes from './actionTypes';

export const initIngredients = () => ({
  type: actionTypes.INIT_INGREDIENTS,
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const addIngredient = (ingredientType, howMany) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientType,
  howMany,
});
