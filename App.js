import React from 'react';
import {View} from 'react-native';
import Graph from './components/Graph';
import SerialPort from './components/SerialPort';

const App = () => {
  return (
    <View>
      <SerialPort />
    </View>
  );
};

export default App;
