import axios from "axios";

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

  getAccessToken: () => {
    return window.localStorage.getItem("authToken");
  },

  doRefreshAccessToken: async () => {
    const refreshToken = Storage.get("refreshToken");
    if (!refreshToken) {
      return false;
    }
    return await axios.post("https://indieip.startlump.com/api/refresh", {
      refreshToken: refreshToken,
    });
  },

  checkAccessToken: async () => {
    const accessToken = Storage.get("authToken");
    if (!accessToken) {
      return -1;
    }
    const response = await axios.post("https://indieip.startlump.com/api/accessTokenTouch", {
      accessToken: accessToken,
    });
    return response.data.status == "success" ? true : false;
  },

  remove: (key) => {
    window.localStorage.removeItem(key);
  },

  login: (account, refreshToken, accessToken) => {
    if (account) {
      if (account.accountId) Storage.set("accountId", account.accountId);
      if (account.accountKey) Storage.set("accountKey", account.accountKey);
      if (account.humanName) Storage.set("humanName", account.humanName);
      if (account.roles) Storage.set("role", account.roles);
      if (account.agentNo) Storage.set("agentNo", account.agentNo);
    }
    if (refreshToken) Storage.set("refreshToken", refreshToken);
    if (accessToken) Storage.set("authToken", accessToken);
  },

  logout: () => {
    Storage.remove("accountId");
    Storage.remove("accountKey");
    Storage.remove("humanName");

    Storage.remove("authUser");
    Storage.remove("refreshToken");
    Storage.remove("authToken");

    window.location.href = "/home";
  },
};
