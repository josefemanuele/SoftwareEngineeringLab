import React from 'react';

import { ScrollView } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-paper';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function BookingPersonalization({ navigation, route }) {
	let { params } = route;
	
	let bookingData = {};

	return (
		<ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
			<Text>Booking personalization!</Text>
			<Button
				title="booking"
				icon="book-arrow-right-outline"
				mode="elevated"
				style={{ margin: 20 }}
				onPress={() => navigation.push('participant/BookingReview', {
					event_id: params.event_id,
					booking_data: bookingData,
				})}
			>Continue to payment</Button>
		</ScrollView>
	);
}
