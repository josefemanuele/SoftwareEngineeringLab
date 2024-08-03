import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, Divider, Modal, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { doRegistration } from '../lib/user.js';
import style from '../style.js';

export default function Registration({ navigation }) {
  let [ name, setName ] = useState('');
  let [ surname, setSurname ] = useState('');
  let [ email, setEmail ] = useState('');
  let [ password, setPassword ] = useState('');

  let [ modalVisible, setModalVisible ] = useState(false);

  return (
    <View style={style.spaced}>
      <Portal>
        <Modal visible={modalVisible} onDismiss={() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }} contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
        }}>
          <Text>Ciao</Text>
        </Modal>
      </Portal>

      <TextInput label="Name" value={name}
        onChangeText={text => setName(text)}
        style={{ marginBottom: 20 }}
      />

      <TextInput label="Surname" value={surname}
        onChangeText={text => setSurname(text)}
        style={{ marginBottom: 20 }}
      />

      <TextInput label="Email" value={email}
        onChangeText={text => setEmail(text)}
        style={{ marginBottom: 20 }}
      />

      <TextInput label="Password" value={password}
        onChangeText={text => setPassword(text)} secureTextEntry={true}
        style={{ marginBottom: 20 }}
      />

      <Button title="Register" mode="contained" onPress={async function () {
        let userData = { name, surname, email, password };

        let registrationOk = await doRegistration(userData);

        if (registrationOk) {
          console.log('Registrazione corretta');
          setModalVisible(true);
        } else {
          console.log('Registrazione fallita');
        }
      }}>
        Register
      </Button>

      {/* <Divider style={[ style.mt20, style.mb20 ]}/>

      <Button title="Login" mode="contained" onPress={() => navigation.navigate("Login")}>
        Login
      </Button> */}
    </View>
  );
}
