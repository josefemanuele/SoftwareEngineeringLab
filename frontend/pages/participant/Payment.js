import React, { useState } from 'react';

import { ScrollView } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-paper';

import FullDialog from '../../components/FullDialog.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function Payment({ navigation, route }) {
	let [ dialogVisible, setDialogVisible ] = useState(false);

	return (
		<>
			<ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
				<Text>Payment page!</Text>
				<Button
					title="booking"
					icon="book-arrow-right-outline"
					mode="elevated"
					style={{ margin: 20 }}
					onPress={() => setDialogVisible(true)}
				>Pay now!</Button>
			</ScrollView>

			<FullDialog
				title="Booking made!"
				content=""
				actions={[
				{
					name: 'OK',
					callback: () => {
						setDialogVisible(false);
						navigation.navigate('participant/Home');
					}},
				]}
				visible={dialogVisible}
				onDismiss={() => setDialogVisible(false)}
			/>
		</>
	);
}
