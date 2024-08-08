import React from 'react';

import { Button } from 'react-native-paper';

export default function RoleSelection({ navigation }) {
	return (
		<>
			<Button title="Participant" mode="contained" onPress={() => navigation.push('participant/Registration')}>
				Participant
			</Button>
			<Button title="Organizer" mode="contained" onPress={() => navigation.push('organizer/Registration')}>
				Organizer
			</Button>
		</>
	);
}
