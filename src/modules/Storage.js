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

  login: (account, refreshToken, accessToken) => {
    if (account) {
      if (account.accountId) Storage.set("accountId", account.accountId);
      if (account.accountKey) Storage.set("accountKey", account.accountKey);
      if (account.humanName) Storage.set("humanName", account.humanName);
    }
    if (refreshToken) Storage.set("authUser", refreshToken);
    if (accessToken) Storage.set("refreshToken", accessToken);
  },

  logout: () => {
    Storage.remove("accountId");
    Storage.remove("accountKey");
    Storage.remove("humanName");

    Storage.remove("authUser");
    Storage.remove("refreshToken");

    window.location.href = "/home";
  },
};
