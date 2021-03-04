import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientType, howMany) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientType,
  howMany,
});

export const initIngredients = () => {
  return async function (dispatch) {
    try {
      const { data: ingredients } = await axios.get('/ingredients.json');
      dispatch(setIngredients(ingredients));
    } catch (error) {
      dispatch(fetchIngredientsFailed(error));
    }
  };
};

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});
