import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../axios-orders';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';

const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const ingredients = useSelector(
    ({ burgerBuilder }) => burgerBuilder.ingredients
  );
  const totalPrice = useSelector(
    ({ burgerBuilder }) => burgerBuilder.totalPrice
  );
  const error = useSelector(({ burgerBuilder }) => burgerBuilder.error);
  const isAuthenticated = useSelector(({ auth }) => !!auth.token);

  const dispatch = useDispatch();

  const onInitIngredients = useCallback(
    () => dispatch(actionCreators.initIngredients()),
    []
  );
  const addIngredientHandler = useCallback(
    ingredientType => dispatch(actionCreators.addIngredient(ingredientType, 1)),
    []
  );
  const removeIngredientHandler = useCallback(
    ingredientType =>
      dispatch(actionCreators.addIngredient(ingredientType, -1)),
    []
  );
  const onInitPurchase = useCallback(
    () => dispatch(actionCreators.purchaseInit()),
    []
  );
  const onSetAuthRedirectPath = useCallback(
    path => dispatch(actionCreators.setAuthRedirectPath(path)),
    []
  );

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseStartHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push({
        pathname: '/auth',
        state: { test: 'state sent via redirect' },
      });
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = async () => {
    onInitPurchase();
    props.history.push(`/checkout`);
  };

  const isPurchasable = () =>
    Object.values(ingredients).reduce(
      (totalIngredientsCount, currentIngredientCount) =>
        totalIngredientsCount + currentIngredientCount,
      0
    ) > 0;

  const getDisabledInfo = () =>
    Object.fromEntries(
      Object.entries(ingredients).map(([ingr, count]) => [ingr, !count])
    );

  const orderSummary = !ingredients ? (
    <Spinner />
  ) : (
    <OrderSummary
      ingredients={ingredients}
      onCancelOrder={purchaseCancelHandler}
      onContinueOrder={purchaseContinueHandler}
      price={totalPrice}
    />
  );

  const burger = ingredients ? (
    <Aux>
      <Burger ingredients={ingredients} />
      <BuildControls
        addIngredient={addIngredientHandler}
        removeIngredient={removeIngredientHandler}
        disabled={getDisabledInfo()}
        purchasable={isPurchasable()}
        price={totalPrice}
        startPurchase={purchaseStartHandler}
        isAuth={isAuthenticated}
      />
    </Aux>
  ) : error ? (
    <p>Ingredients cannot be fetched</p>
  ) : (
    <Spinner />
  );

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(burgerBuilder, axios);
