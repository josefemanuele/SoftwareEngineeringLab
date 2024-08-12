import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Button, Divider, HelperText, Switch, Text, TextInput } from 'react-native-paper';

import { doLogin } from '../lib/user.js';
import style from '../style.js';

let loginErrors = {
  'network': 'Network error',
  'invalid': 'Wrong email or password',
}

export default function Login({ navigation }) {
  let [ email, setEmail ] = useState('');
  let [ password, setPassword ] = useState('');
  let [ staySignedIn, setStaySignedIn ] = useState(false);

  let [ emailError, setEmailError ] = useState(false);

  let [ loginError, setLoginError ] = useState('');
  let [ loading, setLoading ] = useState(false);

  async function onLogin() {
    if (emailError) {
      return;
    }

    setLoading(true);

    let loginOk;
    try {
      loginOk = await doLogin(email, password);

      if (!loginOk) {
        setLoginError('invalid');
      }
    } catch (err) {
      setLoginError('network');
    }

    setLoading(false);
  };

  return (
    <View style={[ style.spaced, style.container ]}>
      <TextInput label="E-mail" value={email} error={emailError}
        onChangeText={text => {
          let validEmail = text.length > 0 &&
            !!(/^[a-zA-Z0-9._]+\@[a-zA-Z0-9.]+$/.test(text));

          setLoginError('');
          setEmailError(!validEmail);
          setEmail(text);
        }}
      />

      <HelperText type="error" visible={emailError}>
        Invalid email
      </HelperText>

      <TextInput label="Password" value={password} secureTextEntry={true}
        onChangeText={text => {
          setLoginError('');
          setPassword(text);
        }}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            onLogin();
          }
        }}
      />

      <HelperText type="error" visible={loginError !== ''}>
        {loginErrors[loginError]}
      </HelperText>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch value={staySignedIn} onValueChange={value => setStaySignedIn(value)} />
        <Text style={style.ml10}>Stay signed in</Text>
      </View>

      <Button title="Forgot" mode="text" style={[ style.mt20, style.mb20 ]} onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot password?
      </Button>

      <Button title="Login" mode="contained" loading={loading} onPress={onLogin}>
        Login
      </Button>

      <Divider style={[ style.mt20, style.mb20 ]}/>

      <Button title="Register" mode="contained" onPress={() => navigation.push('RoleSelection')}>
        Create account
      </Button>
    </View>
  );
}
