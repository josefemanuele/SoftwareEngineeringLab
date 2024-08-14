import React, { useRef, useState } from 'react';

import { ScrollView } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { en, registerTranslation, registerDefaultLocale, useFormState, Form } from 'react-native-use-form';

import FullDialog from '../../components/FullDialog.js';
import InputWithError from '../../components/InputWithError.js';

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
    title: 'Email sent!',
    description: 'Your organization has been registered. Login with your credentials and start using the app!'
  },
  'exists': {
    title: 'Account exists',
    description: 'An account with the same email address already exists. Use another email address or recover the password in the login page.'
  },
}

export default function Registration({ navigation }) {
  let [ loading, setLoading ] = useState(false);
  let [ dialogMessage, setDialogMessage ] = useState(null);

  let scrollViewRef = useRef(null);

  let [{ errors, submit, formProps, hasError }, fh] = useFormState({
    email: '',
    password: '',
    orgName: '',
    phoneNumber: '',
    address: '',
    description: '',
  }, {
    scrollViewRef: scrollViewRef,
    onSubmit: values => {
      setLoading(true);

      // do registration

      setTimeout(() => {
        setLoading(false);
        setDialogMessage('success');
      }, 1000);
    }
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
      <ScrollView ref={scrollViewRef} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
        <Form {...formProps}>
          <InputWithError Component={TextInput} {...fh.email('email', {
            required: true,
            label: 'Email *',
            shouldFollowRegexes: [
              { regex: /^[a-zA-Z0-9._]+\@[a-zA-Z0-9.]+$/, errorMessage: 'Invalid email' },
            ],
          })} disabled={loading} />

          <InputWithError Component={TextInput} {...fh.password('password', {
            required: true,
            label: 'Password *',
            minLength: 8,
            maxLength: 128,
            shouldFollowRegexes: [
              { regex: /^[a-zA-Z0-9._]+$/, errorMessage: 'Password must contain only: a-z A-Z 0-9' },
            ],
          })} disabled={loading} />

          <Divider style={[ style.mb20 ]} />

          <InputWithError Component={TextInput} {...fh.text('orgName', {
            required: true,
            label: 'Organization name',
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
