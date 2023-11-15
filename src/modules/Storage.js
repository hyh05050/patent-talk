export const Storage = {
  set: (key, value) => {
    window.localStorage.setItem(key, String(value));
  },

  setJson: (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  get: (key) => {
    return window.localStorage.getItem(key);
  },

  remove: (key) => {
    window.localStorage.removeItem(key);
  },
};
