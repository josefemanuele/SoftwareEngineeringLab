import React, { useEffect, useState } from 'react';

import { ScrollView, View } from 'react-native';
import { Text, Divider, Icon } from 'react-native-paper';

import backend from '../../lib/backend.js';
import state from '../../lib/state.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function Profile({ navigation, route }) {
	let { params } = route;

	let userId = state.store.userId;

  let [ userInfo, setUserInfo ] = useState({
		name: '',
		surname: '',
		email: '',
		password: '',
	});
  let [ refreshing, setRefreshing ] = useState(false);

  async function doRefresh() {
    setRefreshing(true);

		let response;

		try {
			response = await backend.getUser(userId);

			setUserInfo(response);
		} catch (err) {
			console.log(err);

			// switch (err.message) {
			// 	case 'Network error':
			// 	case 'Response error':
			// 		setLoginError('network');
			// 		break;
			// 	case 'Unauthorized':
			// 		setLoginError('invalid');
			// 		break;
			// }
		}

    setRefreshing(false);
  }

  useEffect(() => {
    doRefresh();
  }, []);

	return (
		<ScrollView contentContainerStyle={style.box} style={bsStyles.container} dataSet={{ media: bsIds.container }}>
			<View style={{ alignSelf: 'center', marginBottom: 25 }}>
				<Icon source='account' size={75}></Icon>
			</View>

			<Text variant="headlineMedium" style={[ style.box, {
				alignSelf: 'center',
			} ]}>Hi {userInfo.name}, this is your profile!</Text>

			<Divider style={[ style.spaceBottom ]}/>

			<Text style={[ style.spaceBottom ]}>
				<Text style={{fontWeight: "bold"}}>Email: </Text>
				<Text>{userInfo.email}</Text>
			</Text>

			<Text style={[ style.spaceBottom ]}>
				<Text style={{fontWeight: "bold"}}>Password: </Text>
				<Text>{userInfo.password}</Text>
			</Text>

			<Text style={[ style.spaceBottom ]}>
				<Text style={{fontWeight: "bold"}}>Name: </Text>
				<Text>{userInfo.name}</Text>
			</Text>

			<Text style={[ style.spaceBottom ]}>
				<Text style={{fontWeight: "bold"}}>Surname: </Text>
				<Text>{userInfo.surname}</Text>
			</Text>
		</ScrollView>
	);
}
