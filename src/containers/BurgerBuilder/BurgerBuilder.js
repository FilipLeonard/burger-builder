import React from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  async componentDidMount() {
    try {
      const { data: ingredients } = await axios.get('/ingredients.json');
      this.setState({ ingredients });
    } catch (error) {
      console.log('[BurgerBuilder] componentDidMount - axios error', error);
      this.setState({ error: true });
    }
  }

  addIngredientHandler = type => {
    this._addIngredient(type, 1);
  };

  removeIngredientHandler = type => {
    this._addIngredient(type, -1);
  };

  purchaseStartHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    const queryString = Object.entries(this.state.ingredients)
      .map(
        ([param, value]) =>
          `${encodeURIComponent(param)}=${encodeURIComponent(value)}`
      )
      .concat([`price=${this.state.totalPrice}`])
      .join('&');
    this.props.history.push(`/checkout?${queryString}`);
  };

  _addIngredient = (ofType, thatMany) => {
    const oldCount = this.state.ingredients[ofType];
    const newCount = oldCount + thatMany;
    if (newCount < 0) return;
    const updatedIngredients = {
      ...this.state.ingredients,
      [ofType]: newCount,
    };
    const updatedPrice =
      this.state.totalPrice + INGREDIENT_PRICES[ofType] * thatMany;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: Number.parseFloat(updatedPrice.toFixed(2)),
    });
    this._updatePurchaseState(updatedIngredients);
  };

  _updatePurchaseState = ingredients => {
    const totalIngredientsCount = !!Object.values(ingredients).reduce(
      (count, currCount) => count + currCount,
      0
    );
    const purchasable = totalIngredientsCount > 0;
    this.setState({ purchasable });
  };

  getDisabledInfo = () =>
    Object.fromEntries(
      Object.entries(this.state.ingredients).map(([ingr, count]) => [
        ingr,
        !count,
      ])
    );

  render() {
    // const disabledInfo = this.getDisabledInfo();

    const orderSummary =
      this.state.loading || !this.state.ingredients ? (
        <Spinner />
      ) : (
        <OrderSummary
          ingredients={this.state.ingredients}
          onCancelOrder={this.purchaseCancelHandler}
          onContinueOrder={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );

    const burger = this.state.ingredients ? (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={this.getDisabledInfo()}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          startPurchase={this.purchaseStartHandler}
        />
      </Aux>
    ) : this.state.error ? (
      <p>Ingredients cannot be fetched</p>
    ) : (
      <Spinner />
    );

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
