import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Appbar, Button, Divider, HelperText, Switch, Text, TextInput, useTheme } from 'react-native-paper';

import FullDialog from '../components/FullDialog.js';
import PasswordInput from '../components/PasswordInput.js';

import { doLogin } from '../lib/user.js';

import { ids as bsIds, styles as bsStyles } from '../style/bootstrap.js';
import style from '../style/custom.js';

let loginErrors = {
  'network': 'Network error',
  'invalid': 'Wrong email or password',
}

export default function Login({ navigation }) {
  let theme = useTheme();

  let [ email, setEmail ] = useState('');
  let [ password, setPassword ] = useState('');
  let [ staySignedIn, setStaySignedIn ] = useState(false);

  let [ emailError, setEmailError ] = useState(false);
  let [ loginError, setLoginError ] = useState('');

  let [ loadingLogin, setLoadingLogin ] = useState(false);
  let [ loadingForgot, setLoadingForgot ] = useState(false);
  let [ dialogVisible, setDialogVisible ] = useState(false);

  function validateEmail() {
    let validEmail = email.length > 0 &&
      !!(/^[a-zA-Z0-9._]+\@[a-zA-Z0-9.]+$/.test(email));

    setEmailError(!validEmail);

    return validEmail;
  }

  async function onLogin() {
    if (!validateEmail()) {
      return;
    }

    setLoadingLogin(true);

    let loginOk;
    try {
      loginOk = await doLogin(email, password);

      if (!loginOk) {
        setLoginError('invalid');
      }
    } catch (err) {
      setLoginError('network');
    }

    setLoadingLogin(false);
  };

  async function onForgot() {
    if (!validateEmail()) {
      return;
    }

    setLoadingForgot(true);

    setTimeout(() => {
      setLoadingForgot(false);
      setDialogVisible(true);
    }, 1000);
  };

  return (
    <>
    <ScrollView contentContainerStyle={style.box} style={bsStyles.container} dataSet={{ media: bsIds.container }}>
      <TextInput label="E-mail" value={email} error={emailError}
        onChangeText={text => {
          setEmail(text);
          validateEmail();
          setLoginError('');
        }}
      />

      <HelperText type="error" visible={emailError}>
        Invalid email
      </HelperText>

      <PasswordInput label="Password" value={password}
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

      <HelperText type="error" visible={loginError != ''}>
        {loginErrors[loginError]}
      </HelperText>

      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch value={staySignedIn} onValueChange={value => setStaySignedIn(value)} />
        <Text style={style.ml10}>Stay signed in</Text>
      </View> */}

      <Button title="Forgot" mode="text" style={style.spaceBottom} loading={loadingForgot} onPress={onForgot}>
        Forgot password?
      </Button>

      <Button title="Login" mode="contained" loading={loadingLogin} onPress={onLogin}>
        Login
      </Button>

      <Divider style={[ style.spaceTop, style.spaceBottom ]}/>

      <Button title="Register" mode="contained" onPress={() => navigation.push('RoleSelection')} buttonColor={theme.colors.secondary}>
        Create account
      </Button>

    </ScrollView>

    <FullDialog
      title="Email sent!"
      content={`An email has been sent to ${email} with a link to reset your password`}
      actions={[{
        name: 'OK',
        callback: () => setDialogVisible(false)
      }]}
      visible={dialogVisible}
      onDismiss={() => setDialogVisible(false)}
    />
    </>
  );
}
