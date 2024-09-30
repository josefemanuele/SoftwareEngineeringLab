import React, { useEffect, useState } from 'react';

import { ScrollView, View } from 'react-native';
import { Text, Divider, Icon } from 'react-native-paper';

import backend from '../../lib/backend.js';
import state from '../../lib/state.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function Profile({ navigation, route }) {
	let { params } = route;

	let orgId = state.store.organizationId;

  let [ organizationInfo, setOrganizationInfo ] = useState({
		name: '',
		category: '',
		description: '',
	});
  let [ refreshing, setRefreshing ] = useState(false);

  async function doRefresh() {
    setRefreshing(true);

		let response;

		try {
			response = await backend.getOrganization(orgId);

			setOrganizationInfo(response);
		} catch (err) {
			console.log(err);
		}

    setRefreshing(false);
  }

  useEffect(() => {
    doRefresh();
  }, []);

	return (
		<ScrollView contentContainerStyle={style.box} style={bsStyles.container} dataSet={{ media: bsIds.container }}>
			<View style={{ alignSelf: 'center', marginBottom: 25 }}>
				<Icon source='factory' size={75}></Icon>
			</View>

			<Text variant="headlineMedium" style={[ style.box, {
				alignSelf: 'center',
			} ]}>Hi {organizationInfo.name}, this is your profile!</Text>

			<Divider style={[ style.spaceBottom ]}/>

			<Text style={[ style.spaceBottom ]}>
				<Text style={{fontWeight: "bold"}}>Name: </Text>
				<Text>{organizationInfo.name}</Text>
			</Text>

			<Text style={[ style.spaceBottom ]}>
				<Text style={{fontWeight: "bold"}}>Category: </Text>
				<Text>{organizationInfo.category}</Text>
			</Text>

			<Text style={[ style.spaceBottom ]}>
				<Text style={{fontWeight: "bold"}}>Description: </Text>
				<Text>{organizationInfo.description}</Text>
			</Text>
		</ScrollView>
	);
}
