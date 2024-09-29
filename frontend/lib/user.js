import backend from './backend.js';
import { doRequest } from './rest.js';
import state from './state.js';

export async function doLogin(email, password) {
  let session_id = await backend.addSession(email, password);

  state.setStore(s => ({
    ...s,
    userToken: session_id,
    userRole: 'participant',
  }));
}

export async function doLogout() {
  console.log('[DEBUG] Logging out');

  state.setStore(s => ({
    ...s,
    userToken: null,
    userRole: null,
  }));
}
