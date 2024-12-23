import React, { useContext } from 'react';

import { Icon } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

import GeneralStack from './General.js';
import ParticipantStack from './Participant.js';
import OrganizerStack from './Organizer.js';
import UnauthenticatedStack from './Unauthenticated.js';

import AppError from '../AppError.js';
import AppHeader from '../AppHeader.js';
import StateContext from '../StateContext.js';

const Drawer = createDrawerNavigator();

export default function MainNavigator() {
	let store = useContext(StateContext);

	let header = (args) => (<AppHeader {...args} />);

	if (store.authToken === null) {
		return (
			<UnauthenticatedStack header={header} />
		);
	}

	let specificScreens = null;

	if (store.userRole === 'participant') {
		specificScreens = (
			<Drawer.Group>

				<Drawer.Screen key='1' name='participant/NavBrowse' options={{
						title: 'Browse',
						drawerIcon: getIconNode('earth', 20),
				}}>
					{(args) => <ParticipantStack header={header} home='participant/Browse' />}
				</Drawer.Screen>

				<Drawer.Screen key='2' name='participant/NavReservations' options={{
					title: 'My reservations',
					drawerIcon: getIconNode('receipt', 20),
				}}>
					{(args) => <ParticipantStack header={header} home='participant/Reservations' />}
				</Drawer.Screen>

				<Drawer.Screen key='4' name='participant/NavProfile' options={{
					title: 'My profile',
					drawerIcon: getIconNode('account', 20),
				}}>
					{(args) => <ParticipantStack header={header} home='general/Profile' />}
				</Drawer.Screen>

			</Drawer.Group>
		);
	} else if (store.userRole === 'organizer') {
		specificScreens = (
			<Drawer.Group>

				<Drawer.Screen key='3' name='organizer/NavManage' options={{
					title: 'Events',
					drawerIcon: getIconNode('card-text', 20),
				}}>
					{(args) => <OrganizerStack header={header} home='organizer/EventList' />}
				</Drawer.Screen>

				<Drawer.Screen key='5' name='organizer/NavProfile' options={{
					title: 'Organization',
					drawerIcon: getIconNode('account', 20),
				}}>
					{(args) => <OrganizerStack header={header} home='general/Profile' />}
				</Drawer.Screen>

			</Drawer.Group>
		);
	}

	return (
		<Drawer.Navigator screenOptions={{
			headerShown: false,
		}}>
			{specificScreens}

			<Drawer.Group>
				<Drawer.Screen key='6' name='general/NavSettings' options={{
					title: 'Settings',
					drawerIcon: getIconNode('cog', 20),
				}}>
					{(args) => <GeneralStack header={header} home='general/Settings' />}
				</Drawer.Screen>
			</Drawer.Group>

		</Drawer.Navigator>
	);
}

function getIconNode(source, size) {
	return (args) => (<Icon source={source} size={size} />);
}
