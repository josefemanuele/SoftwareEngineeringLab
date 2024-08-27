import React, { useState, useEffect }from 'react';

import FullDialog from '../../components/FullDialog.js';

import { View } from 'react-native';
import { Button, Text, Icon } from 'react-native-paper';

import style from '../../style/custom.js';

export default function EventPage({ navigation, route }) {
	let params = route.params;
    let [ dialogVisible, setDialogVisible ] = useState(false);

    let title = 'title'
    let description = 'description'
    let date = 'date'
    let start_time = 'start_time'
    let end_time = 'end_time'
    let price = 'price'
    let capacity = 30
    let reservations = 20

    let [ booking, setBooking ] = useState(true);
    let [ cancel, setCancel ] = useState(true);



    const checkAvailability = (value) => {
        if (value === capacity) { 
          setBooking(false);
        } else {
          setBooking(true);
        }
    };

    useEffect(() => {
        checkAvailability(reservations);
    }, [reservations]);
    
    const checkCancel = (value) => {
        if (value >= 1) { 
          setCancel(false);
        } else {
          setCancel(true);
        }
    };

    useEffect(() => {
        checkCancel(reservations);
    }, [reservations]);


	return (
		<>
			<View style={ {alignSelf: 'center' }}>
                <Text style={[ style.spaceBottom, style.mt20 ]}>
                    <Icon source="format-title" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> Title: </Text>
                    <Text variant="bodyLarge">{title}</Text>
                </Text>

                <Text style={[ style.spaceBottom ]}>
                    <Icon source="text-box" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> Description: </Text>
                    <Text variant="bodyLarge">{description}</Text>
                </Text>

                <Text style={[ style.spaceBottom ]}>
                    <Icon source="calendar-text" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> Date: </Text>
                    <Text variant="bodyLarge">{date}</Text>
                </Text>

                <Text style={[ style.spaceBottom ]}>
                    <Icon source="clock-time-four" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> Time: </Text>
                    <Text variant="bodyLarge">{start_time} - {end_time}</Text>
                </Text>

                <Text style={[ style.spaceBottom ]}>
                    <Icon source="currency-usd" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> Price: </Text>
                    <Text variant="bodyLarge">{price}€</Text>
                </Text>

                <Text style={[ style.spaceBottom ]}>
                    <Icon source="account-group-outline" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> Actual reservations: </Text>
                    <Text variant="bodyLarge">{reservations} / {capacity}</Text>
                </Text>
				<View style ={{flexDirection: 'row'}}>
                    <Button
                        title="modify"
                        icon="pencil"
                        mode="elevated"
                        style={{ margin: 20 }}
                        disabled={!booking}
                        onPress={() => console.log('modify event')}
                    >Modify</Button>
                    <Button
                        title="cancel"
                        icon="close-circle-outline"
                        mode="elevated"
                        style={{ margin: 20 }}
                        disabled={!cancel}
                        onPress={() => console.log('cancel event')}
                    >Cancel</Button>
                    
                    <FullDialog /* TODO */
                        title="Confirmation message"
                        content={`Do you want to cancel the event?`}
                        actions={[{
                            name: 'Yes',
                            callback: () => setDialogVisible(false)
                        }]}
                        visible={dialogVisible}
                        onDismiss={() => setDialogVisible(false)}
                    />
                </View>                
            </View>		
		</>
	);
}
