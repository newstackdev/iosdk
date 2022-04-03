"use strict";
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var Proposal = function (props) {
    return (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: props.summary || "This is a proposal to..." }), (0, jsx_runtime_1.jsx)("p", { children: props.date || "Tue, 11 Feb 2022" }), (0, jsx_runtime_1.jsx)("p", { children: props.time || "08:00 GMT" }), (0, jsx_runtime_1.jsx)("p", { children: props.id || "#88" }), (0, jsx_runtime_1.jsx)("p", { children: props.status || "Live" }), (0, jsx_runtime_1.jsx)("button", { children: "View" })] });
};
var CommunityHistory = function () {
    return (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Community History" }), (0, jsx_runtime_1.jsx)("p", { children: "Sort by" }), (0, jsx_runtime_1.jsx)("p", { children: "See All" })] }), (0, jsx_runtime_1.jsx)("button", { children: "New Proposal" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Proposal, {}), (0, jsx_runtime_1.jsx)(Proposal, {}), (0, jsx_runtime_1.jsx)(Proposal, {}), (0, jsx_runtime_1.jsx)(Proposal, {}), (0, jsx_runtime_1.jsx)(Proposal, {})] })] });
};
exports["default"] = CommunityHistory;
