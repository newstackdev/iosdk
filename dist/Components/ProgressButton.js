"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const overmind_1 = require("../overmind");
const ProgressButton = ({ actionName, type, htmlType, className, children, onClick, disabled, isErrorSubmit, progressText, }) => {
    const state = (0, overmind_1.useAppState)();
    const ival = !!state.indicators.specific[actionName];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !ival ? ((0, jsx_runtime_1.jsx)(antd_1.Button
        // style={{ width: "100%" }}
        , { 
            // style={{ width: "100%" }}
            type: type, htmlType: htmlType, onClick: onClick, disabled: disabled, className: isErrorSubmit
                ? `${className} disabled-submit-button`
                : `${className}`, children: children })) : ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", style: { color: "black", borderColor: "black" }, children: progressText || "" })) }));
};
exports.ProgressButton = ProgressButton;
//# sourceMappingURL=ProgressButton.js.map