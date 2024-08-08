import React from 'react';

import { Button } from 'react-native-paper';
import { View } from 'react-native';

import style from '../style.js';

export default function RoleSelection({ navigation }) {
	return (
		<View style={style.row}>
			<Button style={style.button_row} title="Participant" mode="elevated" icon="account" onPress={() => navigation.push('participant/Registration')}>
				Participant
			</Button>
			<Button  style={style.button_row} title="Organizer" mode="elevated" icon="home" onPress={() => navigation.push('organizer/Registration')}>
				Organizer
			</Button>
		</View>	
	);
}
