import React, { useState, useEffect }from 'react';

import { ScrollView } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-paper';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function EventPage({ navigation, route }) {
	let params = route.params;

	let [ eventInfo, setEventInfo ] = useState({
		title: 'Event title',
		description: 'Event description',
		date: '01/12/2025',
		start_time: '10:00',
		end_time: '12:00',
		price: '25 €',
		capacity: 30,
		reservations: 20,
	});

	let [ bookable, setBookable ] = useState(true);

	return (
		<ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>
			<Text variant="headlineMedium" style={[ style.spaceBottom, style.mt20 ]}>{eventInfo.title}</Text>

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
        <Icon source="currency-usd" size={20} />
        <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Price: </Text>
        <Text variant="bodyLarge">{eventInfo.price}</Text>
      </Text>

      <Text style={[]}>
        <Icon source="account-group-outline" size={20} />
        <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Capacity: </Text>
        <Text variant="bodyLarge">{eventInfo.eservations} / {eventInfo.capacity}</Text>
      </Text>

			<Divider style={[ style.spaceBottom, style.spaceTop ]} />

			<Text style={[ style.spaceBottom ]}>
        <Icon source="text-box" size={20} />
        <Text style={{ marginLeft: 20 }}>{eventInfo.description}</Text>
      </Text>

			<Button
				title="booking"
				icon="book-arrow-right-outline"
				mode="elevated"
				style={{ margin: 20 }}
        disabled={!bookable}
				onPress={() => navigation.push('participant/BookingPersonalization', {
					event_id: params.event_id,
				})}
			>Book now!</Button>
    </ScrollView>
	);
}
