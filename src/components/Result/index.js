import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import pluralize from 'pluralize';
import { distanceInWordsStrict } from 'date-fns';
import './Result.css';

class Result extends Component {
  render() {
    return (
      <div className="Result">
        { this.props.errorMessage && (
          <Alert bsStyle="danger">
            <h4>Error computing difference</h4>
            <p>{this.props.errorMessage}</p>
            <p>Please try again with different numbers</p>
          </Alert>
        )}
        { !this.props.errorMessage && this.props.result && (
          <div>
            <p className="result-text">Result:</p>
            <p className="result-value">{this.props.result}</p>
            <p className="result-details">Server has been called {pluralize('time', this.props.occurrences, true)}.<br /></p>
            { this.props.dateTime ? (
              <p className="result-details">Last call was {distanceInWordsStrict(this.props.dateTime, new Date())} ago.</p>
            ) : (
              <p className="result-details">This is the first time the server has been called.</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Result;
