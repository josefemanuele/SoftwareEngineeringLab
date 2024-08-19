import React, { useState } from 'react';

import { Appbar, Divider, IconButton, Menu, Text } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements'

import style from '../style/custom.js';

import { doLogout } from '../lib/user.js';

export default function AppHeader({ navigation, route, options, back, isLoggedIn }) {
	let notifNum = 1;

	let notifIcon = notifNum > 0 ? 'message-badge-outline' : 'message-outline';
	let backButton = back ? <Appbar.BackAction onPress={navigation.goBack} /> : null;

	let title = getHeaderTitle(options, route.name);

	let accountIcon = <Appbar.Action icon="account-circle" onPress={() => setAccountMenuVisible(true)} />;
	let [ accountMenuVisible, setAccountMenuVisible ] = useState(false);

	let actions = isLoggedIn ? (
		<>
			<Appbar.Action icon={notifIcon} />
			<Menu visible={accountMenuVisible} onDismiss={() => setAccountMenuVisible(false)} anchor={accountIcon} anchorPosition="bottom">
				<Text style={style.box} variant="titleMedium">Welcome, USER!</Text>
				<Divider />
				<Menu.Item title="Profile" leadingIcon="account" />
				<Menu.Item title="Logout" leadingIcon="logout" onPress={doLogout} />
			</Menu>
		</>
	) : null;

	return (
		<Appbar.Header>
			{backButton}
			<Appbar.Content title={title} titleStyle={{ fontWeight: 'bold' }} />
			{actions}
		</Appbar.Header>
	)
}
