"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("overmind/config");
var create_1 = __importDefault(require("./create"));
exports.default = (0, config_1.namespaced)({
    create: create_1.default
});
//# sourceMappingURL=index.js.map