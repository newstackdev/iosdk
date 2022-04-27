"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.originalLandingPath = void 0;
const createBrowserHistory_1 = __importDefault(require("history/createBrowserHistory"));
// import { createBrowserHistory } from "history";
const customHistory = (0, createBrowserHistory_1.default)();
exports.default = customHistory;
exports.originalLandingPath = window.location.pathname;
//# sourceMappingURL=history.js.map