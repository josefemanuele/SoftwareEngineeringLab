import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../pages/Login.js';
import RoleSelection from '../../pages/RoleSelection.js';
import OrganizerRegistration from '../../pages/organizer/Registration.js';
import ParticipantRegistration from '../../pages/participant/Registration.js';

const Stack = createNativeStackNavigator();

export default function UnauthenticatedStack({ header }) {
	return (
		<Stack.Navigator screenOptions={{ header: header }}>
			<Stack.Group>
				<Stack.Screen name='Login' component={Login} options={{
					title: 'Login'
				}}/>
				<Stack.Screen name='RoleSelection' component={RoleSelection} options={{
					title: 'Register'
				}}/>
				<Stack.Screen name='participant/Registration' component={ParticipantRegistration} options={{
					title: 'Register'
				}}/>
				<Stack.Screen name='organizer/Registration' component={OrganizerRegistration} options={{
					title: 'Register'
				}}/>
			</Stack.Group>
		</Stack.Navigator>
	);
}
