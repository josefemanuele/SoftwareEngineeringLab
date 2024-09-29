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
  return {
    userToken: null,
    userRole: null,
    theme: 'system',
  };
}

export default misc;
