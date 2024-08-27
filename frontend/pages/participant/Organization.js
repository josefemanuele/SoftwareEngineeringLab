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
					<Card.Title
						title={info.name}
						titleVariant="headlineSmall"
						titleStyle={{ fontWeight: 'bold' }}
						left={(props) => <Avatar.Icon {...props} icon="store" />}
					/>
					<Card.Content>
						<View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Category: </Text>
              <Text>{info.category}</Text>
            </View>
						<View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Info: </Text>
              <Text>{info.description}</Text>
            </View>
					</Card.Content>
				</Card>

				<Divider style={[ style.spaceTop, style.spaceBottom ]} />

        {events.map((event) => (
          <Card key={event.id} style={{
						marginBottom: GLOBAL_SPACING,
					}}>
            <Card.Title title={event.name} titleStyle={{ fontWeight: 'bold', fontSize: 22 }} />
            <Card.Content>
							<View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Category: </Text>
                <Text>{event.category}</Text>
              </View>
							<View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Date: </Text>
                <Text>{event.date}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Time: </Text>
                <Text>{event.start_time} - {event.end_time}</Text>
              </View>
							<View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Location: </Text>
                <Text>{event.location}</Text>
              </View>
							<View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Price: </Text>
                <Text>{event.price}€</Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Description: </Text>
                <Text>{event.description}</Text>
              </View>
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
