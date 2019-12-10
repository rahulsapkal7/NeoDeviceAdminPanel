import React from 'react';
import ReactDOM from 'react-dom';
import EditCategory from './EditCategory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditCategory />, div);
  ReactDOM.unmountComponentAtNode(div);
});
