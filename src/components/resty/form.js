import React, { Component } from 'react';
import Methods from './methods';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
            value={this.props.url}
            onChange={this.props.handleChange}
          />

          {/* METHODS COMPONENT */}
          <Methods method={this.props.method} handleChange={this.props.handleChange} />

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
              value={this.props.requestBody}
              disabled={this.props.method.match(/get|delete/) ? true : false}
            />
          </div>

          {/* A THING */}
          <div id="headers">
            {/* eslint-disable-next-line */}
            <a href="#" onClick={this.props.handleClick}>
              Headers
            </a>

            {/* A THING */}
            <div className={'visible-' + this.props.headersVisible}>
              <h2>Basic Authorization</h2>
              <input
                onChange={this.props.handleChange}
                name="username"
                placeholder="Username"
                value={this.props.username}
              />
              <input
                onChange={this.props.handleChange}
                name="password"
                type="password"
                placeholder="Password"
                value={this.props.password}
              />
            </div>

            {/* A THING */}
            <div className={'visible-' + this.props.headersVisible}>
              <h2>Bearer Token</h2>
              <input
                onChange={this.props.handleChange}
                type="text"
                className="wide"
                name="token"
                placeholder="Token"
                value={this.props.token}
              />
            </div>
          </div>
        </section>
      </form>
    );
  }
}
export default Form;
