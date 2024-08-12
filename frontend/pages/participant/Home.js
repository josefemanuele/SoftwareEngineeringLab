import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';

import { doRequest } from '../../lib/rest.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

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
      <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
      }>
        {organizations.map((organization) => (
          <Card key={organization.id} style={style.card} onPress={() => navigation.push('participant/Organization', {
            id: organization.id
          })}>
            <Card.Title title={organization.name} subtitle={organization.type}
              titleStyle={{ fontWeight: 'bold' }}
            />
            <Card.Content>
              <Text>{organization.description}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}
