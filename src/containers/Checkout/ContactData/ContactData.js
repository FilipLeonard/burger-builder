import React from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        // value: 'Leontin',
        validation: {
          required: true,
        },
        valid: false,
        // valid: true,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        // value: 'Telegrafului 65',
        validation: {
          required: true,
        },
        valid: false,
        // valid: true,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIPCODE',
        },
        value: '',
        // value: '30049',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        // valid: true,
        touched: false,
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City',
        },
        value: '',
        // value: 'Timisoara',
        validation: {
          required: true,
        },
        valid: false,
        // valid: true,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        // value: 'Romania',
        validation: {
          required: true,
        },
        valid: false,
        // valid: true,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        // value: 'leo@leo.com',
        validation: {
          required: true,
        },
        valid: false,
        // valid: true,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest',
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest',
            },
            {
              value: 'optimal',
              displayValue: 'Optimal',
            },
          ],
        },
        value: 'optimal',
      },
    },
    formIsInvalid: true,
    // formIsInvalid: false,
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    const order = {
      userId: this.props.userId,
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = event => {
    const { name, value } = event.target;

    const valid = checkValidity(value, {
      ...this.state.orderForm[name].validation,
    });
    const updatedFormElement = updateObject(this.state.orderForm[name], {
      value,
      valid,
      touched: true,
    });

    const updatedForm = updateObject(this.state.orderForm, {
      [name]: updatedFormElement,
    });

    const formIsInvalid = this.isFormInvalid(updatedForm);

    this.setState({ orderForm: updatedForm, formIsInvalid });
  };

  isFormInvalid(form) {
    return Object.entries(form).some(([formEl, { valid }]) => valid === false);
  }

  render() {
    const formElements = Object.entries(
      this.state.orderForm
    ).map(([key, config]) => (
      <Input
        key={key}
        label={key}
        name={key}
        elementType={config.elementType}
        elementConfig={config.elementConfig}
        value={config.value}
        shouldValidate={config.validation}
        invalid={!config.valid}
        touched={config.touched}
        changed={this.inputChangedHandler}
      />
    ));

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}
        <Button btnType="Success" disabled={this.state.formIsInvalid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) form = <Spinner />;

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actionCreators.purchaseBurger(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
