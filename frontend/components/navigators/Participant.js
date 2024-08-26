import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ParticipantEvent from '../../pages/participant/Event.js';
import ParticipantHome from '../../pages/participant/Home.js';
import ParticipantOrganization from '../../pages/participant/Organization.js';
import ParticipantProfile from '../../pages/participant/Profile.js';

const Stack = createNativeStackNavigator();

export default function ParticipantStack({ home, header }) {
	return (
		<Stack.Navigator screenOptions={{ header: header }} initialRouteName={home}>
			<Stack.Group>
				<Stack.Screen name='participant/Home' component={ParticipantHome} options={{
					title: 'Browse'
				}}/>
				<Stack.Screen name='participant/Organization' component={ParticipantOrganization} options={{
					title: 'Organization'
				}}/>
				<Stack.Screen name='participant/Event' component={ParticipantEvent} options={{
					title: 'Event'
				}}/>
				<Stack.Screen name='participant/Profile' component={ParticipantProfile} options={{
					title: 'Profile'
				}}/>
			</Stack.Group>
		</Stack.Navigator>
	);
}
