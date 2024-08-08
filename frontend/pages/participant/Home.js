import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';

import { doRequest } from '../../lib/rest.js';
import style from '../../style.js';

export default function Home({ navigation }) {
  let [ searchQuery, setSearchQuery ] = useState('barber');
  let [ organizations, setOrganizations ] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await doRequest('user', 'GET', '/organization', null);

      if (response != null) {
        setOrganizations(response);
      } else {
        console.log('Error fetching organization list')
      }
    })();
  }, []);

  return (
    <>
      <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />
      {organizations.map((organization) => (
        <Card key={organization.id} style={style.card} onPress={() => navigation.push('participant/Organization', {
          id: organization.id
        })}>
          <Card.Title title={organization.title} subtitle={organization.subtitle}
            titleStyle={{ fontWeight: 'bold' }}
          />
          <Card.Content>
            <Text>{organization.content}</Text>
          </Card.Content>
        </Card>
      ))}
    </>
  );
}
