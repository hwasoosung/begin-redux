import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store'

const Root = () => {
  return (
    /* Provider
     Makes the Redux store available to the connect() calls in the component hierarchy below.
    */
    <Provider store={store}>
      <App /> 
    </Provider>
  );
};

export default Root;