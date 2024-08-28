import React, { useEffect, useState } from 'react';

import { RefreshControl, ScrollView, View } from 'react-native';
import { Card, FAB, IconButton, Menu, Text } from 'react-native-paper';

import ThreeDotsMenu from '../../components/ThreeDotsMenu.js';

import { doRequest } from '../../lib/rest.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function EventList({ navigation, route }) {
	let orgId = 123;
	let orgName = 'Melody Events Group';

	let { params } = route;

  let [ events, setEvents ] = useState([]);

  let [ refreshing, setRefreshing ] = useState(false);

  async function doRefresh() {
    setRefreshing(true);

		let response;

    try {
      response = await doRequest('event', 'GET', `/organization/${orgId}/event`, null);
    } catch (e) {
      // nothing
    }

    if (response != null) {
      setEvents(response);
    } else {
      console.log('Error fetching event list')
    }

    setRefreshing(false);
  }

  useEffect(() => {
    doRefresh();
  }, []);

	let cardMenu = () => (
		<ThreeDotsMenu>
			<Menu.Item title="Cancel event" leadingIcon="close-circle-outline" onPress={console.log} />
			<Menu.Item title="Modify event" leadingIcon="pencil" onPress={console.log} />
		</ThreeDotsMenu>
	);

	return (
		<>
			<Text variant="headlineMedium" style={[ style.box, {
				alignSelf: 'center', fontWeight: 'bold'
			} ]}>{orgName}</Text>

			<ScrollView contentContainerStyle={style.box} refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
			}>
				{events.map((event) => (
					<Card key={event.id} style={{
						marginBottom: GLOBAL_SPACING
					}} onPress={() => navigation.push('organizer/Event', {
            event_id: event.id,
          })}>
						<Card.Title title={event.name}
							titleStyle={{ fontWeight: 'bold', fontSize: 22 }}
							right={cardMenu}
						/>
						<Card.Content>
							<Text style={{ flexDirection: 'row', marginBottom: 5}}>
								<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Category: </Text>
								<Text>{event.category}</Text>
							</Text>
							<Text style={{ flexDirection: 'row', marginBottom: 5 }}>
								<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Description: </Text>
								<Text>{event.description}</Text>
							</Text>
							<Text style={{ flexDirection: 'row', marginBottom: 5 }}>
								<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Date: </Text>
								<Text>{event.date}</Text>
							</Text>
							<Text style={{ flexDirection: 'row', marginBottom: 5 }}>
								<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Time: </Text>
								<Text>{event.start_time} - {event.end_time}</Text>
							</Text>
							<Text style={{ flexDirection: 'row'}}>
								<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Price: </Text>
								<Text>{event.price}€</Text>
							</Text>
						</Card.Content>
					</Card>
				))}
			</ScrollView>

			<FAB icon='plus' size='medium' style={{
				position: 'absolute',
				margin: 16,
				right: 0,
				bottom: 0,
			}} onPress={() => navigation.push('organizer/EventCreation')}></FAB>
		</>
	);
}
