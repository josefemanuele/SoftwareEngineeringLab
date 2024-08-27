import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Button, Card, Divider, Text, Avatar } from 'react-native-paper';

import { doRequest } from '../../lib/rest.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function Organization({ navigation, route }) {
	let { params } = route;

  let [ events, setEvents ] = useState([]);
	let [ info, setInfo ] = useState({
		name: '',
		category: '',
		description: '',
	});

  let [ refreshing, setRefreshing ] = useState(false);

  async function doRefresh() {
    setRefreshing(true);

		let response;

    // try {
    //   response = await doRequest('user', 'GET', `/organization/${params.id}`, null);
    // } catch (e) {
    //   // nothing
    // }
		//
		// if (response != null) {
    //   setInfo(response);
    // } else {
    //   console.log('Error fetching organization info')
    // }

    try {
      response = await doRequest('event', 'GET', `/organization/${params.id}/event`, null);
    } catch (e) {
      // nothing
    }

    if (response != null) {
			setInfo({
				name: 'Adventure Explorers Outdoor Gear Rentals',
				category: 'Outdoor Equipment Rental',
				description: 'A rental service for outdoor gear, including camping, hiking, and water sports equipment, perfect for adventure enthusiasts looking to explore nature',
			})
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
      <ScrollView contentContainerStyle={style.box} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
      }>
				<Card key="details">
					<Card.Title  left={(props) => <Avatar.Icon {...props} icon="store" />} title={info.name} titleVariant="headlineSmall" titleStyle={{ fontWeight: 'bold' }} />
					<Card.Content>
						<Text style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Category: </Text>
              {info.category}
            </Text>
						<Text>
              <Text style={{ fontWeight: 'bold' }}>Info: </Text>
              {info.description}
            </Text>
					</Card.Content>
					{/* <Card.Actions>
						<Button>Prenota</Button>
					</Card.Actions> */}
				</Card>

				<Divider style={[ style.spaceTop, style.spaceBottom ]} />

        {events.map((event) => (
          <Card key={event.id} style={{
						marginBottom: GLOBAL_SPACING,
					}}>
            <Card.Title title={event.name} subtitle={event.category}
              titleStyle={{ fontWeight: 'bold' }}
            />
            <Card.Content>
              <Text>{event.description}</Text>
            </Card.Content>
						<Card.Actions>
							<Button onPress={() => navigation.push('participant/Event', {
								organization_id: params.id,
		            event_id: event.id,
		          })}>View more</Button>
						</Card.Actions>
          </Card>
        ))}
      </ScrollView>
  );
}
