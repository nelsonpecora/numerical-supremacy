import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import Result from './components/Result';
import { send } from './lib/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      result: null,
      occurrences: 0,
      lastDatetime: null,
      errorMessage: null,
      apiResponses: []
    };
  }

  onChange(value) {
    send(value)
      .then((res) => this.setState({
        result: res.result,
        occurrences: res.occurrences,
        lastDatetime: res.lastDatetime,
        apiResponses: res.apiResponses,
        errorMessage: null
      }))
      .catch((e) => this.setState({ errorMessage: e.message }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Numerical Supremacy</h1>
        </header>
        <p className="App-intro">A small web app that allows the user to query the difference between:</p>
        <p className="App-intro">1. the sum of the squares of the first <code>n</code> natural numbers<br />2. the square of the sum of the same first <code>n</code> natural numbers</p>
        <p className="App-intro">To begin, please enter a number between 1 and 100 and click <b>Submit</b>.</p>
        <Form onChange={this.onChange} />
        <Result result={this.state.result} occurrences={this.state.occurrences} lastDatetime={this.state.lastDatetime} errorMessage={this.state.errorMessage} apiResponses={this.state.apiResponses} />
      </div>
    );
  }
}

export default App;
