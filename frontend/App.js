import React, { useEffect, useState } from 'react';

import { AppRegistry, View, useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './pages/Login.js';
import RoleSelection from './pages/RoleSelection.js';
import OrganizerEvent from './pages/organizer/Event.js';
import OrganizerEventCreation from './pages/organizer/EventCreation.js';
import OrganizerEventList from './pages/organizer/EventList.js';
import OrganizerRegistration from './pages/organizer/Registration.js';
import ParticipantEvent from './pages/participant/Event.js';
import ParticipantHome from './pages/participant/Home.js';
import ParticipantOrganization from './pages/participant/Organization.js';
import ParticipantRegistration from './pages/participant/Registration.js';
import Profile from './pages/participant/Profile.js'; 

import AppHeader from './components/AppHeader.js';
import AppError from './components/AppError.js';

import store from './lib/state.js';
import user from './lib/user.js';

const Stack = createNativeStackNavigator();

export default function App() {
  let colorScheme = useColorScheme();
  // let colorScheme = 'light';

  let paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  let navTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  let [ isLoggedIn, setLoggedIn ] = useState(true);
  user.setLoggedIn = setLoggedIn;

  let userRole = 'participant';

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
        <Stack.Screen name='participant/Organization' component={ParticipantOrganization} options={{
          title: 'Organization'
        }}/>
        <Stack.Screen name='participant/Event' component={ParticipantEvent} options={{
          title: 'Event'
        }}/>
        <Stack.Screen name='participant/Profile' component={Profile} options={{
          title: 'Profile'
        }}/>
      </Stack.Group>
    );
  } else if (userRole === 'organizer') {
    screens = (
      <Stack.Group>
        <Stack.Screen name='participant/Profile' component={Profile} options={{
          title: 'Profile'
        }}/>
        <Stack.Screen name='organizer/EventList' component={OrganizerEventList} options={{
          title: 'Prenotalo'
        }}/>
        <Stack.Screen name='organizer/EventCreation' component={OrganizerEventCreation} options={{
          title: 'Event creation'
        }}/>
        <Stack.Screen name='organizer/Event' component={OrganizerEvent} options={{
          title: 'Event'
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
    // <ReduxProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator screenOptions={{
            header: (args) => (<AppHeader isLoggedIn={isLoggedIn} {...args} />),
          }}>
            { screens }
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    // </ReduxProvider>
  );
}

AppRegistry.registerComponent('Prenotalo', () => App)
