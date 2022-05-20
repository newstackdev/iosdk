import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
export const SocialLink = ({ children, platform, user }) => {
    return user[platform] ? (_jsx("a", { href: `https://${platform}.com/${user[platform]}`, target: "_blank", rel: "noreferrer", children: children })) : (_jsx(_Fragment, {}));
};
//# sourceMappingURL=SocialLink.js.map