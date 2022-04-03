"use strict";
exports.__esModule = true;
exports.MyMoods = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var state_1 = require("@newcoin-foundation/state");
var MoodsGrid_1 = require("./MoodsGrid");
var MyMoods = function () {
    (0, state_1.useActions)().routing.setTitle("My folders");
    return (0, jsx_runtime_1.jsx)(MoodsGrid_1.MoodsGrid, { moods: (0, state_1.useAppState)().api.auth.moods, title: "My folders" });
};
exports.MyMoods = MyMoods;
exports["default"] = exports.MyMoods;
