import React, { useRef } from 'react';

import { ScrollView, View } from 'react-native';
import { Button, Divider, Icon, Text, TextInput } from 'react-native-paper';
import { en, registerTranslation, registerDefaultLocale, useFormState, Form } from 'react-native-use-form';

import InputWithError from '../../components/InputWithError.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

registerTranslation('en', en);
registerDefaultLocale('en');

export default function BookingPersonalization({ navigation, route }) {
	let { params } = route;

	let scrollViewRef = useRef(null);

	let maxParticipants = params.event_info.capacity;

	let [{ errors, submit, formProps, hasError }, fh] = useFormState({
		participants: 1,
		notes: '',
	}, {
		scrollViewRef: scrollViewRef,
		onSubmit: (values) => {
			navigation.push('participant/BookingReview', {
				user_info: params.user_info,
				event_info: params.event_info,
				booking_data: values,
			});
		}
	});

	return (
		<ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
			<View style={{ alignSelf: 'center', marginBottom: 25 }}>
				<Icon source='book-cog' size={75}></Icon>
			</View>

			<Form {...formProps}>
				{/* <Dropdown
					label="Type of ticket"
					value={category}
					onSelect={setCategory}
					style={{ marginBottom: 20 }}
					disabled={loading}
					options={eventCategories}
				/> */}

				<InputWithError Component={TextInput}
					inputMode='numeric'
					right={<TextInput.Affix text={`/${maxParticipants}`} />}
					{...fh.text('participants', {
						required: true,
						label: 'Number of participants',
						validate: value => {
	            if (isNaN(value)) {
	              return 'Insert a valid number';
	            }

							if (!(value >= 1 && value <= maxParticipants)) {
								return `Insert a number between 1 and ${maxParticipants}`;
							}

	            return true;
	          }
					})}
				/>

				<InputWithError Component={TextInput}
					multiline={true}
					numberOfLines={5}
					{...fh.text('notes', {
						required: false,
						label: 'Special requests for the organizer (eg. disabilities)',
					})}
				/>

				<Button title="Payment" icon="book-arrow-right-outline" mode="elevated" style={style.spaceTop} onPress={submit}>
					Continue to review
				</Button>
			</Form>
		</ScrollView>
	);
}
