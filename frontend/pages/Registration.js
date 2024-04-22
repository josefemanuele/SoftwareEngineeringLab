import React from 'react';
import { View } from 'react-native';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';

export default function Login() {
  let [ name, setName ] = React.useState('');
  let [ surname, setSurname ] = React.useState('');
  let [ email, setEmail ] = React.useState('');
  let [ password, setPassword ] = React.useState('');

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

      <Button title="Invia" mode="contained" onPress={async function () {
        let loginData = { name, surname, email, password };

        let response = await fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {
            /* 'Authorization': 'Bearer <TOKEN>', */
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });

        if (response.status === 200) {
          console.log('Login corretto');
        } else {
          console.log('Login fallito');
        }
      }}>
        Login
      </Button>
    </View>
  );
}
