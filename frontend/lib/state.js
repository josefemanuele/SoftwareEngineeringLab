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
  let storedState = {"authToken":"N2WxAvqeJ3Eap7qvhxVLSL5VFxc97UEpQnWSjGWDnwk=","organizationId":0,"theme":"dark","userId":1,"userRole":"organizer"};

  misc.setStore(s => ({
    ...s,
    ...storedState,
  }));
}

export default misc;
