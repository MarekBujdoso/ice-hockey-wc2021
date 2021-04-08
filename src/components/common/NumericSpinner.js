import React from "react";
import "./NumericSpinner.scss";

function NumericSpinner(props) {
  const { value, onChange, min } = props;

  function onChangeHandler(change) {
    if (onChange) onChange({ value: value + change });
  }

  return (
    <div className="numeric-spinner">
      <button
        className="numeric-spinner__increment"
        onClick={() => onChangeHandler(+1)}
      >
        +
      </button>
      <div className="numeric-spinner__value">{value}</div>
      <button
        className="numeric-spinner__decrement"
        onClick={() => onChangeHandler(-1)}
        disabled={min === value}
      >
        -
      </button>
    </div>
  );
}

export default NumericSpinner;
