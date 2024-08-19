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

let EVENT_CATEGORIES = [
	{ label: 'Unspecified', value: 'default' },
	{ label: 'Categoria 1', value: 1 },
	{ label: 'Categoria 2', value: 2 },
	{ label: 'Categoria 3', value: 3 },
];

export default function EventCreation({ navigation }) {
  let [ loading, setLoading ] = useState(false);
  let [ dialogMessage, setDialogMessage ] = useState(null);

  let scrollViewRef = useRef(null);

  let [{ errors, submit, formProps, hasError }, fh] = useFormState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    category: '',
    price: 0.00,
    description: '',
    numParticipants: 1,
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
          <InputWithError Component={TextInput} {...fh.text('name', {
            required: true,
            label: 'Name',
          })} disabled={loading} />

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
