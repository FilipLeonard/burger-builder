import React, { useState, useEffect } from 'react';

import useHttpErrorHandler from '../../hooks/http-error-handler';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    const defaultErrorMessage = 'Something went wrong';
    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : defaultErrorMessage}
          <hr />
          {error
            ? error.response.data.error.message
              ? error.response.data.error.message
              : defaultErrorMessage
            : defaultErrorMessage}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
