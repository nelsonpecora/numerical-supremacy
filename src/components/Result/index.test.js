import React from 'react';
import ReactDOM from 'react-dom';
import Result from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Result />, div);
  ReactDOM.unmountComponentAtNode(div);
});
