import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
export const RevealInfo = ({ children }) => {
    const [show, setShow] = useState(false);
    return show ? _jsx(_Fragment, { children: children }) : _jsx(EyeOutlined, { onClick: () => setShow(true) });
};
//# sourceMappingURL=RevealInfo.js.map