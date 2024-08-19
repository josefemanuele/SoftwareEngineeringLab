import React, { useState } from 'react';

import { ScrollView, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { Button, Text, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';

import FullDialog from '../../components/FullDialog.js';
import LoadingOverlay from '../../components/LoadingOverlay.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

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
	let [ loading, setLoading ] = useState(false);

	return (
		<ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
			<TextInput
				label="Name"
				value={name}
        onChangeText={text => setName(text)}
        style={{ marginBottom: 20 }}
				disabled={loading}
      />

			<DatePickerInput
				label="Date"
				value={date}
				onChange={setDate}
				style={{ marginBottom: 20 }}
				disabled={loading}
				locale="en"
				inputMode="start"
			/>

			<View style={{ flexDirection: "row" }}>
				<TextInput
					label="Start time"
					value={formatTime(startTime)}
					onFocus={(event) => {
						console.log(event);
						event.preventDefault();
						setStVisible(true);
					}}
					style={{ marginBottom: 20, marginRight: 20 }}
					disabled={loading}
				/>

				<TextInput
					label="End time"
					value={formatTime(endTime)}
					onFocus={() => setEtVisible(true)}
					style={{ marginBottom: 20 }}
					disabled={loading}
				/>
			</View>

			<TimePickerModal
				visible={stVisible}
				onDismiss={() => setStVisible(false)}
				onConfirm={time => {
					setStVisible(false);
					setStartTime(time);
				}}
				hours={startTime.hours}
				minutes={startTime.minutes}
				disabled={loading}
			/>

			<TimePickerModal
				visible={etVisible}
				onDismiss={() => setEtVisible(false)}
				onConfirm={time => {
					setEtVisible(false);
					setEndTime(time);
				}}
				hours={endTime.hours}
				minutes={endTime.minutes}
				disabled={loading}
			/>

			<Dropdown
				label="Category"
				value={category}
				onSelect={setCategory}
				style={{ marginBottom: 20 }}
				disabled={loading}
				options={eventCategories}
			/>

			<CurrencyInput
				renderTextInput={tiProps => <TextInput label="Price" {...tiProps} />}
				value={price}
				onChangeValue={setPrice}
				style={{
					marginBottom: 20,
					marginTop: 20,
				}}
				disabled={loading}
				prefix='€'
			/>

			<TextInput
				label="Description"
				value={description}
        onChangeText={text => setDescription(text)}
        style={{ marginBottom: 20 }}
				disabled={loading}
				multiline={true}
				numberOfLines={5}
      />

			<CurrencyInput
				value={participantsNum}
				onChangeValue={setParticipantNum}
				style={{ marginBottom: 20 }}
				disabled={loading}
				precision={0}
				minValue={1}
				renderTextInput={tiProps => <TextInput label="n° participants" {...tiProps} />}
			/>

			<Button
				title="Submit"
				mode="contained"
				style={[ style.spaceTop ]}
				onPress={() => {
					setLoading(true);

					setTimeout(() => {
						setLoading(false);

						setDialogVisible(true);
					}, 1000);
				}}
				loading={loading}
				disabled={loading}
			>
				Create
			</Button>

			{/* <LoadingOverlay visible={name === 'ciao'} /> */}
			<FullDialog
				title="Event created!"
				content=""
				actions={[
				{
					name: 'OK',
					callback: () => {
						setDialogVisible(false);
						navigation.pop();
					}},
				]}
				visible={dialogVisible}
				onDismiss={() => setDialogVisible(false)}
			/>
		</ScrollView>
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
