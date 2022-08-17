import "./App.less";
import "./Pages/Auth/styles/AuthForms.less";
import "./Pages/Onboarding/styles/DomainPresale.less";
import "./index.css";
import { config } from "./config";
import { overmind } from "./overmind";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <App overmind={overmind(config)} />,
  // <React.StrictMode>
  // </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
