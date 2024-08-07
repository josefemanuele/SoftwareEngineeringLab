import React, { useState } from 'react';

import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

import style from '../../style.js';

// Dialog
// Snackbar
// error={true}
// keyboardType='numeric'

export default function EventCreation() {
	let [ name, setName ] = useState('');
	let [ description, setDescription ] = useState('');

	return (
		<View style={style.spaced}>
			<TextInput label="Name" value={name}
        onChangeText={text => setName(text)}
        style={{ marginBottom: 20 }}
      />

			{/*
				Date
				Hours
				Category
				Price
				Participants num
			*/}

			<TextInput label="Description" value={description}
        onChangeText={text => setDescription(text)}
        style={{ marginBottom: 20 }}
				numberOfLines={5}
				multiline={true}
      />
		</View>
	);
}
