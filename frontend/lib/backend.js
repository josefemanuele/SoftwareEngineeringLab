import {
	doRequest,
	getCollection,
	addResource,
	getResource,
	modifyResource,
	removeResource
} from './rest.js';


/***** User backend *****/

export async function getUser(user_id) {
	return await getResource('user', '/user', user_id);
}

export async function addUser(user_data) {
	return await addResource('user', '/users', user_data);
}

export async function getSession(session_id) {
	return await getResource('user', '/session', session_id);
}

export async function addSession(email, password) {
	let response;

	try {
		response = await doRequest('user', 'POST', '/sessions', {
			email,
			password,
		}, true);
	} catch (err) {
		console.log(err);
		throw new Error('Network error');
	}

	switch (response.status) {
		case 401:
			throw new Error('Unauthorized');
		case 200:
			let data = await response.json();

			if ('session_id' in data) {
				return data.session_id;
			}
		default:
			throw new Error('Response error');
	}
}

export async function removeSession(session_id) {
	return await removeResource('user', '/session', session_id);
}


/***** Organization backend *****/

export async function getOrganizations(query) {
	return await getCollection('organization', '/organizations', query || {});
}

export async function getOrganization(org_id) {
	return await getResource('organization', '/organization', org_id);
}

export async function addOrganization(org_data) {
	return await addResource('organization', '/organizations', org_data);
}


/***** Event backend *****/

export async function getEvents(query) {
	return await getCollection('event', '/events', query || {});
}

export async function getEvent(event_id) {
	return await getResource('event', '/event', event_id);
}

export async function addEvent(event_data) {
	return await addResource('event', '/events', event_data);
}

export async function modifyEvent(id, event_data) {
	return await modifyResource('event', '/event', id, event_data);
}

export async function removeEvent(event_id) {
	return await removeResource('event', '/event', event_id);
}


/***** Reservation backend *****/

export async function getReservation(resv_id) {
	return await getResource('reservations', '/reservation', resv_id);
}

export async function getReservations(query) {
	let reservations = await getCollection('reservations', '/reservations', query || {});

	for (let reservation of reservations) {
		let eventData = await getEvent(reservation.event_id);
		reservation.event_data = eventData;
	}

	return reservations;
}

export async function addReservation(resv_data) {
	return await addResource('reservations', '/reservations', resv_data);
}

export async function removeReservation(resv_id) {
	return await removeResource('reservations', '/reservation', resv_id);
}


/***** Payment backend *****/

export async function getPayment(payment_id) {
	return await getResource('pay', '/payment', payment_id);
}

export async function addPayment(pay_data) {
	return await addResource('pay', '/payments', pay_data);
}


export default {
	getUser,
	addUser,

	getSession,
	addSession,
	removeSession,

	getOrganizations,
	getOrganization,
	addOrganization,

	getEvents,
	getEvent,
	addEvent,
	modifyEvent,
	removeEvent,

	getReservations,
	getReservation,
	addReservation,
	removeReservation,

	getPayment,
	addPayment,
};
