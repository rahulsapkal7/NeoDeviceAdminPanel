import React from 'react';
import ReactDOM from 'react-dom';
import DeviceList from './DeviceList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeviceList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
