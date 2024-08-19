import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';

import { doRequest } from '../../lib/rest.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function Profile({ navigation, route }) {
    let part_name = 'Gino';

	let { params } = route;

  let [ part_spec ] = useState([]);

  let [ setRefreshing ] = useState(false);

  async function doRefresh() {
    setRefreshing(true);

		let response;

    try {
      response = await doRequest('event', 'GET', `/user/${partId}`, null);
    } catch (e) {
      // nothing
    }

    if (response != null) {
      part_spec(response);
    } else {
      console.log('Error fetching participant')
    }

    setRefreshing(false);
  }

  useEffect(() => {
    doRefresh();
  }, []);

	return (
		<>
			<Text variant="headlineMedium" style={[ style.box, {
				alignSelf: 'center',
			} ]}>Hi {part_name}, this is your profile!</Text>

            <Divider />

            <View>
                <Text>
                    <Text style={{fontWeight: "bold"}}> Email: </Text>
                    <Text> {part_name.email}</Text>
                </Text>
                <Text>
                    <Text style={{fontWeight: "bold"}}> Password: </Text>
                    <Text> {part_name.password}</Text>
                </Text>
                <Text>
                    <Text style={{fontWeight: "bold"}}> Name: </Text>
                    <Text> {part_name.nome}</Text>
                </Text>
                <Text>
                    <Text style={{fontWeight: "bold"}}> Surname: </Text>
                    <Text> {part_name.cognome}</Text>
                </Text>
            </View>

		</>
	);
}
