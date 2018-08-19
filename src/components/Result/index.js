import React, { Component } from 'react';
import { Alert, ListGroup, ListGroupItem } from 'react-bootstrap';
import pluralize from 'pluralize';
import { distanceInWordsStrict } from 'date-fns';
import './Result.css';

class Result extends Component {
  render() {
    const apiResponses = this.props.apiResponses ? this.props.apiResponses.map((res) => {
      return (<ListGroupItem key={res.occurrences.toString()}><pre>{JSON.stringify(res, null, 2)}</pre></ListGroupItem>);
    }).reverse() : [];

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
            { this.props.lastDatetime ? (
              <p className="result-details">Last call was {distanceInWordsStrict(this.props.lastDatetime, new Date())} ago.</p>
            ) : (
              <p className="result-details">This is the first time the server has been called.</p>
            )}
          </div>
        )}
        { apiResponses.length > 0 && (
          <div className="result-api">
            <h2 className="result-api-title">API Responses, Newest First</h2>
            <ListGroup>{apiResponses}</ListGroup>
          </div>
        )}
      </div>
    );
  }
}

export default Result;
