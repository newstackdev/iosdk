import EventEmitter from "events";
export const clock = new EventEmitter();
let clockCounter = 0;
setInterval(() => {
    const n = clockCounter + 5;
    clock.emit('tick', clockCounter = n > 100 ? 0 : n);
}, 50);
export const secondsClock = new EventEmitter();
setInterval(() => {
    secondsClock.emit('tick', Date.now());
}, 1000);
//# sourceMappingURL=clock.js.map