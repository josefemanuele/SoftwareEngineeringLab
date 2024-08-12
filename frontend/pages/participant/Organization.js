import React from 'react';

import { Card, Text } from 'react-native-paper';

import style from '../../style.js';

export default function Organization({ navigation, route }) {
	let params = route.params;

	let event = {
		id: 432,
		title: 'Evento a caso',
		subtitle: 'Sottotitolo',
		content: 'Descrizione',
	};

	return (
		<>
			<Text>Organization {params.id} page!</Text>

			<Card key={event.id} style={style.card} onPress={() => navigation.push('participant/Event', {
				id: event.id
			})}>
				<Card.Title title={event.title} subtitle={event.subtitle}
					titleStyle={{ fontWeight: 'bold' }}
				/>
				<Card.Content>
					<Text>{event.content}</Text>
				</Card.Content>
			</Card>
		</>
	);
}
