"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originalLandingPath = void 0;
// import createBrowserHistory from 'history/createBrowserHistory'
var history_1 = require("history");
var customHistory = (0, history_1.createBrowserHistory)();
exports.default = customHistory;
exports.originalLandingPath = window.location.pathname;
//# sourceMappingURL=history.js.map