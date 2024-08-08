import { doRequest } from './rest.js';

import { save as storageSave, remove as storageRemove } from './storage.js';

// import { state, dispatch } from './state.js';

let misc = {};

export async function doLogin(email, password) {
  let loginData = {
    email: email,
    password: password
  };

  let response = await doRequest('user', 'POST', '/token', loginData, true);

  if (response == null || !('token' in response)) {
    return false;
  }

  console.log('[DEBUG] Logged in');

  userToken = response.token;

  await storageSave('userToken', userToken);
  misc.setLoggedIn(true);
  // dispatch({ type: 'SIGN_IN', token: userToken });

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

  // dispatch({ type: 'SIGN_OUT' });
  await storageRemove('userToken');
  misc.setLoggedIn(false);
}

export async function restoreToken() {
  let userToken = await storageLoad('userToken');

  if (userToken != null) {
    // dispatch({ type: 'SIGN_IN', token: userToken });
    misc.setLoggedIn(true);
  }
}

export default misc;
