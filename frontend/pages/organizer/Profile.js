import React, { useState } from 'react';

import { ScrollView } from 'react-native';
import { Text, Divider } from 'react-native-paper';

import { doRequest } from '../../lib/rest.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function Profile({ navigation, route }) {
	let { params } = route;

  let [ organizationInfo, setorganizationInfo ] = useState({
	name: 'Melody Events Group',
	category: 'Music Event Management and Production',
	description: 'Melody Events Group is a dynamic event planning organization dedicated to curating a diverse array of live music experiences that celebrate various genres and seasonal festivals',
	});
  let [ refreshing, setRefreshing ] = useState(false);

  async function doRefresh() {
    setRefreshing(true);

		let response;

    try {
      response = await doRequest('organization', 'GET', `/organization/${id}`, null);
    } catch (e) {
      // nothing
    }

    if (response != null) {
      setorganizationInfo(response);
    } else {
      console.log('Error fetching organization')
    }

    setRefreshing(false);
  }

  // useEffect(() => {
  //   doRefresh();
  // }, []);

	return (
		<ScrollView contentContainerStyle={style.box} style={bsStyles.container} dataSet={{ media: bsIds.container }}>
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
