import React, { useContext, useState } from 'react';

import { ScrollView, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';

import StateContext from '../components/StateContext.js';

import state from '../lib/state.js';

import { ids as bsIds, styles as bsStyles } from '../style/bootstrap.js';
import style from '../style/custom.js';

let themes = [
	{ label: 'Follow system theme', value: 'system' },
	{ label: 'Light', value: 'light' },
	{ label: 'Dark', value: 'dark' },
];

export default function Settings() {
	let store = useContext(StateContext);

	return (
		<ScrollView contentContainerStyle={style.box} style={bsStyles.container} dataSet={{ media: bsIds.container }}>
			<View style={{ alignSelf: 'center', marginBottom: 25 }}>
				<Icon source='cog' size={75}></Icon>
			</View>

			{/* <View style={{ flexDirection: 'row' }}> */}
				{/* <Text style={{ fontWeight: 'bold' }}>Theme:</Text> */}
				<Dropdown
					label="Theme"
					value={store.theme}
					onSelect={(value) => {
						state.setStore(s => ({
							...s,
							theme: value
						}));
					}}
					style={{ marginBottom: 20 }}
					options={themes}
				/>
			{/* </View> */}
		</ScrollView>
	)
}
