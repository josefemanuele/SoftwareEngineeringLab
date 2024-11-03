import backend from './backend.js';
import state from './state.js';

export async function doLogin(email, password) {
  let authToken = await backend.addSession(email, password);
  let { user_id } = await backend.getSession(authToken);
  let user_info = await backend.getUser(user_id);

  let userRole = user_info.organizer ? 'organizer' : 'participant';

  let organizationId = 0;
  if (user_info.organizer) {
    let temp = await backend.getOrganizations({ owner_id: user_id });
    console.log(temp);

    if (temp.length != 1) {
      throw new Error('Unexpected situation');
    }

    organizationId = temp[0].id;
  }

  state.setStore(s => ({
    ...s,
    authToken,
    organizationId,
    userId: user_id,
    userRole,
  }));
}

export async function doLogout() {
  console.log('[DEBUG] Logging out');

  state.setStore(s => ({
    ...s,
    authToken: null,
    organizationId: 0,
    userId: 0,
    userRole: null,
  }));
}
