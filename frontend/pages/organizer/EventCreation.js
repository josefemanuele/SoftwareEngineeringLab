import React, { useState } from 'react';

import { View } from 'react-native';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';

import style from '../../style.js';

// Snackbar
// error={true}
// keyboardType='numeric'

export default function EventCreation({ navigation }) {
	let [ name, setName ] = useState('');
	let [ description, setDescription ] = useState('');
	let [ participantsNum, setParticipantNum ] = useState(1);

	let [ dialogVisible, setDialogVisible ] = useState(false);

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

			<TextInput label="n° participants" value={participantsNum}
        onChangeText={text => {
					text = text.replace(/[^0-9]/g, '');
					setParticipantNum(text);
				}}
				keyboardType='number-pad'
        style={{ marginBottom: 20 }}
      />

			<Button title="Submit" mode="contained" style={[ style.mt20, style.mb20 ]} onPress={() => setDialogVisible(true)}>
				Create
			</Button>

			<Portal>
				<Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
					<Dialog.Title>Event created!</Dialog.Title>
					{/* <Dialog.Content>
						<Text>Event created!</Text>
					</Dialog.Content> */}
					<Dialog.Actions>
						<Button title="Submit" mode="contained" onPress={() => {
							setDialogVisible(false);
							navigation.pop();
						}}>
							OK
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
}
