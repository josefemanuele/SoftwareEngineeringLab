import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Text, TextInput, Button, Divider, Switch } from 'react-native-paper';
// import { Link } from '@react-navigation/native';

import style from '../style.js';

export default function Login() {
  let [ username, setUsername ] = useState('prova');
  let [ password, setPassword ] = useState('ciao');
  let [ staySignedIn, setStaySignedIn ] = useState(false);

  return (
    <View style={style.spaced}>
      <View style={style.mb20}>
        <Text>Username</Text>
        <TextInput label="Username" value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>

      <View style={style.mb20}>
        <Text>Password</Text>
        <TextInput label="Password" value={password}
          onChangeText={text => setPassword(text)} secureTextEntry={true}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Switch value={staySignedIn} onValueChange={value => setStaySignedIn(value)} />
        <Text>Stay signed in</Text>
      </View>

      <Button title="Login" mode="text" onPress={null}>
        Forgot password?
      </Button>
      {/* <Link to={{ screen: 'ForgotPassword', params: { username: username } }}>
        Forgot password?
      </Link> */}

      <Button title="Login" mode="contained" onPress={async function () {
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

      <Divider style={[ style.mt20, style.mb20 ]}/>

      <Button title="Register" mode="contained" onPress={null}>
        Create account
      </Button>
    </View>
  );
}
