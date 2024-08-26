import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrganizerEvent from '../../pages/organizer/Event.js';
import OrganizerEventCreation from '../../pages/organizer/EventCreation.js';
import OrganizerEventList from '../../pages/organizer/EventList.js';

const Stack = createNativeStackNavigator();

export default function OrganizerStack({ home, header }) {
	return (
		<Stack.Navigator screenOptions={{ header: header }} initialRouteName={home}>
			<Stack.Group>
				<Stack.Screen name='organizer/EventList' component={OrganizerEventList} options={{
					title: 'Event list'
				}}/>
				<Stack.Screen name='organizer/EventCreation' component={OrganizerEventCreation} options={{
					title: 'Event creation'
				}}/>
				<Stack.Screen name='organizer/Event' component={OrganizerEvent} options={{
					title: 'Event'
				}}/>
			</Stack.Group>
		</Stack.Navigator>
	);
}
