import React from 'react';

import classes from './Input.css';

const input = props => {
  let inputElement = null;

  const inputClasses = [classes.InputElement];

  props.shouldValidate &&
    props.touched &&
    props.invalid &&
    inputClasses.push(classes.Invalid);

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          name={props.label}
        />
      );
      break;
    case 'select':
      const selectOptions = props.elementConfig.options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.displayValue}
        </option>
      ));
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
          name={props.label}
        >
          {selectOptions}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          name={props.label}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
