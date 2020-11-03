/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,  
  StatusBar,
} from 'react-native';
import Welcome from "./app/screen/Welcome"

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>       
         <Welcome/> 
      </SafeAreaView>
    </>
  );
};



export default App;
