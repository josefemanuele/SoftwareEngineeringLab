import React, { useEffect, useState } from 'react';

import { AppRegistry, View, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './pages/Login.js';
import RoleSelection from './pages/RoleSelection.js';
import OrganizerEventCreation from './pages/organizer/EventCreation.js';
import OrganizerHome from './pages/organizer/Home.js';
import OrganizerRegistration from './pages/organizer/Registration.js';
import ParticipantHome from './pages/participant/Home.js';
import ParticipantRegistration from './pages/participant/Registration.js';

import AppHeader from './components/AppHeader.js';
import AppError from './components/AppError.js';

import user from './lib/user.js';

const Stack = createNativeStackNavigator();

export default function App() {
  let colorScheme = useColorScheme();

  let navTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  let [ isLoggedIn, setLoggedIn ] = useState(true);
  user.setLoggedIn = setLoggedIn;

  let userRole = 'organizer';

  let screens;
  if (!isLoggedIn) {
    screens = (
      <Stack.Group>
        <Stack.Screen name='Login' component={Login} options={{
          title: 'Login'
        }}/>
        <Stack.Screen name='RoleSelection' component={RoleSelection} options={{
          title: 'Register'
        }}/>
        <Stack.Screen name='participant/Registration' component={ParticipantRegistration} options={{
          title: 'Register'
        }}/>
        <Stack.Screen name='organizer/Registration' component={OrganizerRegistration} options={{
          title: 'Register'
        }}/>
      </Stack.Group>
    );
  } else if (userRole === 'participant') {
    screens = (
      <Stack.Group>
        <Stack.Screen name='participant/Home' component={ParticipantHome} options={{
          title: 'Prenotalo'
        }}/>
      </Stack.Group>
    );
  } else if (userRole === 'organizer') {
    screens = (
      <Stack.Group>
        <Stack.Screen name='organizer/Home' component={OrganizerHome} options={{
          title: 'Prenotalo'
        }}/>
        <Stack.Screen name='organizer/EventCreation' component={OrganizerEventCreation} options={{
          title: 'Event creation'
        }}/>
      </Stack.Group>
    );
  } else {
    screens = (
      <Stack.Group>
        <Stack.Screen name='error' component={AppError} options={{
          title: 'Prenotalo'
        }}/>
      </Stack.Group>
    );
  }

  return (
      <PaperProvider theme={{ version: 3 }}>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator screenOptions={{
            header: AppHeader,
          }}>
            { screens }
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
}

AppRegistry.registerComponent('Prenotalo', () => App)
