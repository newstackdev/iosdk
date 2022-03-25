"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyMoods = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var overmind_1 = require("../../overmind");
var MoodsGrid_1 = require("./MoodsGrid");
var MyMoods = function () {
    (0, overmind_1.useActions)().routing.setTitle("My folders");
    return (0, jsx_runtime_1.jsx)(MoodsGrid_1.MoodsGrid, { moods: (0, overmind_1.useAppState)().api.auth.moods, title: "My folders" });
};
exports.MyMoods = MyMoods;
exports.default = exports.MyMoods;
//# sourceMappingURL=MyMoods.js.map