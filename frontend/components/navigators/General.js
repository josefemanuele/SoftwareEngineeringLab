import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsPage from '../../pages/Settings.js';

const Stack = createNativeStackNavigator();

export default function OrganizerStack({ home, header }) {
	return (
		<Stack.Navigator screenOptions={{ header: header }} initialRouteName={home}>
			<Stack.Group>
				<Stack.Screen name='general/Settings' component={SettingsPage} options={{
					title: 'Settings'
				}}/>
			</Stack.Group>
		</Stack.Navigator>
	);
}
