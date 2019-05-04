import React from 'react';
import ReactJson from 'react-json-view';

const DisplayResponse = props => (
  <div id="json">
    <ReactJson name="Headers" enableClipboard={false} collapsed={true} src={props.header} />
    <ReactJson name="Response" enableClipboard={false} collapsed={false} src={props.body} />
  </div>
);

export default DisplayResponse;
