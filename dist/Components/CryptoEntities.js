import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import TextArea from "antd/lib/input/TextArea";
// a unified way to display long hashes
export const HashDisplay = ({ hash }) => _jsx(_Fragment, { children: _jsx(TextArea, { rows: 3, value: hash || "" }) });
//# sourceMappingURL=CryptoEntities.js.map