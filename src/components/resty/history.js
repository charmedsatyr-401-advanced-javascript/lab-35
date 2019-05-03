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

/*
const mapStateToProps = state => ({
  records: state.records,
  schema: state.schema,
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleGet: model => dispatch(ra.get(model)),
  handleDelete: (payload, model) => dispatch(ra.destroy(payload, model)),
  handlePatch: (payload, model) => dispatch(ra.patch(payload, model)),
  handlePut: (payload, model) => dispatch(ra.put(payload, model)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records);
*/
