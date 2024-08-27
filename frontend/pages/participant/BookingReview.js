import React from 'react';

import { ScrollView } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-paper';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function BookingReview({ navigation, route }) {
	let { params } = route;
	let { booking_data } = params;

	return (
		<ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
			<Text>Booking review!</Text>
			<Button
				title="booking"
				icon="book-arrow-right-outline"
				mode="elevated"
				style={{ margin: 20 }}
				onPress={() => navigation.push('participant/Payment', {
					event_id: params.event_id,
					booking_data: booking_data,
				})}
			>Pay now!</Button>
		</ScrollView>
	);
}
