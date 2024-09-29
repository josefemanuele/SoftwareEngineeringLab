import { doRequest } from './rest.js';

export async function getUser(user_id) {
	let response;

	try {
		response = await doRequest('user', 'GET', `/user/${user_id}`);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 200:
			let data = await response.json();

			return data;
		case 404:
			throw new Error('Not found');
		default:
			throw new Error('Response error');
	}
}


// COMBAK: return user id
export async function addUser(user_data) {
	let response;

	try {
		response = await doRequest('user', 'POST', '/user', user_data);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 204:
			return;
		case 401:
			throw new Error('Unauthorized');
		default:
			throw new Error('Response error');
	}
}


export async function getSession(session_id) {
	let response;

	try {
		response = await doRequest('user', 'GET', `/session/${session_id}`);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 204:
			return;
		case 404:
			throw new Error('Not found');
		default:
			throw new Error('Response error');
	}
}

export async function addSession(email, password) {
	let response;

	try {
		response = await doRequest('user', 'POST', '/sessions', {
			email,
			password,
		}, true);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 401:
			throw new Error('Unauthorized');
		case 200:
			let data = await response.json();

			if ('session_id' in response) {
				let session_id = data.session_id;
				return session_id;
			}
		default:
			throw new Error('Response error');
	}
}

export async function removeSession(session_id) {
	let response;

	try {
		response = await doRequest('user', 'DELETE', `/session/${session_id}`);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 204:
			return;
		default:
			throw new Error('Response error');
	}
}


export async function getOrganizations(category) {
	let query = category ? `?category=${category}` : '';
	let response;

	try {
		response = await doRequest('organization', 'GET', `/organizations` + query);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 200:
			let data = await response.json();

			return data;
		case 404:
			throw new Error('Not found');
		default:
			throw new Error('Response error');
	}
}

export async function getOrganizationById(org_id) {
	let response;

	try {
		response = await doRequest('organization', 'GET', `/organization/${org_id}`);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 200:
			let data = await response.json();

			return data;
		case 404:
			throw new Error('Not found');
		default:
			throw new Error('Response error');
	}
}

export async function addOrganization(org_data) {
	let response;

	try {
		response = await doRequest('organization', 'POST', '/organizations', org_data);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 204:
			return;
		case 401:
			throw new Error('Unauthorized');
		default:
			throw new Error('Response error');
	}
}


export async function getEvents(org_id) {
	let query = org_id ? `?organization_id=${org_id}` : '';
	let response;

	try {
		response = await doRequest('event', 'GET', `/events` + query);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 200:
			let data = await response.json();

			return data;
		case 404:
			throw new Error('Not found');
		default:
			throw new Error('Response error');
	}
}

export async function getEventById(event_id) {
	let response;

	try {
		response = await doRequest('event', 'GET', `/event/${event_id}`);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 200:
			let data = await response.json();

			return data;
		case 404:
			throw new Error('Not found');
		default:
			throw new Error('Response error');
	}
}

// COMBAK: return event id
export async function addEvent(event_data) {
	let response;

	try {
		response = await doRequest('event', 'POST', '/events', event_data);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 204:
			return;
		case 401:
			throw new Error('Unauthorized');
		default:
			throw new Error('Response error');
	}
}

// TODO: write function
export async function modifyEvent(id, event_data) {
	return;
}

export async function removeEvent(event_id) {
	let response;

	try {
		response = await doRequest('event', 'DELETE', `/event/${event_id}`);
	} catch (err) {
		throw new Error('Network error');
	}

	switch (response.status) {
		case 204:
			return;
		default:
			throw new Error('Response error');
	}
}


export async function getReservationById(resv_id) {
}

export async function getReservationsOfUser(user_id) {
}

export async function addReservation(event_id, booking_data, payment_data) {
}

export async function removeReservation(resv_id) {
}


export async function getPayment() {
}

export async function addPayment() {
}


export default {
	getUser,
	addUser,

	getSession,
	addSession,
	removeSession,

	getOrganizations,
	getOrganizationById,
	addOrganization,

	getEventById,
	getEventsOfOrganization,
	addEvent,
	modifyEvent,
	removeEvent,

	getReservationById,
	getReservationsOfUser,
	addReservation,
	removeReservation,

	getPayment,
	addPayment,
};
