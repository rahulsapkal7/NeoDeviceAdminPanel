import React from 'react';
import ReactDOM from 'react-dom';
import EditDevice from './EditDevice';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditDevice />, div);
  ReactDOM.unmountComponentAtNode(div);
});
