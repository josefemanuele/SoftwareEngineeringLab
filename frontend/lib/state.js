import { load as storageLoad, save as storageSave } from './storage.js';

let misc = {
  store: null,
  setStore: null,
};

export const DEFAULT_STATE = {
  authToken: null,
  organizationId: 0,
  theme: 'system',
  userId: 0,
  userRole: null,
};

export async function loadState() {
  // let storedState = {"authToken":611,"organizationId":0,"theme":"system","userId":1,"userRole":"participant"};
  let storedState = await storageLoad('state');
  storedState = !!storedState ? JSON.parse(storedState) : {};

  misc.setStore(s => ({
    ...s,
    ...storedState,
  }));
}

export default misc;
