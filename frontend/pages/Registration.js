import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';

export default function Login() {
  let [ name, setName ] = useState('nome');
  let [ surname, setSurname ] = useState('cognome');
  let [ email, setEmail ] = useState('email');
  let [ password, setPassword ] = useState('password');

  return (
    <View>
      <Text>Name</Text>
      <TextInput label="Name" value={name}
        onChangeText={text => setName(text)}
        style={{ marginBottom: 20 }}
      />

      <Text>Surname</Text>
      <TextInput label="Surname" value={surname}
        onChangeText={text => setSurname(text)}
        style={{ marginBottom: 20 }}
      />

      <Text>Email</Text>
      <TextInput label="Email" value={email}
        onChangeText={text => setEmail(text)}
        style={{ marginBottom: 20 }}
      />

      <Text>Password</Text>
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
    </View>
  );
}
