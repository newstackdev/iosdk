"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secondsClock = exports.clock = void 0;
const events_1 = __importDefault(require("events"));
exports.clock = new events_1.default();
let clockCounter = 0;
setInterval(() => {
    const n = clockCounter + 5;
    exports.clock.emit('tick', clockCounter = n > 100 ? 0 : n);
}, 50);
exports.secondsClock = new events_1.default();
setInterval(() => {
    exports.secondsClock.emit('tick', Date.now());
}, 1000);
//# sourceMappingURL=clock.js.map