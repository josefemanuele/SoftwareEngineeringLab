import React, { useEffect, useState } from 'react';

import { AppRegistry, View, useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import StateContext from './components/StateContext.js';
import MainNavigator from './components/navigators/Main.js';

import state, { loadState, DEFAULT_STATE } from './lib/state.js';
import { save as storageSave } from './lib/storage.js';
import user from './lib/user.js';

export default function App() {
  let [ store, setStore ] = useState(DEFAULT_STATE);

  state.store = store;
  state.setStore = (fn) => {
    (async () => {
      setStore(fn);
      let nextState = fn(state.store);
      await storageSave('state', JSON.stringify(nextState));
    })();
  };

  useEffect(() => {
    loadState();
  }, []);

  let systemTheme = useColorScheme();
  let theme = store.theme === 'system' ? systemTheme : store.theme;

  let paperTheme = theme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  let navTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <StateContext.Provider value={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navTheme}>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </StateContext.Provider>
  );
}

AppRegistry.registerComponent('Prenotalo', () => App)
