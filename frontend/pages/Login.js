import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Button, Divider, HelperText, Switch, Text, TextInput } from 'react-native-paper';

import { doLogin } from '../lib/user.js';
import style from '../style.js';

export default function Login({ navigation }) {
  let [ email, setEmail ] = useState('');
  let [ password, setPassword ] = useState('');
  let [ staySignedIn, setStaySignedIn ] = useState(false);

  let [ emailError, setEmailError ] = useState(false);
  let [ loginError, setLoginError ] = useState(false);

  async function onLogin() {
    if (emailError) {
      return;
    }

    let loginOk = await doLogin(email, password);

    if (!loginOk) {
      setLoginError(true);
    }
  };

  return (
    <View style={style.spaced}>
      <TextInput label="E-mail" value={email} error={emailError}
        onChangeText={text => {
          let validEmail = text.length > 0 &&
            !!(/^[a-zA-Z0-9._]+\@[a-zA-Z0-9.]+$/.test(text));
          
          setEmailError(!validEmail);
          setEmail(text);
        }}
      />

      <HelperText type="error" visible={emailError}>
        Invalid email
      </HelperText>

      <TextInput label="Password" value={password} secureTextEntry={true}
        onChangeText={text => {
          setLoginError(false);
          setPassword(text);
        }}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            onLogin();
          }
        }}
      />

      <HelperText type="error" visible={loginError}>
        Wrong email or password
      </HelperText>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch value={staySignedIn} onValueChange={value => setStaySignedIn(value)} />
        <Text style={style.ml10}>Stay signed in</Text>
      </View>

      <Button title="Forgot" mode="text" style={[ style.mt20, style.mb20 ]} onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot password?
      </Button>

      <Button title="Login" mode="contained" onPress={onLogin}>
        Login
      </Button>

      <Divider style={[ style.mt20, style.mb20 ]}/>

      <Button title="Register" mode="contained" onPress={() => navigation.push('RoleSelection')}>
        Create account
      </Button>
    </View>
  );
}
