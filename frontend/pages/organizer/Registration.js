import React, { useRef, useState } from 'react';

import { ScrollView, View } from 'react-native';
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
    description: 'Your organization has been registered. Login with your credentials and start using the app!'
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
    orgName: '',
    phoneNumber: '',
    address: '',
    description: '',
  }, {
    scrollViewRef: scrollViewRef,
    onSubmit: async function (values) {
      setLoading(true);

      try {
        let userId = await backend.addUser({
          email: values.email,
          password: values.passwordA,
          name: null,
          surname: null,
          organizer: true,
        });

        await backend.addOrganization({
          name: values.orgName,
          phoneNumber: values.phoneNumber,
          address: values.address,
          description: values.description,
          category: null,
          owner_id: userId,
        });

        setDialogMessage('success');
      } catch (err) {
        console.log(err);

        switch (err.message) {
          case 'Network error':
          case 'Response error':
            setDialogMessage('net_err');
            break;
          case 'Resource exists':
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

  // style={[{
  //   alignSelf: 'center',
  // }]}
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

          <InputWithError Component={TextInput} {...fh.text('orgName', {
            required: true,
            label: 'Organization name *',
          })} disabled={loading} />

          <InputWithError Component={TextInput} {...fh.telephone('phoneNumber', {
            required: true,
            label: 'Phone number *',
            shouldFollowRegexes: [
              { regex: /^[0-9+]+$/, errorMessage: 'Invalid phone number' },
            ],
          })} disabled={loading} />

          <InputWithError Component={TextInput} {...fh.streetAddress('address', {
            required: false,
            label: 'Address',
          })} disabled={loading} />

          {/* <InputWithError Component={TextInput} {...fh.text('openingHours', {
            required: false,
            label: 'Opening hours',
          })} /> */}

          <InputWithError Component={TextInput} {...fh.text('description', {
            required: false,
            label: 'Description',
          })} multiline={true} numberOfLines={5} disabled={loading} />

          <Text variant="labelLarge" style={style.spaceTop}>All fields with an asterisk (*) are mandatory</Text>

          <Button title="Register" mode="contained" style={style.spaceTop} loading={loading} onPress={submit} disabled={loading}>
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
