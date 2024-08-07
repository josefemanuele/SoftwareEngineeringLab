import React from 'react';

import { Appbar } from 'react-native-paper';

import { doLogout } from '../lib/user.js';

export default function AppHeader({ navigation, route, options, back }) {
	let notifNum = 1;

	let notifIcon = notifNum > 0 ? 'message-badge-outline' : 'message-outline';
	let backButton = back ? <Appbar.BackAction onPress={navigation.goBack} /> : null;

	return (
		<Appbar.Header>
			{backButton}
			<Appbar.Content title={route.name} />
			<Appbar.Action icon={notifIcon} />
			<Appbar.Action icon="account-circle" onPress={doLogout} />
		</Appbar.Header>
	)
}
