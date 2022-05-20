import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Proposal = (props) => {
    return (_jsxs("div", { children: [_jsx("p", { children: props.summary || "This is a proposal to..." }), _jsx("p", { children: props.date || "Tue, 11 Feb 2022" }), _jsx("p", { children: props.time || "08:00 GMT" }), _jsx("p", { children: props.id || "#88" }), _jsx("p", { children: props.status || "Live" }), _jsx("button", { children: "View" })] }));
};
const CommunityHistory = () => {
    return (_jsx("div", { children: _jsxs("p", { className: "paragraph-1r", children: ["The Newlife App is becoming a DAO. A decentralized autonomous organization. The community will be able to create and vote on proposals for the development and growth of the application. Newlife aims to change the future of social with a first of its kind community ownership model, embedding the values of care, freedom and creativity. ", _jsx("br", {}), " ", _jsx("br", {}), " You are invited."] }) }));
};
export default CommunityHistory;
//# sourceMappingURL=CommunityHistory.js.map