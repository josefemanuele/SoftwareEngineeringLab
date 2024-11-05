import { doLogout } from './user.js';
import state from './state.js';

import { API_BASE_URLS } from './constants.js';

export async function doRequest(service, method, endpoint, payload, unauthenticated) {
	if (!(service in API_BASE_URLS)) {
		throw new Error('Invalid service');
	}

  let url = API_BASE_URLS[service] + endpoint;

	let params = {
    method: method,
    headers: {
	    'Content-Type': 'application/json'
	  },
  };

  if (!unauthenticated) {
    let token = state.store.authToken;

    params.headers['Authorization'] = `Bearer ${token}`
  }

	if (payload) {
		params.body = JSON.stringify(payload);
	}

  let response = await fetch(url, params);

	if (response.status === 401) {
		doLogout();
	}

	return response;
}

export async function getCollection(service, prefix, query) {
	let response;

	let queryParts = [];
	for (let [ key, value ] of Object.entries(query)) {
		if (value == undefined || value == null) {
			continue;
		}

		queryParts.push(`${key}=${encodeURIComponent(value)}`);
	}
	let queryString = queryParts.join('&');

	try {
		response = await doRequest(service, 'GET', `${prefix}?${queryString}`);
	} catch (err) {
		console.log(err);
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

export async function addResource(service, prefix, data) {
	let response;

	try {
		response = await doRequest(service, 'POST', prefix, data);
	} catch (err) {
		console.log(err);
		throw new Error('Network error');
	}

	switch (response.status) {
		case 409:
			throw new Error('Resource exists');
		case 201:
			let data = await response.json();

			if ('id' in data) {
				return data.id;
			}
		default:
			throw new Error('Response error');
	}
}

export async function modifyResource(service, prefix, id, data) {
	let response;

	try {
		response = await doRequest(service, 'PUT', `${prefix}/${id}`, data);
	} catch (err) {
		console.log(err);
		throw new Error('Network error');
	}

	switch (response.status) {
		case 200:
			return;
		default:
			throw new Error('Response error');
	}
}

export async function getResource(service, prefix, id) {
	let response;

	try {
		response = await doRequest(service, 'GET', `${prefix}/${id}`);
	} catch (err) {
		console.log(err);
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

export async function removeResource(service, prefix, id) {
	let response;

	try {
		response = await doRequest(service, 'DELETE', `${prefix}/${id}`);
	} catch (err) {
		console.log(err);
		throw new Error('Network error');
	}

	switch (response.status) {
		case 200:
			return;
		default:
			throw new Error('Response error');
	}
}
