import React, { useEffect, useState } from 'react';

import { RefreshControl, ScrollView, View } from 'react-native';
import { Card, FAB, IconButton, Menu, Text } from 'react-native-paper';

import ThreeDotsMenu from '../../components/ThreeDotsMenu.js';
import FullDialog from '../../components/FullDialog.js';

import backend from '../../lib/backend.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function EventList({ navigation, route }) {
	let orgId = 1;

	let { params } = route;

	let [ orgInfo, setOrgInfo ] = useState({
		id: 0,
		name: '',
	});
  let [ events, setEvents ] = useState([]);

  let [ refreshing, setRefreshing ] = useState(false);
  let [ dialogVisible, setDialogVisible ] = useState(false);

  async function doRefresh() {
    setRefreshing(true);

		let tmp1 = await backend.getOrganizationById(orgId);
		let tmp2 = await backend.getEventsOfOrganization(orgId);

		setOrgInfo(tmp1);
		setEvents(tmp2);

    setRefreshing(false);
  }

  useEffect(() => {
    doRefresh();
  }, []);

	return (
		<>
			<Text variant="headlineMedium" style={[ style.box, {
				alignSelf: 'center', fontWeight: 'bold'
			} ]}>{orgInfo.name}</Text>

			<ScrollView contentContainerStyle={style.box} refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
			}>
				{events.map((event) => (
					<Card key={event.id} style={{
						marginBottom: GLOBAL_SPACING
					}} onPress={() => navigation.push('organizer/Event', {
						event_info: event,
          })}>
						<Card.Title title={event.name}
							titleStyle={{ fontWeight: 'bold', fontSize: 22 }}
							right={() => (
								<ThreeDotsMenu>
									<Menu.Item title="Modify event" leadingIcon="pencil" onPress={() => {
										navigation.push('organizer/EventModification', {
											event_info: event,
										});
									}} />
									<Menu.Item title="Cancel event" leadingIcon="close-circle-outline" onPress={() => setDialogVisible(event.id)} />
								</ThreeDotsMenu>
							)}
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

			<FullDialog
          title="Confirmation message"
          content={`Do you want to cancel the event?`}
          actions={[{
              name: 'Yes',
              callback: () => {
								let eventId = dialogVisible;
								setDialogVisible(false);
								await backend.removeEvent(eventId);
								doRefresh();
							}
          }, {
          	name: 'No',
              callback: () => setDialogVisible(false)
          }]}
          visible={!!dialogVisible}
          onDismiss={() => setDialogVisible(false)}
      />

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
