import React, { useState, useEffect }from 'react';

import { RefreshControl, ScrollView, View } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-paper';

import backend from '../../lib/backend.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function EventPage({ navigation, route }) {
	let { params } = route;
	let { event_id } = params;

	let [ eventInfo, setEventInfo ] = useState({
		id: 0,
		name: '',
		location: '',
		date: '',
		start_time: '',
		end_time: '',
		category: '',
		price: 0,
		description: '',
		capacity: 0,

		reservations: 0,
	});

	let [ bookable, setBookable ] = useState(true);
	let [ refreshing, setRefreshing ] = useState(false);

	async function doRefresh() {
		setRefreshing(true);

		let response = await backend.getEvent(event_id);
		setEventInfo(response);
		setBookable(response.reservations < response.capacity);

		setRefreshing(false);
	}

	useEffect(() => {
		doRefresh();
	}, []);

	let userInfo = {
		name: 'Gino',
		surname: 'Rossi',
	}

	return (
		<ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
			}>
			<View style={{ alignSelf: 'center', marginBottom: 25 }}>
				<Icon source='calendar-text' size={75}></Icon>
			</View>

			<Text variant="headlineMedium" style={[ style.spaceBottom, style.mt20 ]}>{eventInfo.name}</Text>

			<Text style={[ style.spaceBottom ]}>
        <Icon source="tag" size={20} />
        <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Category: </Text>
        <Text variant="bodyLarge">{eventInfo.category}</Text>
      </Text>

      <Text style={[ style.spaceBottom ]}>
        <Icon source="calendar-text" size={20} />
        <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Date: </Text>
        <Text variant="bodyLarge">{eventInfo.date}</Text>
      </Text>

      <Text style={[ style.spaceBottom ]}>
        <Icon source="clock-time-four" size={20} />
        <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Time: </Text>
        <Text variant="bodyLarge">{eventInfo.start_time} - {eventInfo.end_time}</Text>
      </Text>

      <Text style={[ style.spaceBottom ]}>
        <Icon source="map-marker" size={20} />
        <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Location: </Text>
        <Text variant="bodyLarge">{eventInfo.location}</Text>
      </Text>

      <Text style={[ style.spaceBottom ]}>
        <Icon source="currency-usd" size={20} />
        <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Price: </Text>
        <Text variant="bodyLarge">{eventInfo.price} €</Text>
      </Text>

      <Text style={[]}>
        <Icon source="account-group-outline" size={20} />
        <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Capacity: </Text>
        <Text variant="bodyLarge">{eventInfo.capacity - eventInfo.reservations} slots left</Text>
      </Text>

			<Divider style={[ style.spaceBottom, style.spaceTop ]} />

		  <Text style={[ style.spaceBottom ]}>
        <Icon source="text-box" size={20} />
				<Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Description:</Text>
        <Text style={{ marginLeft: 20 }}>{eventInfo.description}</Text>
      </Text>

			<Button
				title="booking"
				icon="book-arrow-right-outline"
				mode="elevated"
				style={{ margin: 20 }}
        disabled={!bookable}
				onPress={() => navigation.push('participant/BookingPersonalization', {
					event_info: eventInfo,
					user_info: userInfo,
				})}>Book now!</Button>

    </ScrollView>
	);
}
