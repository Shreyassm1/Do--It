import React from "react";
import ReactDOM from "react-dom/client"; // Use the new createRoot API
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import "./index.css";

// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
