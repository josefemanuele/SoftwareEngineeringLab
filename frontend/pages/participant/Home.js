import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';

import { doRequest } from '../../lib/rest.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function Home({ navigation }) {
  let [ searchQuery, setSearchQuery ] = useState('');
  let [ organizations, setOrganizations ] = useState([]);

  let [ refreshing, setRefreshing ] = useState(false);

  async function doRefresh() {
    setRefreshing(true);

    let response;
    try {
      response = await doRequest('user', 'GET', '/organization', null);
    } catch (e) {
      // nothing
    }

    if (response != null) {
      setOrganizations(response);
    } else {
      console.log('Error fetching organization list')
    }

    setRefreshing(false);
  }

  useEffect(() => {
    doRefresh();
  }, []);

  let tempSQ = searchQuery.toLowerCase();

  organizations = organizations.filter(organization => (
    organization.name.toLowerCase().includes(tempSQ) ||
    organization.type.toLowerCase().includes(tempSQ) ||
    organization.description.toLowerCase().includes(tempSQ)
  ));

  return (
    <>
      <Searchbar placeholder="Search" style={{
        margin: GLOBAL_SPACING,
      }} onChangeText={setSearchQuery} value={searchQuery} />
      <ScrollView contentContainerStyle={[ style.box, {
        paddingVertical: 0,
      } ]} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
      }>
        {organizations.map((organization) => (
          <Card key={organization.id} style={{
						marginBottom: GLOBAL_SPACING
					}} onPress={() => navigation.push('participant/Organization', {
            id: organization.id
          })}>
            <Card.Title title={organization.name}
              titleStyle={{ fontWeight: 'bold' }}
            />
            <Card.Content>
            <View style={{ flexDirection: 'row', marginBottom: 5}}>
								<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Category: </Text>
								<Text>{organization.type}</Text>
							</View>
							<View style={{ flexDirection: 'row', marginBottom: 5 }}>
								<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Description: </Text>
								<Text>{organization.description}</Text>
							</View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}
