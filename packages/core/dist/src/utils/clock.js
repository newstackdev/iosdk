"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.secondsClock = exports.clock = void 0;
var events_1 = __importDefault(require("events"));
exports.clock = new events_1["default"]();
var clockCounter = 0;
setInterval(function () {
    var n = clockCounter + 5;
    exports.clock.emit("tick", (clockCounter = n > 100 ? 0 : n));
}, 50);
exports.secondsClock = new events_1["default"]();
setInterval(function () {
    exports.secondsClock.emit("tick", Date.now());
}, 1000);
