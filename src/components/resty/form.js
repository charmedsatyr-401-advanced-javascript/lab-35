import React, { Component } from 'react';
import Methods from './methods';
import { connect } from 'react-redux';

class Form extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <section>
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

          <label>
            <button type="submit">Go!</button>
          </label>
        </section>

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
  formData: state.formData,
});

export default connect(mapStateToProps)(Form);
