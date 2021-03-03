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
      console.log('[BurgerBuilder] componentDidMount - axios error', error);
    }
  };
};

const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});
