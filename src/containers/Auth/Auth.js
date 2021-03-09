import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actionCreators from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = props => {
  const [controls, setControls] = useState({
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
  });
  const [formIsInvalid, setFormIsInvalid] = useState(true);
  const [isSignup, setIsSignup] = useState(true);

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath('/');
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = event => {
    const { name, value } = event.target;
    const rules = {
      ...controls[name].validation,
    };

    const valid = checkValidity(value, rules);

    const updatedFormElement = updateObject(controls[name], {
      value,
      valid,
      touched: true,
    });
    const updatedForm = updateObject(controls, {
      [name]: updatedFormElement,
    });

    const formIsInvalid = isFormInvalid(updatedForm);

    setControls(updatedForm);
    setFormIsInvalid(formIsInvalid);
  };

  const isFormInvalid = form => {
    return Object.entries(form).some(([formEl, { valid }]) => valid === false);
  };

  const submitHandler = event => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target));
    const { email, password } = formData;

    props.onAuth(email, password, isSignup);
  };

  const switchAuthModeHandler = () => setIsSignup(prevState => !prevState);

  const errorMessage = props.error ? <p>{props.error.message}</p> : null;

  const formElements = Object.entries(controls).map(([key, config]) => (
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
      changed={inputChangedHandler}
    />
  ));

  const authenticationForm = (
    <React.Fragment>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {props.loading ? <Spinner /> : formElements}
        <Button btnType="Success" disabled={formIsInvalid}>
          SIGN {isSignup ? 'UP' : 'IN'}
        </Button>
      </form>
      <Button btnType="Danger" onPress={switchAuthModeHandler}>
        SWITCH TO SIGN {isSignup ? 'IN' : 'UP'}
      </Button>
    </React.Fragment>
  );

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {authenticationForm}
    </div>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(auth);
