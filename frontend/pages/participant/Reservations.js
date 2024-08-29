import React, {useState} from 'react';

import { ScrollView } from 'react-native';
import { DataTable, Text} from 'react-native-paper';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function Reservations({navigation}) {

	const [reservations] = useState([
		{
			id: 1,
  			name: "Summer Vibes Festival",
  			location: "Central Park, New York City",
  			date: "15/07/2024",
			start_time: "17:00",
			end_time: "22:00",
			category: "Festival",
			price: 50,
			payed: "yes",
		},
		{
			id: 2,
			name: "Rock the Night Away",
			location: "The Forum, Los Angeles",
			date: "20/08/2024",
			start_time: "19:30",
			end_time: "23:00",
			category: "Concert",
			price: 75,
			description: "Experience an electrifying night with your favorite rock band at one of LA's premier venues.",
			payed: "yes",
		},
	   ]);

	return (
			<DataTable>
				<DataTable.Header>
					<DataTable.Title style={{ justifyContent: 'center', flex: 2}}>
						<Text>Name</Text>
					</DataTable.Title>
					<DataTable.Title style={{ justifyContent: 'center', flex: 2}}>Location</DataTable.Title>
					<DataTable.Title style={{ justifyContent: 'center', flex: 1}}>Date</DataTable.Title>
					<DataTable.Title style={{ justifyContent: 'center', flex: 1}}>Time</DataTable.Title>
					<DataTable.Title numeric style={{ justifyContent: 'center', flex: 0.5}}>Price</DataTable.Title>
					<DataTable.Title style={{ justifyContent: 'center', flex: 0.5}}>Payed</DataTable.Title>
				</DataTable.Header>

				{reservations.map((reservation) => (
				<DataTable.Row key={reservation.id}>
					<DataTable.Cell style={{justifyContent: 'center', flex: 2}}>{reservation.name}</DataTable.Cell>
					<DataTable.Cell style={{justifyContent: 'center', flex: 2}}>{reservation.location}</DataTable.Cell>
					<DataTable.Cell style={{justifyContent: 'center', flex: 1}}>{reservation.date}</DataTable.Cell>
					<DataTable.Cell style={{justifyContent: 'center', flex: 1}}>{reservation.start_time} - {reservation.end_time}</DataTable.Cell>
					<DataTable.Cell numeric style={{justifyContent: 'center', flex: 0.5}}>{reservation.price}</DataTable.Cell>
					<DataTable.Cell style={{justifyContent: 'center', flex: 0.5}}>{reservation.payed}</DataTable.Cell>
				</DataTable.Row>
			))}
			</DataTable>
	)
}
