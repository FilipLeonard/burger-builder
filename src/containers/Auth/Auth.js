import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actionCreators from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        // value: 'leonard@gmail.com',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        // valid: true,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        // value: '123456',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        // valid: true,
        touched: false,
      },
    },
    formIsInvalid: true,
    // formIsInvalid: false,
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/');
    }
  }

  inputChangedHandler = event => {
    const { name, value } = event.target;
    const rules = {
      ...this.state.controls[name].validation,
    };

    const valid = checkValidity(value, rules);

    const updatedFormElement = updateObject(this.state.controls[name], {
      value,
      valid,
      touched: true,
    });
    const updatedForm = updateObject(this.state.controls, {
      [name]: updatedFormElement,
    });

    const formIsInvalid = this.isFormInvalid(updatedForm);

    this.setState({ controls: updatedForm, formIsInvalid });
  };

  isFormInvalid(form) {
    return Object.entries(form).some(([formEl, { valid }]) => valid === false);
  }

  submitHandler = event => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target));
    const { email, password } = formData;

    this.props.onAuth(email, password, this.state.isSignup);
  };

  switchAuthModeHandler = () =>
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));

  render() {
    const errorMessage = this.props.error ? (
      <p>{this.props.error.message}</p>
    ) : null;

    const formElements = Object.entries(
      this.state.controls
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

    const authenticationForm = (
      <React.Fragment>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {this.props.loading ? <Spinner /> : formElements}
          <Button btnType="Success" disabled={this.state.formIsInvalid}>
            SIGN {this.state.isSignup ? 'UP' : 'IN'}
          </Button>
        </form>
        <Button btnType="Danger" onPress={this.switchAuthModeHandler}>
          SWITCH TO SIGN {this.state.isSignup ? 'IN' : 'UP'}
        </Button>
      </React.Fragment>
    );

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {authenticationForm}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(actionCreators.auth(email, password, isSignUp, axios)),
  onSetAuthRedirectPath: path =>
    dispatch(actionCreators.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
