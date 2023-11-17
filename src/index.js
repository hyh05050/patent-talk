import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { store } from "./store/index";
import "./style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();

Modal.setAppElement("#root");
