import React from 'react';

import { ScrollView, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { ids as bsIds, styles as bsStyles } from '../style/bootstrap.js';
import style from '../style/custom.js';

export default function Settings() {
	return (
		<ScrollView contentContainerStyle={style.box} style={bsStyles.container} dataSet={{ media: bsIds.container }}>
			<View style={{ alignSelf: 'center', marginBottom: 25 }}>
				<Icon source='cog' size={75}></Icon>
			</View>

			<Text>Settings!</Text>
		</ScrollView>
	)
}
