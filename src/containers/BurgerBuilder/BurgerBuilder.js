import React from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
    error: false,
  };

  async componentDidMount() {
    // try {
    //   const { data: ingredients } = await axios.get('/ingredients.json');
    //   this.setState({ ingredients });
    // } catch (error) {
    //   console.log('[BurgerBuilder] componentDidMount - axios error', error);
    //   this.setState({ error: true });
    // }
    this.props.initIngredients();
  }

  purchaseStartHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    this.props.history.push(`/checkout`);
  };

  isPurchasable = () =>
    Object.values(this.props.ingredients).reduce(
      (totalIngredientsCount, currentIngredientCount) =>
        totalIngredientsCount + currentIngredientCount,
      0
    ) > 0;

  getDisabledInfo = () =>
    Object.fromEntries(
      Object.entries(this.props.ingredients).map(([ingr, count]) => [
        ingr,
        !count,
      ])
    );

  render() {
    const orderSummary = !this.props.ingredients ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.props.ingredients}
        onCancelOrder={this.purchaseCancelHandler}
        onContinueOrder={this.purchaseContinueHandler}
        price={this.props.totalPrice}
      />
    );

    const burger = this.props.ingredients ? (
      <Aux>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          addIngredient={this.props.addIngredientHandler}
          removeIngredient={this.props.removeIngredientHandler}
          disabled={this.getDisabledInfo()}
          purchasable={this.isPurchasable()}
          price={this.props.totalPrice}
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

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
});

const mapDispatchToProps = dispatch => ({
  addIngredientHandler: ingredientType => {
    dispatch(actionCreators.addIngredient(ingredientType, 1));
  },
  removeIngredientHandler: ingredientType => {
    dispatch(actionCreators.addIngredient(ingredientType, -1));
  },
  initIngredients: () => {
    dispatch(actionCreators.initIngredients());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
