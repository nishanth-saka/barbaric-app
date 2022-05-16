import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { store, persistor } from './src/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import AnimatedLoader from "./src/components/AnimatedLoader";
import { getPageList } from "./src/redux/actions/pageListActions";
import { HOME_SCREEN } from "./src/constants";
import NavStackView from "./src/components/NavStackView";
import { CURRENT_PAGE_NUMBER } from "./src/constants";

const Stack = createNativeStackNavigator();

export default class App extends Component {

  componentDidMount (){
    persistor.purge();
    store.dispatch(getPageList({pageNumber: CURRENT_PAGE_NUMBER}))
  }

  render() {    
    const {initReducer} = store;
    return(      
        <Provider store = { store }>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <NavStackView initialRouteName={HOME_SCREEN} />
          </NavigationContainer>
          <AnimatedLoader />
        </PersistGate>
      </Provider>            
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
