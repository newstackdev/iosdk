"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("overmind/config");
const user_1 = __importDefault(require("./user"));
const rating_1 = __importDefault(require("./rating"));
const userJourney_1 = __importDefault(require("./userJourney"));
const stake_1 = __importDefault(require("./stake"));
exports.default = (0, config_1.namespaced)({
    user: user_1.default,
    rating: rating_1.default,
    userJourney: userJourney_1.default,
    stake: stake_1.default
});
//# sourceMappingURL=index.js.map