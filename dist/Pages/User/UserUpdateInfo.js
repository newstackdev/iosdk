import { jsx as _jsx } from "react/jsx-runtime";
import { ProgressButton } from "../../Components/ProgressButton";
import Form from "antd/lib/form";
const UserUpdateInfo = ({ embedded }) => {
    return (_jsx(Form.Item, { hidden: embedded, style: { height: "100%", display: "flex", alignItems: "end" }, children: _jsx(ProgressButton, { actionName: "api.user.update", type: "primary", htmlType: "submit", progressText: "Updating info...", children: "Save" }) }));
};
export default UserUpdateInfo;
//# sourceMappingURL=UserUpdateInfo.js.map