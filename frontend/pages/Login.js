import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Text, TextInput, Button, Divider, Switch } from 'react-native-paper';

import { doLogin } from '../lib/user.js';
import style from '../style.js';

export default function Login({ navigation }) {
  let [ username, setUsername ] = useState('prova');
  let [ password, setPassword ] = useState('ciao');
  let [ staySignedIn, setStaySignedIn ] = useState(false);

  return (
    <View style={style.spaced}>
      <View style={style.mb20}>
        <Text style={style.mb10}>Username</Text>
        <TextInput label="Username" value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>

      <View style={style.mb20}>
        <Text style={style.mb10}>Password</Text>
        <TextInput label="Password" value={password}
          onChangeText={text => setPassword(text)} secureTextEntry={true}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch value={staySignedIn} onValueChange={value => setStaySignedIn(value)} />
        <Text style={style.ml10}>Stay signed in</Text>
      </View>

      <Button title="Login" mode="text" onPress={() => navigation.navigate('Forgot')}>
        Forgot password?
      </Button>

      <Button title="Login" mode="contained" onPress={async function () {
        let loginOk = await doLogin(username, password);

        if (loginOk) {
          console.log('Login corretto');
          navigation.navigate('OrganizationList');
        } else {
          console.log('Login fallito');
        }
      }}>
        Login
      </Button>

      <Divider style={[ style.mt20, style.mb20 ]}/>

      <Button title="Register" mode="contained" onPress={() => navigation.push('Registration')}>
        Create account
      </Button>
    </View>
  );
}
