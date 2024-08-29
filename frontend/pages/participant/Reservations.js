import React, { useEffect, useState } from 'react';

import { RefreshControl, ScrollView, View } from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-paper';

import backend from '../../lib/backend.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function Reservations({navigation}) {
	let [ refreshing, setRefreshing ] = useState(false);
	let [ reservations, setReservations ] = useState([]);

	let userId = 1;

	async function doRefresh() {
    setRefreshing(true);

    let resvs = backend.getReservationsOfUser(userId);
		console.log(resvs);
    setReservations(resvs);

    setRefreshing(false);
  }

  useEffect(() => {
    doRefresh();
  }, []);

	return (
		<ScrollView contentContainerStyle={style.box} refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
		}>
			<View style={{ alignSelf: 'center', marginBottom: 25 }}>
				<Icon source='calendar' size={75}></Icon>
			</View>

			{reservations.map((reservation) => (
				<Card key={reservation.id} style={{
					marginBottom: GLOBAL_SPACING,
				}}>
					<Card.Title title={reservation.event_data.name} titleStyle={{ fontWeight: 'bold', fontSize: 22 }} />
					<Card.Content>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Category: </Text>
							<Text>{reservation.event_data.category}</Text>
						</Text>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Date: </Text>
							<Text>{reservation.event_data.date}</Text>
						</Text>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Time: </Text>
							<Text>{reservation.event_data.start_time} - {reservation.event_data.end_time}</Text>
						</Text>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Location: </Text>
							<Text>{reservation.event_data.location}</Text>
						</Text>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Price: </Text>
							<Text>{reservation.event_data.price}€</Text>
						</Text>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Participants: </Text>
							<Text>{reservation.booking_data.participants}</Text>
						</Text>
					</Card.Content>
					<Card.Actions>
						<Button onPress={() => navigation.push('participant/Reservation', {
							user_info: null,
							event_info: reservation.event_data,
							booking_data: reservation.booking_data,
						})}>View more</Button>
					</Card.Actions>
				</Card>
			))}
		</ScrollView>
	)
}
