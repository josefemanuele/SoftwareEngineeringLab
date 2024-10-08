import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrganizerEvent from '../../pages/organizer/Event.js';
import OrganizerEventModification from '../../pages/organizer/EventModification.js';
import OrganizerEventList from '../../pages/organizer/EventList.js';
import OrganizerProfile from '../../pages/organizer/Profile.js';

const Stack = createNativeStackNavigator();

export default function OrganizerStack({ home, header }) {
	return (
		<Stack.Navigator screenOptions={{ header: header }} initialRouteName={home}>
			<Stack.Group>
				<Stack.Screen name='organizer/EventList' component={OrganizerEventList} options={{
					title: 'Event list'
				}}/>
				<Stack.Screen name='organizer/EventCreation' component={OrganizerEventModification} options={{
					title: 'Event creation'
				}}/>
				<Stack.Screen name='organizer/EventModification' component={OrganizerEventModification} options={{
					title: 'Event modification'
				}}/>
				<Stack.Screen name='organizer/Event' component={OrganizerEvent} options={{
					title: 'Event'
				}}/>

				<Stack.Screen name='general/Profile' component={OrganizerProfile} options={{
					title: 'Organization'
				}}/>
			</Stack.Group>
		</Stack.Navigator>
	);
}
