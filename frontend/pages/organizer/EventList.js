import React from 'react';

import { Card, FAB, Text } from 'react-native-paper';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function EventList({ navigation }) {
	let organization = {
		title: 'Titolo',
		subtitle: 'Sottotitolo',
		content: 'Contenuto',
	};

	return (
		<>
			<Card style={style.card} onPress={console.log}>
				<Card.Title title={organization.title} subtitle={organization.subtitle}
					titleStyle={{ fontWeight: 'bold' }}
				/>
				<Card.Content>
					<Text>{organization.content}</Text>
				</Card.Content>
			</Card>

			<FAB icon='plus' size='medium' style={{
				position: 'absolute',
				margin: 16,
				right: 0,
				bottom: 0,
			}} onPress={() => navigation.push('organizer/EventCreation')}></FAB>
		</>);
}
