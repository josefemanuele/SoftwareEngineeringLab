import React, { useRef, useState } from 'react';

import { ScrollView } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { en, registerTranslation, registerDefaultLocale, useFormState, Form } from 'react-native-use-form';

import FullDialog from '../../components/FullDialog.js';
import InputWithError from '../../components/InputWithError.js';
import PasswordInput from '../../components/PasswordInput.js';

import backend from '../../lib/backend.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

registerTranslation('en', en);
registerDefaultLocale('en');

const DIALOG_MESSAGES = {
  null: {
    title: '',
    description: '',
  },
  'success': {
    title: 'Account created',
    description: 'Your user account has been registered. Login with your credentials and start using the app!'
  },
  'exists': {
    title: 'Account exists',
    description: 'An account with the same email address already exists. Use another email address or recover the password in the login page.'
  },
  'net_err': {
    title: 'Network error',
    description: 'An error occurred while making the request.'
  },
}

export default function Registration({ navigation }) {
  let [ loading, setLoading ] = useState(false);
  let [ dialogMessage, setDialogMessage ] = useState(null);

  let scrollViewRef = useRef(null);

  let [{ errors, submit, formProps, hasError, values }, fh] = useFormState({
    email: '',
    passwordA: '',
    passwordB: '',
    name: '',
    surname: '',
  }, {
    scrollViewRef: scrollViewRef,
    onSubmit: async function (values) {
      setLoading(true);

      try {
        await backend.addUser({
          email: values.email,
          password: values.passwordA,
          name: values.name,
          surname: values.surname,
        });

        setDialogMessage('success');
      } catch (err) {
      	console.log(err);

      	switch (err.message) {
      		case 'Network error':
      		case 'Response error':
            setDialogMessage('net_err');
      			break;
      		case 'Account exists':
            setDialogMessage('exists');
      			break;
      	}
      }

      setLoading(false);
    },
  });

  function onDialogDismiss() {
    setDialogMessage(null);

    if (dialogMessage === 'success') {
      navigation.navigate('Login');
    }
  }

  return (
    <>
      <ScrollView ref={scrollViewRef} contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
        <Form {...formProps}>
          <InputWithError Component={TextInput} {...fh.email('email', {
            required: true,
            label: 'Email *',
            shouldFollowRegexes: [
              { regex: /^[a-zA-Z0-9._]+\@[a-zA-Z0-9.]+$/, errorMessage: 'Invalid email' },
            ],
          })} disabled={loading} />

          <InputWithError Component={PasswordInput} {...fh.password('passwordA', {
            required: true,
            label: 'Password *',
            minLength: 8,
            maxLength: 128,
            shouldFollowRegexes: [
              { regex: /^[a-zA-Z0-9._]+$/, errorMessage: 'Password must contain only: a-z A-Z 0-9' },
            ],
          })} disabled={loading} />

          <InputWithError Component={PasswordInput} {...fh.password('passwordB', {
            required: true,
            label: 'Confirm password *',
            validate: value => {
              if (value !== values.passwordA) {
                return "Passwords don't match";
              }

              return true;
            }
          })} disabled={loading} />

          <Divider style={[ style.spaceBottom ]} />

          <InputWithError Component={TextInput} {...fh.text('name', {
            required: true,
            label: 'Name *',
          })} disabled={loading} />

          <InputWithError Component={TextInput} {...fh.text('surname', {
            required: true,
            label: 'Surname *',
          })} disabled={loading} />

          <Text variant="labelLarge" style={style.mt20}>All fields with an asterisk (*) are mandatory</Text>

          <Button title="Register" mode="contained" style={style.mt20} loading={loading} onPress={submit} disabled={loading}>
            Register
          </Button>
        </Form>
      </ScrollView>

      <FullDialog
        title={DIALOG_MESSAGES[dialogMessage].title}
        content={DIALOG_MESSAGES[dialogMessage].description}
        actions={[{
          name: 'OK',
          callback: onDialogDismiss,
        }]}
        visible={dialogMessage != null}
        onDismiss={onDialogDismiss}
      />
    </>
  );
}
