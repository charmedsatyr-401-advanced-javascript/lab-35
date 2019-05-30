import React from 'react';

import MethodHandler from './method-handler';

const Methods = props => {
  const arr = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  const content = arr.map((m, i) => (
    <MethodHandler key={i} handleChange={props.handleChange} method={props.method} m={m} />
  ));

  return <div id="methods">{content}</div>;
};

export default Methods;
