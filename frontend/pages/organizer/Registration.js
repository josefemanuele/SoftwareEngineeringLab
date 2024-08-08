import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, Divider, Modal, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { doRegistration, doLogin } from '../../lib/user.js';
import style from '../../style.js';

export default function Registration({ navigation }) {
  let [ name, setName ] = useState('');
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

      <Button title="Register" mode="contained" onPress={null}>
        Register
      </Button>
    </View>
  );
}
