import React from 'react';

import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { ids as bsIds, styles as bsStyles } from '../style/bootstrap.js';
import style from '../style/custom.js';

export default function RoleSelection({ navigation }) {
	return (
		<View style={[ style.mt15p ]}>
			<Text variant="headlineLarge" style={{
				textAlign: 'center',
			}}>Sign up as</Text>

			<View style={[ style.row, style.mt20 ]}>
				<Button style={style.button_row} title="Participant" mode="elevated" icon="account" onPress={() => navigation.push('participant/Registration')}>
					Participant
				</Button>
				<Button  style={style.button_row} title="Organizer" mode="elevated" icon="home" onPress={() => navigation.push('organizer/Registration')}>
					Organizer
				</Button>
			</View>
		</View>
	);
}
