import { doRequest } from './rest.js';

import state from './state.js';

export async function doLogin(email, password) {
  let loginData = {
    email: email,
    password: password
  };

  let response = await doRequest('user', 'POST', '/token', loginData, true);

  if (response == null) {
    return false;
  }

  response = await response.json()

  if (!('token' in response)) {
    return false;
  }

  state.setStore(s => ({
    ...s,
    userToken: response.token,
    userRole: 'participant',
  }));

  return true;
}

export async function doRegistration(userData) {
  let response = await doRequest('user', 'POST', '/user', userData, true);

  if (!response) {
    return false;
  }

  return true;
}

export async function doLogout() {
  console.log('[DEBUG] Logging out');

  state.setStore(s => ({
    ...s,
    userToken: null,
    userRole: null,
  }));
}
