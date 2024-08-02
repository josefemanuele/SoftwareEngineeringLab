import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';

import { doRequest } from '../../lib/rest.js';

export default function OrganizationList() {
  let [ searchQuery, setSearchQuery ] = useState('barber');
  let [ organizations, setOrganizations ] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await doRequest('event', 'GET', '/organization', null);

      if (response != null) {
        setOrganizations(response);
      } else {
        console.log('Error fetching organization list')
      }
    })();
  }, []);

  return (
    <View>
      <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />
      {organizations.map((organization) => (
        <Card key={organization.key}>
          <Card.Title title={organization.title} subtitle={organization.subtitle} />
          <Card.Content>
            <Text>{organization.content}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}
