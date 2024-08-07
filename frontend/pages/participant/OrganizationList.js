import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';

import { doRequest } from '../../lib/rest.js';
import style from '../../style.js';

export default function OrganizationList() {
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
        <TouchableOpacity key={organization.index} onPress={() => handleCardPress(organization)}>
          <Card style={style.card}>
            <Card.Title title={organization.title} subtitle={organization.subtitle}
              titleStyle={{ fontWeight: 'bold' }}
            />
            <Card.Content>
              <Text>{organization.content}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </>
  );
}

const handleCardPress = (organization) => {
  console.log('Card clicked: ', organization.index);
};
