import React, { Component } from 'react';
import Methods from './methods';
import { connect } from 'react-redux';

import * as ha from '../../actions/history-actions';
import * as fa from '../../actions/form-actions';

class Form extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <section>
          {/* THING */}
          <input
            type="text"
            className="wide"
            name="url"
            placeholder="URL"
            value={this.props.formData.url}
            onChange={this.props.handleChange}
          />

          {/* METHODS COMPONENT */}
          <Methods method={this.props.formData.method} handleChange={this.props.handleChange} />

          {/* A BUTTON */}
          <label>
            <button type="submit">Go!</button>
          </label>
        </section>

        {/* A THING */}
        <section className="deck col-2">
          {/* A THING */}
          <div id="body">
            <textarea
              placeholder="Raw JSON Body"
              name="requestBody"
              onChange={this.props.handleChange}
              value={this.props.formData.requestBody}
              disabled={this.props.formData.method.match(/get|delete/) ? true : false}
            />
          </div>

          {/* A THING */}
          <div id="headers">
            {/* eslint-disable-next-line */}
            <a href="#" onClick={this.props.handleClick}>
              Headers
            </a>

            {/* A THING */}
            <div className={'visible-' + this.props.formData.headersVisible}>
              <h2>Basic Authorization</h2>
              <input
                onChange={this.props.handleChange}
                name="username"
                placeholder="Username"
                value={this.props.formData.username}
              />
              <input
                onChange={this.props.handleChange}
                name="password"
                type="password"
                placeholder="Password"
                value={this.props.formData.password}
              />
            </div>

            {/* A THING */}
            <div className={'visible-' + this.props.formData.headersVisible}>
              <h2>Bearer Token</h2>
              <input
                onChange={this.props.handleChange}
                type="text"
                className="wide"
                name="token"
                placeholder="Token"
                value={this.props.formData.token}
              />
            </div>
          </div>
        </section>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history,
  formData: state.formData,
});

const mapDispatchToProps = (dispatch, getState) => ({
  updateFormData: payload => dispatch(fa.updateFormData(payload)),
  setHistory: payload => dispatch(ha.setHistory(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
