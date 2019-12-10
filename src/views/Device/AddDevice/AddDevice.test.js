import React from 'react';
import ReactDOM from 'react-dom';
import AddDevice from './AddDevice';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddDevice />, div);
  ReactDOM.unmountComponentAtNode(div);
});
