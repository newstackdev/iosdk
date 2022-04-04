"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardModules = void 0;
const auth_1 = __importDefault(require("./auth"));
const routing_1 = __importDefault(require("./routing"));
const api_1 = __importDefault(require("./api"));
const firebase_1 = __importDefault(require("./firebase"));
const ux_1 = __importDefault(require("./ux"));
const flows_1 = __importDefault(require("./flows"));
const indicators_1 = __importDefault(require("./indicators"));
const websockets_1 = __importDefault(require("./websockets"));
const lists_1 = __importDefault(require("./lists"));
const newcoin_1 = __importDefault(require("./newcoin"));
const chromeext_1 = __importDefault(require("./chromeext"));
const payments_1 = __importDefault(require("./payments"));
const evm_1 = __importDefault(require("./evm"));
exports.standardModules = {
    indicators: indicators_1.default,
    auth: auth_1.default,
    routing: routing_1.default,
    firebase: firebase_1.default,
    websockets: websockets_1.default,
    payments: payments_1.default,
    evm: evm_1.default,
    ux: ux_1.default,
    chromeext: chromeext_1.default,
    api: api_1.default,
    lists: lists_1.default,
    flows: flows_1.default,
    newcoin: newcoin_1.default
    // ...(custom ? { custom } : {})
};
//# sourceMappingURL=standardModules.js.map