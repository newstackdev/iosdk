import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Input, Row } from "antd";
import Form from "antd/lib/form";
import SupportBox from "../../Components/SupportBox";
import { PictureWallFormItem } from "../../Components/PicturesWall";
import { useAppState } from "../../overmind";
const UserUpdateHeader = () => {
    const state = useAppState();
    const sf = state.api.auth.user || {};
    return (_jsxs("div", { className: "post-create-header-wrapper", children: [_jsx("div", { className: "post-back-arrow", style: { padding: "0px 20px" } }), _jsxs(Row, { style: {
                    flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "column",
                }, children: [_jsxs(Row, { style: { flexDirection: "column" }, children: [_jsx("h2", { className: "text-center header-5", style: { margin: "0 auto 20px auto" }, children: "Edit Profile" }), _jsx(Row, { justify: "center", className: "full-width-only", children: _jsx(Col, { span: 18, children: _jsx(Form.Item
                                    // label="Avatar"
                                    , { 
                                        // label="Avatar"
                                        name: "file", children: _jsx(PictureWallFormItem, { uploadText: "Upload avatar" }) }) }) }), _jsx(Form.Item, { children: _jsx(Input, { readOnly: true, placeholder: "your domain" }) }), _jsx(Form.Item, { name: "displayName", rules: [
                                    {
                                        required: true,
                                        message: "Display name must start with a letter, be 3 - 9 chars or longer and contain only latin letters, digits and dots.",
                                    },
                                ], children: _jsx(Input, { placeholder: "display name" }) }), _jsx(Form.Item, { name: "description", children: _jsx(Input.TextArea, { placeholder: "bio" }) }), _jsx(Form.Item, { name: "email", required: true, rules: [
                                    {
                                        required: true,
                                        message: "Please enter your email",
                                    },
                                ], children: _jsx(Input, { placeholder: "email" }) })] }), _jsx(Row, { style: { flex: 1, flexDirection: "column" }, children: _jsx(SupportBox, {}) }), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), _jsx("br", {})] })] }));
};
export default UserUpdateHeader;
//# sourceMappingURL=UserUpdateHeader.js.map