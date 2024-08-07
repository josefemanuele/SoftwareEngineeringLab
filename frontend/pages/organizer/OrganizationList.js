import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import OrganizerEvents from '../../components/OrganizerEvents.js';
import OrganizerSurveys from '../../components/OrganizerSurveys.js';

import { doRequest } from '../../lib/rest.js';
import style from '../../style.js';

const Tab = createMaterialBottomTabNavigator();

// screenOptions={({ route }) => ({
//   tabBarIcon: () => {
//     let icon;
//     if (route.name === 'OrganizationList') {
//       icon = '🏢';
//     } else if (route.name === 'Login') {
//       icon = '🔑';
//     } else if (route.name === 'Registration') {
//       icon = '📝';
//     }
//     return <Text>{icon}</Text>;
//   }
// })}

export default function OrganizationList() {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Events"  component={OrganizerEvents} options={{
          tabBarIcon: 'calendar',
        }} />
        <Tab.Screen name="Surveys" component={OrganizerSurveys} options={{
          tabBarIcon: 'playlist-check',
        }} />
      </Tab.Navigator>
    </>
  );
}

const handleCardPress = (organization) => {
  console.log('Card clicked: ', organization.index);
};
