import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';

import { doRequest } from '../../lib/rest.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function Organization({ navigation, route }) {
	let { params } = route;

  let [ events, setEvents ] = useState([]);

  let [ refreshing, setRefreshing ] = useState(false);

  async function doRefresh() {
    setRefreshing(true);

    let response;
    try {
      response = await doRequest('event', 'GET', `/organization/${params.id}/event`, null);
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
				<Card key="details" style={style.card}>
					<Card.Title title='Details' titleStyle={{ fontWeight: 'bold' }} />
					<Card.Content>
						<Text>
							Description: prova
						</Text>
					</Card.Content>
					{/* <Card.Actions>
						<Button>Prenota</Button>
					</Card.Actions> */}
				</Card>

				<Divider style={[ style.mt20, style.mb20 ]} />

        {events.map((event) => (
          <Card key={event.id} style={style.card} onPress={() => navigation.push('participant/Event', {
						organization_id: params.id,
            event_id: event.id,
          })}>
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
    </>
  );
}
