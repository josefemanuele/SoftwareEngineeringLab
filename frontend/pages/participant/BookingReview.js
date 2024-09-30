import React from 'react';

import { ScrollView, View } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-paper';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function BookingReview({ navigation, route }) {
	let { params } = route;
	let { user_info, event_info, booking_data } = params;

	let priceTotal = event_info.price * booking_data.participants;

	return (
		<ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
			<View style={{ alignSelf: 'center', marginBottom: 25 }}>
				<Icon source='file-eye' size={75}></Icon>
			</View>

			<>
				<Text variant="headlineSmall" style={[ style.spaceBottom, style.mt20 ]}>Event info</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="text-short" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Name: </Text>
					<Text variant="bodyLarge">{event_info.name}</Text>
				</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="calendar-text" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Date: </Text>
					<Text variant="bodyLarge">{event_info.date}</Text>
				</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="clock-time-four" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Time: </Text>
					<Text variant="bodyLarge">{event_info.start_time} - {event_info.end_time}</Text>
				</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="map-marker" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Location: </Text>
					<Text variant="bodyLarge">{event_info.location}</Text>
				</Text>

			</>

			<>
				<Divider style={[ style.spaceTop, style.spaceBottom ]} />

				<Text variant="headlineSmall" style={[ style.spaceBottom, style.mt20 ]}>Organizer info</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="form-textbox" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Name: </Text>
					<Text variant="bodyLarge">{user_info.name} {user_info.surname}</Text>
				</Text>
			</>

				<Divider style={[ style.spaceTop, style.spaceBottom ]} />

			<>
				<Text variant="headlineSmall" style={[ style.spaceBottom, style.mt20 ]}>Booking info</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="account-group" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Number of reservations: </Text>
					<Text variant="bodyLarge">{booking_data.participants}</Text>
				</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="currency-usd" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Price: </Text>
					<Text variant="bodyLarge">{event_info.price} € x {booking_data.participants} = {priceTotal} €</Text>
				</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="star-circle" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Special requests: </Text>
					<Text variant="bodyLarge">{booking_data.notes || 'none'}</Text>
				</Text>
			</>

			<Button
				title="booking"
				icon="book-arrow-right-outline"
				mode="elevated"
				style={{ margin: 20 }}
				onPress={() => navigation.push('participant/Payment', {
					event_id: params.event_info.id,
					booking_data: booking_data,
				})}
			>Continue to payment</Button>
		</ScrollView>
	);
}
