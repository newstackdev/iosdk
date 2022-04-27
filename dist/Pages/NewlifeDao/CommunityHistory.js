"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Proposal = (props) => {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: props.summary || "This is a proposal to..." }), (0, jsx_runtime_1.jsx)("p", { children: props.date || "Tue, 11 Feb 2022" }), (0, jsx_runtime_1.jsx)("p", { children: props.time || "08:00 GMT" }), (0, jsx_runtime_1.jsx)("p", { children: props.id || "#88" }), (0, jsx_runtime_1.jsx)("p", { children: props.status || "Live" }), (0, jsx_runtime_1.jsx)("button", { children: "View" })] }));
};
const CommunityHistory = () => {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("p", { className: "paragraph-1r", children: ["The Newlife App is becoming a DAO. A decentralized autonomous organization. The community will be able to create and vote on proposals for the development and growth of the application. Newlife aims to change the future of social with a first of its kind community ownership model, embedding the values of care, freedom and creativity. ", (0, jsx_runtime_1.jsx)("br", {}), " ", (0, jsx_runtime_1.jsx)("br", {}), " You are invited."] }) }));
};
exports.default = CommunityHistory;
//# sourceMappingURL=CommunityHistory.js.map