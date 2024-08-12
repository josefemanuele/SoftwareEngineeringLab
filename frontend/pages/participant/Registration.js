import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, Divider, Modal, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { doRegistration, doLogin } from '../../lib/user.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function Registration({ navigation }) {
  let [ email, setEmail ] = useState('');
  let [ password, setPassword ] = useState('');
  let [ name, setName ] = useState('');
  let [ surname, setSurname ] = useState('');

  let [ modalVisible, setModalVisible ] = useState(false);

  return (
    <View style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
      <TextInput label="E-mail" value={email}
        onChangeText={text => setEmail(text)}
        style={{ marginBottom: 20 }}
        keyboardType='email-address'
      />

      <TextInput label="Password" value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        style={{ marginBottom: 20 }}
      />

      <TextInput label="Name" value={name}
        onChangeText={text => setName(text)}
        style={{ marginBottom: 20 }}
      />

      <TextInput label="Surname" value={surname}
        onChangeText={text => setSurname(text)}
        style={{ marginBottom: 20 }}
      />

      <Button title="Register" mode="contained" onPress={async function () {
        let userData = { name, surname, email, password };

        let registrationOk = await doRegistration(userData);
        if (!registrationOk) {
          console.log('Registrazione fallita');
          setModalVisible(true);

          return;
        }

        console.log('Registrazione corretta');

        let loginOk = await doLogin(email, password);
        if (!loginOk) {
          console.log('Login fallito');
          setModalVisible(true);

          return;
        }
      }}>
        Register
      </Button>
    </View>
  );
}
