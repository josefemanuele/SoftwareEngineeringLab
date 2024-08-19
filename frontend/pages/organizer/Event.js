import React from 'react';

import { Text } from 'react-native-paper';

export default function EventPage({ route }) {
	let params = route.params;

	return (
		<>
			<Text>Event page! event_id={params.event_id}</Text>
		</>
	);
}
