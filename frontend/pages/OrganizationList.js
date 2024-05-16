import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';

export default function OrganizationList() {
  let [ searchQuery, setSearchQuery ] = useState('barber');
  let [ organizations, setOrganizations ] = useState([]);

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
        <Card>
          <Card.Title title={organization.title} subtitle={organization.subtitle} />
          <Card.Content>
            <Text>{organization.content}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}
