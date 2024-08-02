import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity} from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';

import style from '../style.js';

export default function OrganizationList() {
  let [ searchQuery, setSearchQuery ] = useState('Barber shop');
  let [ organizations, setOrganizations ] = useState(
    [
     {
       index: 1,
       title: 'Barber shop',
       subtitle: 'Subtitle',
       content: 'Description',
     },
     {
       index: 2,
       title: 'Lawyer',
       subtitle: 'Subtitle',
       content: 'Description',
     },
     {
       index: 3,
       title: 'Dance school',
       subtitle: 'Subtitle',
       content: 'Description',
     }
  ]);

  const handleCardPress = (organization) => {
    console.log('Card clicked: ', organization.index);
  };

  useEffect(async () => {
    let response = await fetch('http://localhost:5000/organization', {
      method: 'POST',
      headers: {
        /* 'Authorization': 'Bearer <TOKEN>', */
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (response.status === 200) {
      // [
      //   {
      //     title: 'Barber shop',
      //     subtitle: 'Subtitle',
      //     content: 'Description',
      //   },
      //   {
      //     title: 'Lawyer',
      //     subtitle: 'Subtitle',
      //     content: 'Description',
      //   },
      //   {
      //     title: 'Dance school',
      //     subtitle: 'Subtitle',
      //     content: 'Description',
      //   }
      // ]
      setOrganizations(response.json());
    } else {
      console.log('Errore fetch organizzazione')
    }
  }, []);

  return (
    <View>
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
    </View>
  );
}
