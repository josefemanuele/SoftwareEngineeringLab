import React, { useState } from 'react';

import { ScrollView, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { Button, Icon, Text, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { DatePickerInput, TimePickerModal, it, registerTranslation } from 'react-native-paper-dates';

import FullDialog from '../../components/FullDialog.js';
import LoadingOverlay from '../../components/LoadingOverlay.js';

import backend from '../../lib/backend.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

let eventCategories = [
	{ label: 'Unspecified', value: 'default' },
	{ label: 'Categoria 1', value: 1 },
	{ label: 'Categoria 2', value: 2 },
	{ label: 'Categoria 3', value: 3 },
];

registerTranslation('it', it);

export default function EventCreation({ navigation, route }) {
	let { event_info } = route.params || {};

	let initDate;

	if (!event_info) {
		event_info = {
			"id": 0,
			"name": '',
			"date": undefined,
			"start_time": null,
			"end_time": null,
			"category": 'default',
			"location": '',
			"price": 0,
			"description": '',
			"capacity": 1,
		};
	} else {
		let parts = event_info.date.split('/');

		initDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
	}

	let initStartTime = event_info.start_time ? parseTime(event_info.start_time) : {};
	let initEndTime = event_info.end_time ? parseTime(event_info.end_time) : {};

	let [ name, setName ] = useState(event_info.name);
	let [ category, setCategory ] = useState(event_info.category);
	let [ date, setDate ] = useState(initDate);
	let [ startTime, setStartTime ] = useState(initStartTime);
	let [ endTime, setEndTime ] = useState(initEndTime);
	let [ location, setLocation ] = useState(event_info.location);
	let [ price, setPrice ] = useState(event_info.price);
	let [ description, setDescription ] = useState(event_info.description);
	let [ participantsNum, setParticipantNum ] = useState(event_info.capacity);

	let [ stVisible, setStVisible ] = useState(false);
	let [ etVisible, setEtVisible ] = useState(false);

	let [ dialogVisible, setDialogVisible ] = useState(false);
	let [ loading, setLoading ] = useState(false);

	return (
		<ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
			<View style={{ alignSelf: 'center', marginBottom: 25 }}>
				<Icon source={event_info.id > 0 ? 'calendar-edit' : 'calendar-plus'} size={75}></Icon>
			</View>

			<TextInput
				label="Name"
				value={name}
        onChangeText={text => setName(text)}
        style={{ marginBottom: 20 }}
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

			<DatePickerInput
				label="Date"
				value={date}
				onChange={setDate}
				style={{ marginBottom: 20, marginTop: 20 }}
				disabled={loading}
				locale="it"
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
					style={{ marginBottom: 20, marginRight: 20, flex: 1}}
					disabled={loading}
				/>

				<TextInput
					label="End time"
					value={formatTime(endTime)}
					onFocus={() => setEtVisible(true)}
					style={{ marginBottom: 20, flex: 1 }}
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

			<TextInput
				label="Location"
				value={location}
				onChangeText={text => setLocation(text)}
				style={{ marginBottom: 20 }}
				disabled={loading}
			/>

			<CurrencyInput
				renderTextInput={tiProps => <TextInput label="Price" {...tiProps} />}
				value={price}
				onChangeValue={setPrice}
				style={{
					marginBottom: 20,
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
				icon={event_info.id > 0 ? 'pencil' : 'plus'}
				style={[ style.spaceTop ]}
				onPress={async function () {
					setLoading(true);

					let values = {
						name,
						category,
						date,
						startTime,
						endTime,
						location,
						price,
						description,
						participantsNum,
					};

					if (event_info.id > 0) {
						await backend.modifyEvent(id, values);
					} else {
						await backend.addEvent(values);
					}

					setLoading(false);
					setDialogVisible(true);
				}}
				loading={loading}
				disabled={loading}
			>
				{event_info.id > 0 ? 'Modify' : 'Create'}
			</Button>

			{/* <LoadingOverlay visible={name === 'ciao'} /> */}
			<FullDialog
				title={event_info.id > 0 ? 'Event modified!' : 'Event created!'}
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

function parseTime(str) {
	let parts = str.split(':');

	return {
		hours: parseInt(parts[0], 10),
		minutes: parseInt(parts[1], 10),
	};
}
