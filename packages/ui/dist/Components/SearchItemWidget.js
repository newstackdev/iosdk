"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.SearchItemWidget = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var state_1 = require("@newcoin-foundation/state");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var SearchItemWidget = function (_a) {
    var _b, _c, _d, _e, _f;
    var item = _a.item, index = _a.index;
    var state = (0, state_1.useAppState)();
    return ((0, jsx_runtime_1.jsxs)(antd_1.Card, __assign({ style: { width: "100%" }, 
        // title={}
        cover: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/search-creative/vote?".concat(state.routing.location, "&index=").concat(index.toString()) }, { children: (0, jsx_runtime_1.jsx)(antd_1.Image, { width: "100%", preview: false, src: item.image }) })) }, { children: [(0, jsx_runtime_1.jsx)("small", { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: (_b = item === null || item === void 0 ? void 0 : item.meta) === null || _b === void 0 ? void 0 : _b.short_url, target: "_new" }, { children: (_c = item === null || item === void 0 ? void 0 : item.meta) === null || _c === void 0 ? void 0 : _c.short_url })) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("small", { children: ["by", " ", (0, jsx_runtime_1.jsx)("a", __assign({ href: "".concat((_d = item === null || item === void 0 ? void 0 : item.meta) === null || _d === void 0 ? void 0 : _d.short_url), target: "_new" }, { children: (_e = item === null || item === void 0 ? void 0 : item.meta) === null || _e === void 0 ? void 0 : _e.blog_name }))] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("small", { children: Object.entries((_f = item === null || item === void 0 ? void 0 : item.aesthetics) !== null && _f !== void 0 ? _f : {})
                    .filter(function (kvp) { return state_1.aestheticList.includes(kvp[0]); })
                    .map(function (kvp) { return ((0, jsx_runtime_1.jsxs)("p", __assign({ style: { textAlign: "center" } }, { children: [kvp[0], (0, jsx_runtime_1.jsx)("div", { className: "nl-rating-bar", style: {
                                textAlign: "left",
                                opacity: 100,
                                width: "".concat(kvp[1] * 100 || 0, "%")
                            } })] }))); }) })] })));
};
exports.SearchItemWidget = SearchItemWidget;
