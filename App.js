import React, { Component } from 'react';
import Navigator from './src/Public/Navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/Public/Redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
