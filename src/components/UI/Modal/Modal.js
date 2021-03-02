import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </Aux>
);

function areEqual(prevProps, nextProps) {
  // console.log(
  //   '[Modal.js] areEqual - props.show is the same',
  //   prevProps.show === nextProps.show
  // );
  // console.log(
  //   '[Modal.js] areEqual - props.children.type is the same',
  //   prevProps.children.type === nextProps.children.type
  // );
  return (
    prevProps.show === nextProps.show &&
    prevProps.children.type === nextProps.children.type //changes from OrderSummary to Spinner
  );
}

export default React.memo(modal, areEqual);
