import React, { useState } from 'react';

import { View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { Button, Text, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';

import FullDialog from '../../components/FullDialog.js';
import style from '../../style.js';

let eventCategories = [
	{ label: 'Unspecified', value: 'default' },
	{ label: 'Categoria 1', value: 1 },
	{ label: 'Categoria 2', value: 2 },
	{ label: 'Categoria 3', value: 3 },
]

export default function EventCreation({ navigation }) {
	let [ date, setDate ] = useState();
	let [ name, setName ] = useState('');
	let [ category, setCategory ] = useState('default');
	let [ price, setPrice ] = useState(0);
	let [ description, setDescription ] = useState('');
	let [ participantsNum, setParticipantNum ] = useState(1);

	let [ startTime, setStartTime ] = useState({});
	let [ endTime, setEndTime ] = useState({});
	let [ stVisible, setStVisible ] = useState(false);
	let [ etVisible, setEtVisible ] = useState(false);

	let [ dialogVisible, setDialogVisible ] = useState(false);

	return (
		<View style={[style.spaced, style.container]}>
			<TextInput label="Name" value={name}
        onChangeText={text => setName(text)}
        style={{ marginBottom: 20 }}
      />

			<DatePickerInput locale="en" label="Date" value={date} onChange={setDate} inputMode="start"
				style={{ marginBottom: 20 }}/>

			<View style={{ flexDirection: "row", }}>
				<TextInput label="Start time" value={formatTime(startTime)}
					style={{ marginBottom: 20, marginRight: 20 }} onFocus={() => setStVisible(true)}
					/>

				<TextInput label="End time" value={formatTime(endTime)}
					style={{ marginBottom: 20 }} onFocus={() => setEtVisible(true)}
					/>
			</View>

			<TimePickerModal visible={stVisible}
				onDismiss={() => setStVisible(false)}
				onConfirm={time => {
					setStVisible(false);
					setStartTime(time);
				}}
				hours={startTime.hours}
				minutes={startTime.minutes}
			/>

			<TimePickerModal visible={etVisible}
				onDismiss={() => setEtVisible(false)}
				onConfirm={time => {
					setEtVisible(false);
					setEndTime(time);
				}}
				hours={endTime.hours}
				minutes={endTime.minutes}
			/>

			<Dropdown label="Category" options={eventCategories} value={category} onSelect={setCategory}
				style={{ marginBottom: 20 }} />

			<CurrencyInput prefix='€' value={price} onChangeValue={setPrice}
				renderTextInput={tiProps => <TextInput label="Price" {...tiProps} />}
				style={{
					marginBottom: 20,
					marginTop: 20,
				}} />

			<TextInput label="Description" value={description}
        onChangeText={text => setDescription(text)}
        style={{ marginBottom: 20 }}
				numberOfLines={5}
				multiline={true}
      />

			<CurrencyInput value={participantsNum} onChangeValue={setParticipantNum}
				precision={0} minValue={1}
				renderTextInput={tiProps => <TextInput label="n° participants" {...tiProps} />}
				style={{ marginBottom: 20 }} />

			<Button title="Submit" mode="contained" style={[ style.mt20, style.mb20 ]} onPress={() => setDialogVisible(true)}>
				Create
			</Button>

			<FullDialog title="Event created!" content="" actions={[
				{ name: 'OK', callback: () => {
					setDialogVisible(false);
					navigation.pop();
				}},
			]} visible={dialogVisible} onDismiss={() => setDialogVisible(false)} />
		</View>
	);
}


function formatTime(time) {
	if (time.hours == null) {
		return '';
	}

	let { hours, minutes } = time;

	let padMinutes = minutes.toString().padStart(2, '0');

	return `${hours}:${padMinutes}`;
}
