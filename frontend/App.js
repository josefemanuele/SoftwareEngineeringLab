import React from 'react';
import { AppRegistry, View } from 'react-native';
import { PaperProvider, Appbar, TextInput, Button } from 'react-native-paper';

export default function App() {
  let [ text, setText ] = React.useState('iniziale');

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Prenotalo" />
        <Appbar.Action icon="abacus" />
        <Appbar.Action icon="account-box" />
      </Appbar.Header>
      <View>
        <TextInput label="Campo" value={text} onChangeText={text => setText(text)} />
        <TextInput label="Campo" value={text} onChangeText={text => setText(text)} />
        <TextInput label="Campo" value={text} onChangeText={text => setText(text)} />
        <TextInput label="Campo" value={text} onChangeText={text => setText(text)} />
        <TextInput label="Campo" value={text} onChangeText={text => setText(text)} />
        <Button>
          Invia
        </Button>
      </View>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('Prenotalo', () => App)
