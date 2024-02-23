import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import store from './store';
import {Provider} from 'react-redux';
import Home from './src/Home';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
