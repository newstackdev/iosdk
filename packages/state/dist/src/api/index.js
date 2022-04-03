"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var actions_1 = __importDefault(require("./actions"));
var effects_1 = __importDefault(require("./effects"));
var state_1 = __importDefault(require("./state"));
exports["default"] = {
    actions: actions_1["default"],
    effects: effects_1["default"],
    state: state_1["default"]
};
