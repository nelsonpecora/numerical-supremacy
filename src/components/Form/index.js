import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.getValidationState() === 'success') {
      // pass the number up to the app so we can do an api call and calculate the result
      this.props.onChange(this.state.value);
    }
  }

  getValidationState() {
    const value = this.state.value;

    if (value > 0 && value <= 100) {
      return 'success';
    } else if (value === '') {
      return null; // no success or error message when input is empty
    } else {
      return 'error';
    }
  }

  getButtonStyle() {
    const validationState = this.getValidationState();

    switch (validationState) {
      case 'success': return 'success';
      case null: return 'primary';
      default: return 'danger';
    }
  }

  render() {
    const isButtonDisabled = this.getValidationState() !== 'success'

    return (
      <form className="Form" onSubmit={this.handleSubmit}>
        <FormGroup controlId="numericalInput" validationState={this.getValidationState()}>
          <ControlLabel>How many natural numbers would you like to perform the calculation on?</ControlLabel>
          <FormControl
              type="number"
              value={this.state.value}
              placeholder="Enter a number between 1 and 100"
              onChange={this.handleChange}
            />
          <FormControl.Feedback />
          <Button bsStyle={this.getButtonStyle()} disabled={isButtonDisabled} onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>
      </form>
    );
  }
}

export default Form;
