"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.fischerYates = void 0;
var swap = function (arr, i, j) {
    var _a;
    _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
    return arr;
};
var fischerYates = function (arr, n) {
    n = n || arr.length;
    arr = __spreadArray([], arr, true);
    var r = [];
    while (r.length < n) {
        swap(arr, 0, Math.floor(Math.random() * arr.length));
        r.push(arr.shift());
    }
    return r;
};
exports.fischerYates = fischerYates;
