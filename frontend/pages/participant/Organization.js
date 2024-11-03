import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Button, Card, Divider, Text, Avatar } from 'react-native-paper';

import backend from '../../lib/backend.js';

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

		let orgInfo = await backend.getOrganization(params.id);
		let orgEvents = await backend.getEvents({ organization_id: params.id });

		setInfo(orgInfo);
		setEvents(orgEvents);

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
						<Text style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Category: </Text>
              <Text>{info.category}</Text>
            </Text>
						<Text style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Info: </Text>
              <Text>{info.description}</Text>
            </Text>
					</Card.Content>
				</Card>

				<Divider style={[ style.spaceTop, style.spaceBottom ]} />

        {events.map((event) => (
          <Card key={event.id} style={{
						marginBottom: GLOBAL_SPACING,
					}}>
						<Card.Title title={event.title} titleStyle={{ fontWeight: 'bold', fontSize: 22 }} />
            <Card.Content>
							{/* <Text style={{ marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Category: </Text>
                <Text>{event.category}</Text>
              </Text> */}
							<Text style={{ marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Date: </Text>
                <Text>{event.date}</Text>
              </Text>
              <Text style={{ marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Time: </Text>
                <Text>{event.start_time} - {event.end_time}</Text>
              </Text>
							{/* <Text style={{ marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Location: </Text>
                <Text>{event.location}</Text>
              </Text> */}
							<Text style={{ marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Price: </Text>
                <Text>{event.price}€</Text>
              </Text>
              <Text style={{ marginBottom: 5 }}>
                <Text style={{ marginRight: 4, fontWeight: 'bold' }}>Description: </Text>
                <Text>{event.description}</Text>
              </Text>
            </Card.Content>
						<Card.Actions>
							<Button icon='eye' onPress={() => navigation.push('participant/Event', {
								organization_id: params.id,
		            event_id: event.id,
		          })}>View more</Button>
						</Card.Actions>
          </Card>
        ))}
      </ScrollView>
  );
}
