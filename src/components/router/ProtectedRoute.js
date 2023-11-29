import React from "react";
import { Storage } from "../../modules/Storage";
import { Route } from "react-router-dom";
import Login from "../../pages/Login";

export function ProtectedRoute({ path, ...rest }) {
  const isLogin = Storage.get("accountKey") ? true : false;
  const Component = isLogin ? rest.component : Login;

  return <Route {...rest} path={path} element={<Component />} />;
}
