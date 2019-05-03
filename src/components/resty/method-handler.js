import React from 'react';

const MethodHandler = props => (
  <label>
    <input
      type="radio"
      name="method"
      checked={props.method === props.m ? true : false}
      value={props.m.toLowerCase()}
      onChange={props.handleChange}
    />
    <span>{props.m}</span>
  </label>
);

export default MethodHandler;
