let misc = {
  store: null,
  setStore: null,
};

export const DEFAULT_STATE = {
  userToken: null,
  userRole: null,
  theme: 'system',
};

export function loadState() {
  let storedState = {"userToken":"N2WxAvqeJ3Eap7qvhxVLSL5VFxc97UEpQnWSjGWDnwk=","userRole":"participant","theme":"system"};
  misc.setStore(s => ({
    ...s,
    ...storedState,
  }));
}

export default misc;
