import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import style from '../style.js';


export default function Registration() {
  let [ name, setName ] = useState('nome');
  let [ surname, setSurname ] = useState('cognome');
  let [ email, setEmail ] = useState('email');
  let [ password, setPassword ] = useState('password');

  const navigation = useNavigation();

  return (
    <View style={style.spaced}>
      <Text style={style.mb10}>Name</Text>
      <TextInput label="Name" value={name}
        onChangeText={text => setName(text)}
        style={{ marginBottom: 20 }}
      />

      <Text style={style.mb10}>Surname</Text>
      <TextInput label="Surname" value={surname}
        onChangeText={text => setSurname(text)}
        style={{ marginBottom: 20 }}
      />

      <Text style={style.mb10}>Email</Text>
      <TextInput label="Email" value={email}
        onChangeText={text => setEmail(text)}
        style={{ marginBottom: 20 }}
      />

      <Text style={style.mb10}>Password</Text>
      <TextInput label="Password" value={password}
        onChangeText={text => setPassword(text)} secureTextEntry={true}
        style={{ marginBottom: 20 }}
      />

      <Button title="Register" mode="contained" onPress={async function () {
        let userData = { name, surname, email, password };

        let response = await fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        if (response.status === 204) {
          console.log('Registrazione corretta');
        } else {
          console.log('Registrazione fallita');
        }
      }}>
        Register
      </Button>

      <Divider style={[ style.mt20, style.mb20 ]}/>

      <Button title="Login" mode="contained" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>
    </View>
  );
}
