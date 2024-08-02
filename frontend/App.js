import React from 'react';
import { AppRegistry, Text } from 'react-native';
import { PaperProvider, Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './pages/Login.js';
import Registration from './pages/Registration.js';
import OrganizationList from './pages/OrganizationList.js';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let icon;
          if (route.name === 'OrganizationList') {
            icon = '🏢';
          } else if (route.name === 'Login') {
            icon = '🔑';
          } else if (route.name === 'Registration') {
            icon = '📝';
          }
          return <Text>{icon}</Text>;
        }
      })}
    >
      <Tab.Screen
        name="OrganizationList"
        component={OrganizationList}
        options={{
          tabBarLabel: 'Organization List',
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: 'Login',
        }}
      />
      <Tab.Screen
        name="Registration"
        component={Registration}
        options={{
          tabBarLabel: 'Registration',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Prenotalo" />
        <Appbar.Action icon="abacus" />
        <Appbar.Action icon="account-box" />
      </Appbar.Header>

      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('Prenotalo', () => App)
