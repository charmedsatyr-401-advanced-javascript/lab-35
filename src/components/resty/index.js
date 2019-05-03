import './resty.css';

import React from 'react';
import superagent from 'superagent';
import ReactJson from 'react-json-view';

import { connect } from 'react-redux';

import * as ha from '../../actions/history-actions';
import * as fa from '../../actions/form-actions';

import md5 from 'md5';

import Form from './form';
import History from './history';

class RESTy extends React.Component {
  saveHistory = () => {
    localStorage.setItem('history', JSON.stringify(this.props.history));
  };

  updateHistory = () => {
    const url = new URL(this.props.formData.url);
    const lastRun = {
      host: url.hostname,
      path: url.pathname,
      url: this.props.formData.url,
      method: this.props.formData.method,
      requestBody: this.props.formData.requestBody,
      username: this.props.formData.username,
      password: this.props.formData.password,
      token: this.props.formData.token,
      body: {},
      header: {},
    };

    const key = md5(JSON.stringify(lastRun));
    const entry = { [key]: lastRun };
    const history = { ...this.props.history, ...entry };
    this.props.setHistory({ history });
    this.saveHistory();
  };

  resetFormFromHistory = event => {
    event.preventDefault();
    const newState = this.props.history[event.currentTarget.id];
    this.props.updateFormData({ ...newState });
  };

  handleChange = event => {
    let prop = event.target.name;
    let value = event.target.value;
    this.props.updateFormData({ [prop]: value });

    // If basic/bearer, clear the other
    if (prop === 'token') {
      let username = '';
      let password = '';
      this.props.updateFormData({ username, password });
    }

    if (prop.match(/username|password/)) {
      let token = '';

      this.props.updateFormData({ token });
    }
  };

  toggleHeaders = () => {
    let headersVisible = !this.props.formData.headersVisible;
    this.props.updateFormData({ headersVisible });
  };

  callAPI = event => {
    event.preventDefault();
    console.log('CALLING API!');

    let contentType = { 'Content-Type': 'application/json' };
    let bearer = this.props.formData.token
      ? { Authorization: `Bearer ${this.props.formData.token}` }
      : {};
    let basic =
      this.props.formData.username && this.props.formData.password
        ? {
            Authorization:
              'Basic ' + btoa(`${this.props.formData.username}:${this.props.formData.password}`),
          }
        : {};

    console.log('METHOD OF THECALL:', this.props.formData.method);
    console.log('URL OF THECALL:', this.props.formData.url);
    superagent(this.props.formData.method, this.props.formData.url)
      .set('Content-Type', 'application/json')
      .set(Object.assign(contentType, bearer, basic))
      .send(this.props.formData.requestBody)
      .then(response => {
        let header = response.header;
        let body = response.body;
        console.log('GOT A RESPONSE!');

        this.props.updateFormData({ header, body });
        this.updateHistory();
      })
      .catch(e => {
        let body = { error: e.message };
        let header = {};
        this.props.updateFormData({ header, body });
      });
  };

  render() {
    return (
      <main>
        {/* HISTORY */}
        <History handleClick={this.resetFormFromHistory} />

        <section className="deck">
          <Form
            handleChange={this.handleChange}
            handleClick={this.toggleHeaders}
            handleSubmit={this.callAPI}
            headersVisible={this.props.formData.headersVisible}
            method={this.props.formData.method}
            password={this.props.formData.password}
            requestBody={this.props.formData.requestBody}
            token={this.props.formData.token}
            url={this.props.formData.url}
            username={this.props.formData.username}
          />

          {/* DISPLAY RESPONSE */}
          <div id="json">
            <ReactJson
              name="Headers"
              enableClipboard={false}
              collapsed={true}
              src={this.props.formData.header}
            />
            <ReactJson
              name="Response"
              enableClipboard={false}
              collapsed={false}
              src={this.props.formData.body}
            />
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history,
  formData: state.formData,
});

const mapDispatchToProps = (dispatch, getState) => ({
  setHistory: payload => dispatch(ha.setHistory(payload)),
  updateFormData: payload => dispatch(fa.updateFormData(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RESTy);
