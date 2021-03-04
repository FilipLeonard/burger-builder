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
    this.props.onInitIngredients();
  }

  purchaseStartHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    this.props.onInitPurchase();
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
    ) : this.props.error ? (
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
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
});

const mapDispatchToProps = dispatch => ({
  onInitIngredients: () => {
    dispatch(actionCreators.initIngredients());
  },
  addIngredientHandler: ingredientType => {
    dispatch(actionCreators.addIngredient(ingredientType, 1));
  },
  removeIngredientHandler: ingredientType => {
    dispatch(actionCreators.addIngredient(ingredientType, -1));
  },
  onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
