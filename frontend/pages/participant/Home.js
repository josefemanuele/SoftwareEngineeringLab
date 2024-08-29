import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';

import backend from '../../lib/backend.js';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style, { GLOBAL_SPACING } from '../../style/custom.js';

export default function Home({ navigation }) {
  let [ searchQuery, setSearchQuery ] = useState('');
  let [ organizations, setOrganizations ] = useState([]);

  let [ refreshing, setRefreshing ] = useState(false);

  async function doRefresh() {
    setRefreshing(true);

    let orgs = backend.getOrganizations();
    setOrganizations(orgs);

    setRefreshing(false);
  }

  useEffect(() => {
    doRefresh();
  }, []);

  let tempSQ = searchQuery.toLowerCase();

  organizations = organizations.filter(organization => (
    organization.name.toLowerCase().includes(tempSQ) ||
    organization.category.toLowerCase().includes(tempSQ) ||
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
            <Text style={{ flexDirection: 'row', marginBottom: 5}}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Category: </Text>
							<Text>{organization.category}</Text>
						</Text>
						<Text style={{ flexDirection: 'row', marginBottom: 5 }}>
							<Text style={{ marginRight: 4, fontWeight: 'bold' }}>Description: </Text>
							<Text>{organization.description}</Text>
						</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}
