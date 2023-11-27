import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { store } from "./store/index";
import "./style.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="1009040634997-4h545h3htq3csa2bqmn09oo3b43d3q22.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);

reportWebVitals();

Modal.setAppElement("#root");
