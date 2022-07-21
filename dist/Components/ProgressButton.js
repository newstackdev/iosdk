import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "antd";
import { useAppState } from "../overmind";
export const ProgressButton = ({ actionName, type, htmlType, className, children, onClick, disabled, isErrorSubmit, progressText }) => {
    const state = useAppState();
    const ival = !!state.indicators.specific[actionName];
    return (_jsx(_Fragment, { children: _jsx(Button
        // style={{ width: "100%" }}
        , { 
            // style={{ width: "100%" }}
            type: type, htmlType: htmlType, onClick: onClick, disabled: disabled, 
            // style={ival ? {} : { color: "black", borderColor: "black" }}
            className: `${className} ${ival || isErrorSubmit ? "disabled-submit-button" : ""}`, style: ival ? { color: "black", borderColor: "black" } : {}, children: children }) }));
};
//# sourceMappingURL=ProgressButton.js.map