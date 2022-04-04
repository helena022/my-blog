/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {ReactNode} from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

const App: () => ReactNode = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Text>My Blog App</Text>
    </SafeAreaView>
  );
};

export default App;
