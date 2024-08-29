import React, { useState } from 'react';

import { ScrollView, View } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-paper';

import FullDialog from '../../components/FullDialog.js';

import backend from '../../lib/backend.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function Reservation({ navigation, route }) {
	let { params } = route;
	let { reservation } = params;
	let { event_data, booking_data } = reservation;
	let reservationId = reservation.id;

	let priceTotal = event_data.price * booking_data.participants;

	let [ dialogVisible, setDialogVisible ] = React.useState(false);

	return (
		<>
		<ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
			<View style={{ alignSelf: 'center', marginBottom: 25 }}>
				<Icon source='file-eye' size={75}></Icon>
			</View>

			<>
				<Text variant="headlineSmall" style={[ style.spaceBottom, style.mt20 ]}>Event info</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="text-short" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Name: </Text>
					<Text variant="bodyLarge">{event_data.name}</Text>
				</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="calendar-text" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Date: </Text>
					<Text variant="bodyLarge">{event_data.date}</Text>
				</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="clock-time-four" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Time: </Text>
					<Text variant="bodyLarge">{event_data.start_time} - {event_data.end_time}</Text>
				</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="map-marker" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Location: </Text>
					<Text variant="bodyLarge">{event_data.location}</Text>
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
					<Text variant="bodyLarge">{event_data.price} € x {booking_data.participants} = {priceTotal} €</Text>
				</Text>

				<Text style={[ style.spaceBottom ]}>
					<Icon source="star-circle" size={20} />
					<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Special requests: </Text>
					<Text variant="bodyLarge">{booking_data.notes || 'none'}</Text>
				</Text>
			</>

			<Button
					title="cancel"
					icon="close-circle-outline"
					mode="elevated"
					style={{ margin: 20 }}
					onPress={() => setDialogVisible(true)}
				>Cancel</Button>

		</ScrollView>
		<FullDialog
				title="Confirmation message"
				content={`Do you want to cancel the event?`}
				actions={[{
					name: 'Yes',
					callback: () => {
						setDialogVisible(false);
						backend.removeReservation(reservationId);
						navigation.navigate('participant/Reservations');
					}
				}, {
					name: 'No',
					callback: () => setDialogVisible(false),
				}]}
				visible={dialogVisible}
				onDismiss={() => setDialogVisible(false)}
		/>
		</>
	);
}
