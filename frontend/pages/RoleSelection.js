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

			<View style={{
				flexDirection: "row",
				justifyContent: "center",
				marginTop: 20,
			}}>
				<Button
					title="Participant"
					icon="account"
					mode="elevated"
					style={{ margin: 20 }}
					onPress={() => navigation.push('participant/Registration')}
				>
					Participant
				</Button>
				<Button
					title="Organizer"
					icon="home"
					mode="elevated"
					style={{ margin: 20 }}
					onPress={() => navigation.push('organizer/Registration')}
				>
					Organizer
				</Button>
			</View>
		</View>
	);
}
