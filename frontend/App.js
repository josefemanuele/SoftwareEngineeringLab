import React, { useState } from 'react';

import { AppRegistry, View, useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import MainNavigator from './components/navigators/Main.js';

import store from './lib/state.js';
import user from './lib/user.js';

export default function App() {
  let colorScheme = useColorScheme();
  // let colorScheme = 'light';

  let paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  let navTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  let [ isLoggedIn, setLoggedIn ] = useState(true);
  let [ roleBool, setRoleBool ] = useState(false);

  user.setLoggedIn = setLoggedIn;
  user.switchRole = () => {
    setRoleBool(!roleBool);
  };

  let userRole = roleBool ? 'organizer' : 'participant';

  return (
    // <ReduxProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navTheme}>
          <MainNavigator isLoggedIn={isLoggedIn} userRole={userRole} />
        </NavigationContainer>
      </PaperProvider>
    // </ReduxProvider>
  );
}

AppRegistry.registerComponent('Prenotalo', () => App)
