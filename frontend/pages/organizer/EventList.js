import React, { useEffect, useState } from 'react';

import { RefreshControl, ScrollView } from 'react-native';
import { Card, FAB, Text } from 'react-native-paper';

import { doRequest } from '../../lib/rest.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function EventList({ navigation, route }) {
	let orgId = 123;

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

	return (
		<>
			<ScrollView refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
			}>
				{events.map((event) => (
					<Card key={event.id} style={style.card}>
						<Card.Title title={event.name} subtitle={event.category}
							titleStyle={{ fontWeight: 'bold' }}
						/>
						<Card.Content>
							<Text>{event.description}</Text>
						</Card.Content>
						{/* <Card.Actions>
							<Button>Prenota</Button>
						</Card.Actions> */}
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
