import React from 'react';

import { Icon } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

import GeneralStack from './General.js';
import ParticipantStack from './Participant.js';
import OrganizerStack from './Organizer.js';
import UnauthenticatedStack from './Unauthenticated.js';

import AppError from '../AppError.js';
import AppHeader from '../AppHeader.js';

const Drawer = createDrawerNavigator();

export default function MainNavigator({ isLoggedIn, userRole }) {
	let header = (args) => (<AppHeader isLoggedIn={isLoggedIn} {...args} />);

	let specificScreens = [];

	if (userRole === 'participant') {
		specificScreens = [
			<Drawer.Screen key='1' name='participant/NavBrowse'
				component={(args) => <ParticipantStack header={header} home='participant/Browse' />}
				options={{
					title: 'Browse',
					drawerIcon: () => <Icon source='earth' size={20} />,
				}} />,
			<Drawer.Screen key='2' name='participant/NavReservations'
				component={(args) => <ParticipantStack header={header} home='participant/Reservations' />}
				options={{
					title: 'Reservations',
					drawerIcon: () => <Icon source='receipt' size={20} />,
				}} />,
			<Drawer.Screen key='4' name='participant/NavProfile'
				component={(args) => <ParticipantStack header={header} home='participant/Profile' />}
				options={{
				title: 'Profile',
				drawerIcon: () => <Icon source='account' size={20} />,
			}}/>,
		];
	} else if (userRole === 'organizer') {
		specificScreens = [
			<Drawer.Screen key='3' name='organizer/NavManage'
				component={(args) => <OrganizerStack header={header} home='organizer/EventList' />}
				options={{
					title: 'Events',
					drawerIcon: () => <Icon source='card-text' size={20} />,
				}}/>,
			<Drawer.Screen key='5' name='organizer/NavProfile'
				component={(args) => <OrganizerStack header={header} home='organizer/Profile' />}
				options={{
				title: 'Organization',
				drawerIcon: () => <Icon source='account' size={20} />,
			}}/>,
		];
	}

	let generalScreens = [];

	if (isLoggedIn) {
		generalScreens = [
			<Drawer.Screen key='6' name='general/NavSettings'
				component={(args) => <GeneralStack header={header} home='general/Settings' />}
				options={{
					title: 'Settings',
					drawerIcon: () => <Icon source='cog' size={20} />,
				}}/>,
		];
	}

	return (
		<Drawer.Navigator screenOptions={{
			headerShown: false,
		}}>
			<Drawer.Group>
				{specificScreens}
				{generalScreens}
			</Drawer.Group>
		</Drawer.Navigator>
	);
}
