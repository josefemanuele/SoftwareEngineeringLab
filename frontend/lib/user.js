import backend from './backend.js';
import state from './state.js';

export async function doLogin(email, password) {
  let session_id = await backend.addSession(email, password);

  state.setStore(s => ({
    ...s,
    authToken: session_id,
    userId: 1,
    userRole: 'participant',
  }));
}

export async function doLogout() {
  console.log('[DEBUG] Logging out');

  state.setStore(s => ({
    ...s,
    authToken: null,
    userId: 0,
    userRole: null,
  }));
}
