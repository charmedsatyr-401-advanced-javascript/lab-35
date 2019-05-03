import './resty.css';

import React from 'react';
import superagent from 'superagent';
import ReactJson from 'react-json-view';
import md5 from 'md5';

import Form from './form';
import History from './history';

class RESTy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      method: 'get',
      requestBody: '',
      username: '',
      password: '',
      token: '',
      header: {},
      body: {},
      history: {},
      headersVisible: false,
    };
  }

  componentDidMount() {
    try {
      let history = JSON.parse(localStorage.getItem('history'));
      this.setState({ history });
    } catch (e) {
      console.error(e);
    }
  }

  saveHistory = () => {
    localStorage.setItem('history', JSON.stringify(this.state.history));
  };

  updateHistory = () => {
    let url = new URL(this.state.url);

    let lastRun = {
      host: url.hostname,
      path: url.pathname,
      url: this.state.url,
      method: this.state.method,
      requestBody: this.state.requestBody,
      username: this.state.username,
      password: this.state.password,
      token: this.state.token,
      body: {},
      header: {},
    };

    let key = md5(JSON.stringify(lastRun));
    let entry = { [key]: lastRun };
    let history = { ...this.state.history, ...entry };
    this.setState({ history });
    this.saveHistory();
  };

  resetFormFromHistory = event => {
    event.preventDefault();
    let newState = this.state.history[event.currentTarget.id];
    this.setState({ ...newState });
  };

  handleChange = event => {
    let prop = event.target.name;
    let value = event.target.value;
    this.setState({ [prop]: value });

    // If basic/bearer, clear the other
    if (prop === 'token') {
      let username = '';
      let password = '';
      this.setState({ username, password });
    }

    if (prop.match(/username|password/)) {
      let token = '';
      this.setState({ token });
    }
  };

  toggleHeaders = () => {
    let headersVisible = !this.state.headersVisible;
    this.setState({ headersVisible });
  };

  callAPI = event => {
    event.preventDefault();

    let contentType = { 'Content-Type': 'application/json' };
    let bearer = this.state.token ? { Authorization: `Bearer ${this.state.token}` } : {};
    let basic =
      this.state.username && this.state.password
        ? {
            Authorization: 'Basic ' + btoa(`${this.state.username}:${this.state.password}`),
          }
        : {};

    superagent(this.state.method, this.state.url)
      .set('Content-Type', 'application/json')
      .set(Object.assign(contentType, bearer, basic))
      .send(this.state.requestBody)
      .then(response => {
        let header = response.header;
        let body = response.body;
        this.setState({ header, body });
        this.updateHistory();
      })
      .catch(e => {
        let body = { error: e.message };
        let header = {};
        this.setState({ header, body });
      });
  };

  render() {
    return (
      <main>
        {/* HISTORY */}
        <History handleClick={this.resetFormFromHistory} history={this.state.history} />

        <section className="deck">
          <Form
            handleChange={this.handleChange}
            handleClick={this.toggleHeaders}
            handleSubmit={this.callAPI}
            headersVisible={this.state.headersVisible}
            method={this.state.method}
            password={this.state.password}
            requestBody={this.state.requestBody}
            token={this.state.token}
            url={this.state.url}
            username={this.state.username}
          />

          {/* DISPLAY RESPONSE */}
          <div id="json">
            <ReactJson
              name="Headers"
              enableClipboard={false}
              collapsed={true}
              src={this.state.header}
            />
            <ReactJson
              name="Response"
              enableClipboard={false}
              collapsed={false}
              src={this.state.body}
            />
          </div>
        </section>
      </main>
    );
  }
}

export default RESTy;
