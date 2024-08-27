import React, { useEffect, useState } from 'react';

import { ScrollView, View } from 'react-native';
import { Text, Divider } from 'react-native-paper';

import { doRequest } from '../../lib/rest.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function Profile({ navigation, route }) {
	let { params } = route;

  let [ userInfo, setUserInfo ] = useState({
		name: 'Gino',
		surname: 'Rossi',
		email: 'prova@prova',
		password: 'ciao',
	});
  let [ refreshing, setRefreshing ] = useState(false);

  async function doRefresh() {
    setRefreshing(true);

		let response;

    try {
      response = await doRequest('user', 'GET', `/user/${partId}`, null);
    } catch (e) {
      // nothing
    }

    if (response != null) {
      setUserInfo(response);
    } else {
      console.log('Error fetching user')
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
			} ]}>Hi {userInfo.name}, this is your profile!</Text>

			<Divider style={[ style.spaceBottom ]}/>

			<View style={[ style.spaceBottom, { flexDirection: 'row' } ]}>
				<Text style={{fontWeight: "bold"}}>Email: </Text>
				<Text>{userInfo.email}</Text>
			</View>

			<View style={[ style.spaceBottom, { flexDirection: 'row' } ]}>
				<Text style={{fontWeight: "bold"}}>Password: </Text>
				<Text>{userInfo.password}</Text>
			</View>

			<View style={[ style.spaceBottom, { flexDirection: 'row' } ]}>
				<Text style={{fontWeight: "bold"}}>Name: </Text>
				<Text>{userInfo.name}</Text>
			</View>

			<View style={[ style.spaceBottom, { flexDirection: 'row' } ]}>
				<Text style={{fontWeight: "bold"}}>Surname: </Text>
				<Text>{userInfo.surname}</Text>
			</View>
		</ScrollView>
	);
}
