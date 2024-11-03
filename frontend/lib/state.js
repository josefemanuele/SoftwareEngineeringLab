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

export function loadState() {
  let storedState = {"authToken":611,"organizationId":0,"theme":"light","userId":1,"userRole":"participant"};
  // let storedState = {};

  misc.setStore(s => ({
    ...s,
    ...storedState,
  }));
}

export default misc;
