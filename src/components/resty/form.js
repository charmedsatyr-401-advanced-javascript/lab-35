import React from 'react';
import Methods from './methods';

const Form = props => (
  <form onSubmit={props.handleSubmit}>
    <section>
      {/* THING */}
      <input
        type="text"
        className="wide"
        name="url"
        placeholder="URL"
        value={props.url}
        onChange={props.handleChange}
      />

      {/* METHODS COMPONENT */}
      <Methods method={props.method} handleChange={props.handleChange} />

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
          onChange={props.handleChange}
          value={props.requestBody}
          disabled={props.method.match(/get|delete/) ? true : false}
        />
      </div>

      {/* A THING */}
      <div id="headers">
        {/* eslint-disable-next-line */}
        <a href="#" onClick={props.handleClick}>
          Headers
        </a>

        {/* A THING */}
        <div className={'visible-' + props.headersVisible}>
          <h2>Basic Authorization</h2>
          <input
            onChange={props.handleChange}
            name="username"
            placeholder="Username"
            value={props.username}
          />
          <input
            onChange={props.handleChange}
            name="password"
            type="password"
            placeholder="Password"
            value={props.password}
          />
        </div>

        {/* A THING */}
        <div className={'visible-' + props.headersVisible}>
          <h2>Bearer Token</h2>
          <input
            onChange={props.handleChange}
            type="text"
            className="wide"
            name="token"
            placeholder="Token"
            value={props.token}
          />
        </div>
      </div>
    </section>
  </form>
);

export default Form;
