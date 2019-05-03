import React from 'react';

const History = props => (
  <aside>
    <h2>History</h2>
    <ul id="history">
      {props.history &&
        Object.keys(props.history).map(key => (
          <li key={key} id={key} onClick={props.resetFormFromHistory}>
            <span>
              <strong>{props.history[key].method}</strong>
            </span>
            <span>{props.history[key].host}</span>
            <span>{props.history[key].path}</span>
          </li>
        ))}
    </ul>
  </aside>
);

export default History;
