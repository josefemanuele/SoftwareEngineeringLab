import React from 'react';
import { View } from 'react-native';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';

export default function Login() {
  let [ username, setUsername ] = React.useState('');
  let [ password, setPassword ] = React.useState('');

  return (
    <View>
      <Text>Username</Text>
      <TextInput label="Username" value={username}
        onChangeText={text => setUsername(text)}
        style={{ marginBottom: 20 }}
      />

      <Text>Password</Text>
      <TextInput label="Password" value={password}
        onChangeText={text => setPassword(text)} secureTextEntry={true}
        style={{ marginBottom: 20 }}
      />

      <Button title="Invia" mode="contained" onPress={async function () {
        let loginData = {
          username: username,
          password: password
        };

        let response = await fetch('http://localhost:5000/token', {
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
