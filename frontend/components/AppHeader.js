import React from 'react';

import { Appbar } from 'react-native-paper';

import { doLogout } from '../lib/user.js';

export default function AppHeader({ navigation, route, options, back }) {
	return (
		<Appbar.Header>
			{ back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
			<Appbar.Content title="Prenotalo" />
			<Appbar.Action icon="abacus" />
			<Appbar.Action icon="account-box" onPress={doLogout} />
		</Appbar.Header>
	)
}
