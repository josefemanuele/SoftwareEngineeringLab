import React from 'react';

import { Text } from 'react-native-paper';

export default function Organization({ route }) {
	let params = route.params;

	return (
		<>
			<Text>Organization {params.id} page!</Text>
		</>
	);
}
