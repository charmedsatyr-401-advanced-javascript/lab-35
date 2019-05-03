import React from 'react';

const History = props => (
  <aside>
    <h2>History</h2>
    <ul id="history">
      {props.state.history &&
        Object.keys(props.state.history).map(key => (
          <li key={key} id={key} onClick={props.resetFormFromHistory}>
            <span>
              <strong>{props.state.history[key].method}</strong>
            </span>
            <span>{props.state.history[key].host}</span>
            <span>{props.state.history[key].path}</span>
          </li>
        ))}
    </ul>
  </aside>
);

export default History;
