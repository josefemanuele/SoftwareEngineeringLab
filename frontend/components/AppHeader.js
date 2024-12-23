import React, { useContext, useState } from 'react';

import { Appbar, Divider, Menu, Text } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements'

import StateContext from './StateContext.js';

import style from '../style/custom.js';

import state from '../lib/state.js';
import { doLogout } from '../lib/user.js';

export default function AppHeader({ navigation, route, options, back }) {
	let store = useContext(StateContext);
	let isLoggedIn = store.authToken !== null;

	let notifNum = 1;

	let notifIcon = notifNum > 0 ? 'message-badge-outline' : 'message-outline';

	let leftButton;

	if (back) {
		leftButton = <Appbar.BackAction onPress={navigation.goBack} />;
	} else if (navigation.openDrawer) {
		leftButton = <Appbar.Action icon='menu' onPress={navigation.toggleDrawer} />;
	} else {
		leftButton = null;
	}

	let title = getHeaderTitle(options, route.name);

	let accountIcon = <Appbar.Action icon="account-circle" onPress={() => setAccountMenuVisible(true)} />;
	let [ accountMenuVisible, setAccountMenuVisible ] = useState(false);

	let actions = isLoggedIn ? (
		<>
			<Appbar.Action icon={notifIcon} />
			<Menu visible={accountMenuVisible} onDismiss={() => setAccountMenuVisible(false)} anchor={accountIcon} anchorPosition="bottom">
				<Text style={style.box} variant="titleMedium">Welcome, USER!</Text>
				<Divider />
				<Menu.Item title="Profile" leadingIcon="account" onPress={() => navigation.push('general/Profile')}/>
				<Menu.Item title="Logout" leadingIcon="logout" onPress={doLogout} />
			</Menu>
		</>
	) : null;

	return (
		<Appbar.Header>
			{leftButton}
			<Appbar.Content title={title} titleStyle={{ fontWeight: 'bold' }} />
			{actions}
		</Appbar.Header>
	)
}
