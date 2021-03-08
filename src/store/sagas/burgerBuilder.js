import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

import * as actionCreators from '../actions/index';

export function* initIngredientsSaga() {
  try {
    const { data: ingredients } = yield axios.get('/ingredients.json');
    yield put(actionCreators.setIngredients(ingredients));
  } catch (error) {
    yield put(actionCreators.fetchIngredientsFailed(error));
  }
}
