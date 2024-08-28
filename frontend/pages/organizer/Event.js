import React, { useState, useEffect }from 'react';

import FullDialog from '../../components/FullDialog.js';

import { View, ScrollView } from 'react-native';
import { Button, Text, Icon } from 'react-native-paper';

import { ids as bsIds, styles as bsStyles } from '../../style/bootstrap.js';
import style from '../../style/custom.js';

export default function EventPage({ navigation, route }) {
	let params = route.params;
    let [ dialogVisible, setDialogVisible ] = useState(false);

    let [ eventInfo, setEventInfo ] = useState({
		"id": 1,
		"name": "Summer Vibes Festival",
		"location": "Central Park, New York City",
		"date": "July 15, 2024",
		"start_time": "5:00 PM",
		"end_time": "10:00 PM",
		"category": "Festival",
		"price": 50,
		"description": "Join us for a night filled with sunshine, music, and good vibes featuring top local bands.",
		"capacity": 5000,
		"reservations": 0,
	});

    let [ cancel, setCancel ] = useState(true);
    
    const checkCancel = (value) => {
        if (value >= 1) { 
          setCancel(false);
        } else {
          setCancel(true);
        }
    };

    useEffect(() => {
        checkCancel(eventInfo.reservations);
    }, [eventInfo.reservations]);


	return (
        <ScrollView contentContainerStyle={style.box} style={[ bsStyles.container ]} dataSet={{ media: bsIds.container }}>            
            <Text style={[ style.spaceBottom ]}>
                <Icon source="tag" size={20} />
                <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Category: </Text>
                <Text variant="bodyLarge">{eventInfo.category}</Text>
            </Text>

            <Text style={[ style.spaceBottom ]}>
                <Icon source="calendar-text" size={20} />
                <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Date: </Text>
                <Text variant="bodyLarge">{eventInfo.date}</Text>
            </Text>

            <Text style={[ style.spaceBottom ]}>
                <Icon source="clock-time-four" size={20} />
                <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Time: </Text>
                <Text variant="bodyLarge">{eventInfo.start_time} - {eventInfo.end_time}</Text>
            </Text>

            <Text style={[ style.spaceBottom ]}>
                <Icon source="currency-usd" size={20} />
                <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Price: </Text>
                <Text variant="bodyLarge">{eventInfo.price} €</Text>
            </Text>

            <Text style={[ style.spaceBottom ]}>
                <Icon source="account-group-outline" size={20} />
                <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Capacity: </Text>
                <Text variant="bodyLarge">{eventInfo.capacity}</Text>
            </Text>

            <Text style={[ style.spaceBottom ]}>
                <Icon source="account-group-outline" size={20} />
                <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Actual reservations: </Text>
                <Text variant="bodyLarge">{eventInfo.reservations}</Text>
            </Text>

            <Text style={[ style.spaceBottom ]}>
                <Icon source="text-box" size={20} />
                <Text style={{ fontWeight: 'bold', marginLeft: 20 }} variant='bodyLarge'>Description: </Text>
                <Text style={{ marginLeft: 20 }}>{eventInfo.description}</Text>
            </Text>

			<View style ={{flexDirection: 'row', justifyContent: "center"}}>
                    <Button
                        title="modify"
                        icon="pencil"
                        mode="elevated"
                        style={{ margin: 20 }}
                        onPress={() => navigation.push('organizer/EventModification')}>Modify</Button>
                    <Button
                        title="cancel"
                        icon="close-circle-outline"
                        mode="elevated"
                        style={{ margin: 20 }}
                        disabled={!cancel}
                        onPress={() => setDialogVisible(true)}>Cancel</Button>

                    <FullDialog
                        title="Confirmation message"
                        content={`Do you want to cancel the event?`}    
                        actions={[{
                            name: 'Yes',
                            callback: () => {setDialogVisible(false), navigation.push('organizer/EventList')}
                        }, {
                            name: 'No',
                            callback: () => {setDialogVisible(false)}
                        }]}
                        visible={dialogVisible}
                        onDismiss={() => setDialogVisible(false)}
                    />
            </View>                
         </ScrollView>
	);
}