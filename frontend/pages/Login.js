import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Text, TextInput, Button, Divider, Switch } from 'react-native-paper';

import { doLogin } from '../lib/user.js';
import style from '../style.js';

export default function Login({ navigation }) {
  let [ username, setUsername ] = useState('');
  let [ password, setPassword ] = useState('');
  let [ staySignedIn, setStaySignedIn ] = useState(false);

  return (
    <View style={style.spaced}>
      <TextInput label="Username" value={username} style={style.mb20}
        onChangeText={text => setUsername(text)}
      />

      <TextInput label="Password" value={password} style={style.mb20}
        onChangeText={text => setPassword(text)} secureTextEntry={true}
      />

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
