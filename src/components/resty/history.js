import React, { Component } from 'react';
import * as ha from '../../actions/history-actions';
import { connect } from 'react-redux';

class History extends Component {
  componentDidMount() {
    try {
      const history = JSON.parse(localStorage.getItem('history'));
      this.props.setHistory(history);
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <aside>
        <h2>History</h2>
        <ul id="history">
          {this.props.history &&
            Object.keys(this.props.history).map(key => (
              <li key={key} id={key} onClick={this.props.handleClick}>
                <span>
                  <strong>{this.props.history[key].method}</strong>
                </span>
                <span>{this.props.history[key].host}</span>
                <span>{this.props.history[key].path}</span>
              </li>
            ))}
        </ul>
      </aside>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history,
});

const mapDispatchToProps = (dispatch, getState) => ({
  setHistory: payload => dispatch(ha.setHistory(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
