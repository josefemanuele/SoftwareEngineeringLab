import React, { useState, useEffect }from 'react';

import { View } from 'react-native';
import { Button, Text, Icon } from 'react-native-paper';

import style from '../../style/custom.js';

export default function EventPage({ navigation, route }) {
	let params = route.params;

    let title = 'title'
    let description = 'description'
    let date = 'date'
    let start_time = 'start_time'
    let end_time = 'end_time'
    let price = 'price'
    let capacity = 30
    let reservations = 20

    let [ booking, setBooking ] = useState(true);


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



	return (
		<>
			<View style={ {alignSelf: 'center' }}>
                <Text style={[ style.spaceBottom, style.mt20 ]}>
                    <Icon source="format-title" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> title: </Text>
                    <Text variant="bodyLarge">{title}</Text>
                </Text>

                <Text style={[ style.spaceBottom ]}>
                    <Icon source="text-box" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> description: </Text>
                    <Text variant="bodyLarge">{description}</Text>
                </Text>

                <Text style={[ style.spaceBottom ]}>
                    <Icon source="calendar-text" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> date: </Text>
                    <Text variant="bodyLarge">{date}</Text>
                </Text>

                <Text style={[ style.spaceBottom ]}>
                    <Icon source="clock-time-four" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> Time: </Text>
                    <Text variant="bodyLarge">{start_time} - {end_time}</Text>
                </Text>

                <Text style={[ style.spaceBottom ]}>
                    <Icon source="currency-usd" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> price: </Text>
                    <Text variant="bodyLarge">{price}</Text>
                </Text>

                <Text style={[ style.spaceBottom ]}>
                    <Icon source="account-group-outline" size={20}/> 
                    <Text style={{fontWeight: "bold"}} variant='headlineSmall'> capacity: </Text>
                    <Text variant="bodyLarge">{reservations} / {capacity}</Text>
                </Text>

				<Button
					title="booking"
					icon="book-arrow-right-outline"
					mode="elevated"
					style={{ margin: 20 }}
                    disabled={!booking}
					onPress={() => navigation.push('participant/Payment')}
				>Book now!</Button>
            </View>		
		</>
	);
}
