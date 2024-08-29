import React, {useState} from 'react';

import { RefreshControl, ScrollView, View } from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-paper';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function Reservations({navigation}) {
	let [ refreshing, setRefreshing ] = useState(false);

	let reservations = [
		{
			id: 1,
			name: "Summer Vibes Festival",
			location: "Central Park, New York City",
			date: "15/07/2024",
			start_time: "17:00",
			end_time: "22:00",
			category: "Festival",
			price: 50,
			participants: 2,
			notes: 'Sedia a rotelle',
		}, {
			id: 2,
			name: "Rock the Night Away",
			location: "The Forum, Los Angeles",
			date: "20/08/2024",
			start_time: "19:30",
			end_time: "23:00",
			category: "Concert",
			price: 75,
			description: "Experience an electrifying night with your favorite rock band at one of LA's premier venues.",
			participants: 5,
			notes: '',
		},
	];

	return (
		<ScrollView contentContainerStyle={style.box} refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={console.log} />
		}>
			<View style={{ alignSelf: 'center', marginBottom: 25 }}>
				<Icon source='calendar' size={75}></Icon>
			</View>

			{reservations.map((reservation) => (
				<Card key={reservation.id} style={{
					marginBottom: GLOBAL_SPACING,
				}}>
					<Card.Title title={reservation.name} titleStyle={{ fontWeight: 'bold', fontSize: 22 }} />
					<Card.Content>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Category: </Text>
							<Text>{reservation.category}</Text>
						</Text>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Date: </Text>
							<Text>{reservation.date}</Text>
						</Text>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Time: </Text>
							<Text>{reservation.start_time} - {reservation.end_time}</Text>
						</Text>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Location: </Text>
							<Text>{reservation.location}</Text>
						</Text>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Price: </Text>
							<Text>{reservation.price}€</Text>
						</Text>
						<Text style={{ marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Participants: </Text>
							<Text>{reservation.participants}</Text>
						</Text>
					</Card.Content>
					<Card.Actions>
						<Button onPress={() => navigation.push('participant/Reservation', {
							user_info: null,
							event_info: reservation,
							booking_data: reservation,
						})}>View more</Button>
					</Card.Actions>
				</Card>
			))}
		</ScrollView>
	)
}
