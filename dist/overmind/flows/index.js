"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("overmind/config");
var user_1 = __importDefault(require("./user"));
var rating_1 = __importDefault(require("./rating"));
exports.default = (0, config_1.namespaced)({
    user: user_1.default,
    rating: rating_1.default
});
//# sourceMappingURL=index.js.map