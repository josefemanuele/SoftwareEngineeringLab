import { doRequest } from './rest.js';

import { save as storageSave } from './storage.js';

export async function doLogin(username, password) {
  let loginData = {
    username: username,
    password: password
  };

  let response = await doRequest('user', 'POST', '/token', loginData, true);
  console.log(response);
  if (response == null || !('token' in response)) {
    return false;
  }

  token = response.token;
  await storageSave('authToken', token);
  console.log('Login successful: token = ' + token);

  return true;
}
