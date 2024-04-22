import React from 'react';
import { AppRegistry, View } from 'react-native';
import { PaperProvider, Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import Login from './pages/Login.js';
import Registration from './pages/Registration.js';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Prenotalo" />
        <Appbar.Action icon="abacus" />
        <Appbar.Action icon="account-box" />
      </Appbar.Header>

      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Login' component={Login} />
          <Tab.Screen name='Registration' component={Registration} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('Prenotalo', () => App)
