import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Navigation from './src/navigation/Navigation';

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
