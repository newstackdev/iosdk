"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fischerYates = void 0;
const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
};
const fischerYates = (arr, n) => {
    n = n || arr.length;
    arr = [...arr];
    const r = [];
    while (r.length < n) {
        swap(arr, 0, Math.floor(Math.random() * arr.length));
        r.push(arr.shift());
    }
    return r;
};
exports.fischerYates = fischerYates;
//# sourceMappingURL=random.js.map