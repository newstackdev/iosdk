"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SocialLink = ({ children, platform, user }) => {
    return user[platform] ? ((0, jsx_runtime_1.jsx)("a", { href: `https://${platform}.com/${user[platform]}`, target: "_blank", rel: "noreferrer", children: children })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
};
exports.SocialLink = SocialLink;
//# sourceMappingURL=SocialLink.js.map