"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.config = void 0;
// import { firebaseRequestToken, firebaseVerifyPhone, historyPush, logout, newlifeAuthorize, onInitializeOvermind, onRouteChange, routeAfterAuth, setBreadcrumbs, setFbUser, setPreloginRoute, wrapPromise } from './actions';
var config_1 = require("overmind/config");
var auth_1 = __importDefault(require("./auth"));
var routing_1 = __importDefault(require("./routing"));
var api_1 = __importDefault(require("./api"));
var firebase_1 = __importDefault(require("./firebase"));
var ux_1 = __importDefault(require("./ux"));
var flows_1 = __importDefault(require("./flows"));
var indicators_1 = __importDefault(require("./indicators"));
var websockets_1 = __importDefault(require("./websockets"));
var state_1 = __importDefault(require("./lists/state"));
var newcoin_1 = __importDefault(require("./newcoin"));
var chromeext_1 = __importDefault(require("./chromeext"));
var payments_1 = __importDefault(require("./payments"));
var evm_1 = __importDefault(require("./evm"));
// import configuration from './config';
var lodash_1 = require("lodash");
var core_1 = require("@newcoin-foundation/core");
// import { app } from "overmind/app";
// type AppType = typeof import("overmind/app").app;
// const custom = {};
var config = function (cfg) {
    return (0, config_1.namespaced)({
        indicators: indicators_1["default"],
        auth: auth_1["default"],
        routing: routing_1["default"],
        firebase: firebase_1["default"],
        websockets: websockets_1["default"],
        payments: payments_1["default"],
        evm: evm_1["default"],
        ux: ux_1["default"],
        chromeext: chromeext_1["default"],
        config: { state: (0, lodash_1.merge)({}, core_1.config, cfg) },
        api: api_1["default"],
        lists: state_1["default"],
        flows: flows_1["default"],
        newcoin: newcoin_1["default"]
    });
};
exports.config = config;
// export const xconfig = {
//     state,
//     effects: {
//         Firebase,
//         Api,
//         fetch
//     },
//     actions: {
//         onInitializeOvermind,
//         historyPush,
//         firebaseRequestToken,
//         firebaseVerifyPhone,
//         setFbUser,
//         routeAfterAuth,
//         setPreloginRoute,
//         setBreadcrumbs,
//         onRouteChange,
//         wrapPromise,
//         newlifeAuthorize,
//         logout
//     }
//  };
