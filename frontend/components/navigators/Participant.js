import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ParticipantBookingPersonalization from '../../pages/participant/BookingPersonalization.js';
import ParticipantBookingReview from '../../pages/participant/BookingReview.js';
import ParticipantEvent from '../../pages/participant/Event.js';
import ParticipantHome from '../../pages/participant/Home.js';
import ParticipantOrganization from '../../pages/participant/Organization.js';
import ParticipantPayment from '../../pages/participant/Payment.js';
import ParticipantProfile from '../../pages/participant/Profile.js';
import ParticipantReservations from '../../pages/participant/Reservations.js';

const Stack = createNativeStackNavigator();

export default function ParticipantStack({ home, header }) {
	return (
		<Stack.Navigator screenOptions={{ header: header }} initialRouteName={home}>
			<Stack.Group>
				<Stack.Screen name='participant/Home' component={ParticipantHome} options={{
					title: 'Browse'
				}}/>
				<Stack.Screen name='participant/Organization' component={ParticipantOrganization} options={{
					title: 'Organization'
				}}/>
				<Stack.Screen name='participant/Event' component={ParticipantEvent} options={{
					title: 'Event'
				}}/>
				<Stack.Screen name='participant/Profile' component={ParticipantProfile} options={{
				<Stack.Screen name='participant/BookingPersonalization' component={ParticipantBookingPersonalization} options={{
					title: 'Booking personalization'
				}}/>
				<Stack.Screen name='participant/BookingReview' component={ParticipantBookingReview} options={{
					title: 'Booking review'
				}}/>
				<Stack.Screen name='participant/Payment' component={ParticipantPayment} options={{
					title: 'Payment'
				}}/>

					title: 'Profile'
				}}/>
				<Stack.Screen name='participant/Reservations' component={ParticipantReservations} options={{
					title: 'Reservations'
				}}/>
			</Stack.Group>
		</Stack.Navigator>
	);
}
