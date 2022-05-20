import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./App.less";
import "./Pages/Auth/styles/AuthForms.less";
import "./Pages/DomainPresale/styles/DomainPresale.less";
import { overmind } from "./overmind";
import { config } from "./config";
ReactDOM.render(_jsx(App, { overmind: overmind(config) }), 
// <React.StrictMode>
// </React.StrictMode>,
document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//# sourceMappingURL=index.js.map