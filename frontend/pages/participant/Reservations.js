import React from 'react';

import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function Reservations() {
	return (
		<ScrollView contentContainerStyle={style.box} style={bsStyles.container} dataSet={{ media: bsIds.container }}>
			<Text>Reservations!</Text>
		</ScrollView>
	)
}
