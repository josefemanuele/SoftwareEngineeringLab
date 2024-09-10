import { load as storageLoad } from './storage.js';

import { API_BASE_URLS } from './constants.js';

export async function doRequest(service, method, endpoint, payload, unauthenticated) {
	if (!(service in API_BASE_URLS)) {
		throw new Exception('Invalid service');
	}

  let url = API_BASE_URLS[service] + endpoint;

	let params = {
    method: method,
    headers: {
	    'Content-Type': 'application/json'
	  },
  };

  if (!unauthenticated) {
    let token = await storageLoad('authToken');
    params.headers['Authorization'] = `Bearer ${token}`
  }

	if (payload) {
		params.body = JSON.stringify(payload);
	}

  let response = await fetch(url, params);

	return response;
}
