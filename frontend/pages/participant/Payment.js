import React, { useRef, useState } from 'react';

import { ScrollView, View } from 'react-native';
import { Button, Divider, Icon, Text, TextInput } from 'react-native-paper';
import { en, registerTranslation, registerDefaultLocale, useFormState, Form } from 'react-native-use-form';

import FullDialog from '../../components/FullDialog.js';
import InputWithError from '../../components/InputWithError.js';

import backend from '../../lib/backend.js';
import state from '../../lib/state.js';

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
    title: 'Booking confirmed!',
    description: 'Your booking has been made. Check your email or the reservations screen for the confirmation details.'
  },
  'failed': {
    title: 'Booking failed',
    description: 'Booking failed for some reason'
  },
}

export default function Payment({ navigation, route }) {
  let { params } = route;

	let [ loading, setLoading ] = useState(false);
  let [ dialogMessage, setDialogMessage ] = useState(null);

  let scrollViewRef = useRef(null);

  let [{ errors, submit, formProps, hasError }, fh] = useFormState({
    ccNumber: '1234-5678-1234-5678',
    cvv: '123',
    expirationDate: '10/28',
    cardholderName: 'Gianni Verdi',
  }, {
    scrollViewRef: scrollViewRef,
    onSubmit: async function (values) {
      setLoading(true);

      let paymentId = await backend.addPayment({
        transaction_data: {
          user_id: state.store.userId,
          price: params.price,
          ...values,
        }
      });
      let bookingId = await backend.addReservation({
        transaction_id: paymentId,
        user_id: state.store.userId,
        event_id: params.event_id,
        ...params.booking_data,
      });

      setLoading(false);
      setDialogMessage('success');
    },
  });

  function onDialogDismiss() {
    setDialogMessage(null);

    if (dialogMessage === 'success') {
      navigation.navigate('participant/Home');
    }
  }

	return (
		<>
			<ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
        <View style={{ alignSelf: 'center', marginBottom: 25 }}>
          <Icon source='cash-fast' size={100}></Icon>
        </View>

        <Form {...formProps}>
          <InputWithError Component={TextInput} {...fh.text('ccNumber', {
            required: true,
            label: 'Credit card number *',
            shouldFollowRegexes: [
              { regex: /^([0-9]{4}[\- ]?){3}[0-9]{4}$/, errorMessage: 'Invalid credit card number' },
            ],
          })} disabled={loading} />

          <InputWithError Component={TextInput} {...fh.text('cvv', {
            required: true,
            label: 'CVV *',
            shouldFollowRegexes: [
              { regex: /^[0-9]{3}$/, errorMessage: 'Invalid CVV' },
            ],
          })} disabled={loading} />

          <InputWithError Component={TextInput} {...fh.text('expirationDate', {
            required: true,
            label: 'Expiration date *',
            shouldFollowRegexes: [
              { regex: /^[0-9]{2}[\/\-][0-9]{2}$/, errorMessage: 'Invalid credit card number' },
            ],
          })} disabled={loading} />

          <InputWithError Component={TextInput} {...fh.text('cardholderName', {
            required: true,
            label: 'Cardholder name *',
          })} disabled={loading} />

          <Button title="Payment" icon="credit-card" mode="elevated" style={style.spaceTop} loading={loading} onPress={submit} disabled={loading}>
            Confirm payment
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
