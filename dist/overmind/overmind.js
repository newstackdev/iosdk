"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// import { firebaseRequestToken, firebaseVerifyPhone, historyPush, logout, newlifeAuthorize, onInitializeOvermind, onRouteChange, routeAfterAuth, setBreadcrumbs, setFbUser, setPreloginRoute, wrapPromise } from './actions';
const config_1 = require("overmind/config");
// import configuration from './config';
const lodash_1 = require("lodash");
const config_2 = require("../config");
const standardModules_1 = require("./standardModules");
// export type 
const config = (cfg) => {
    const _cfg = { state: (0, lodash_1.merge)({}, config_2.config, cfg) };
    return (0, config_1.namespaced)({
        ...standardModules_1.standardModules,
        config: _cfg,
    });
};
exports.config = config;
//# sourceMappingURL=overmind.js.map