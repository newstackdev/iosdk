import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "antd";
import { useAppState } from "../overmind";
export const ProgressButton = ({ actionName, type, htmlType, className, children, onClick, disabled, isErrorSubmit, progressText, }) => {
    const state = useAppState();
    const ival = !!state.indicators.specific[actionName];
    return (_jsx(_Fragment, { children: !ival ? (_jsx(Button
        // style={{ width: "100%" }}
        , { 
            // style={{ width: "100%" }}
            type: type, htmlType: htmlType, onClick: onClick, disabled: disabled, className: isErrorSubmit
                ? `${className} disabled-submit-button`
                : `${className}`, children: children })) : (_jsx(Button, { type: "primary", style: { color: "black", borderColor: "black" }, children: progressText || "" })) }));
};
//# sourceMappingURL=ProgressButton.js.map