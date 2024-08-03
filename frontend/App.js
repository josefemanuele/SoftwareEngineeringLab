import React from 'react';

import { AppRegistry, View, useColorScheme } from 'react-native';
import { PaperProvider, Appbar } from 'react-native-paper';

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './pages/Login.js';
import Registration from './pages/Registration.js';
import OrganizationList from './pages/participant/OrganizationList.js';

const Stack = createNativeStackNavigator();

export default function App() {
  let colorScheme = useColorScheme();

  let navTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={{ version: 3 }}>
      {/* <Appbar.Header>
        <Appbar.Content title="Prenotalo" />
        <Appbar.Action icon="abacus" />
        <Appbar.Action icon="account-box" />
      </Appbar.Header> */}

      <NavigationContainer theme={navTheme}>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Registration' component={Registration} />
          <Stack.Screen name='OrganizationList' component={OrganizationList} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('Prenotalo', () => App)
