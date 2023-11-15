import React, { createContext, useEffect, useState } from "react";
import { Storage } from "../../modules/Storage";

export const AuthContext = createContext(false);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accountKey = Storage.get("accountKey");
    setIsAuthenticated(accountKey ? true : false);
  }, []);

  return <AuthContext.Provider value={isAuthenticated}>{children}</AuthContext.Provider>;
};
