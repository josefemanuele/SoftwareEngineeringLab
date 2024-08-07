import React from 'react';

import { FAB, Text } from 'react-native-paper';

export default function OrganizerEvents({ navigation }) {
	return (
		<>
			<Text>Organizer events!</Text>
			<FAB icon='plus' size='medium' style={{
				position: 'absolute',
				margin: 16,
				right: 0,
				bottom: 0,
			}} onPress={() => navigation.push('EventCreation')}></FAB>
		</>);
}
