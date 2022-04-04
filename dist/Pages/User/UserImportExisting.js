"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInvite = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const Form_1 = require("antd/lib/form/Form");
const ContentLayout_1 = require("../../Components/ContentLayout");
const ProgressButton_1 = require("../../Components/ProgressButton");
const overmind_1 = require("../../overmind");
const UserInvite = () => {
    const [form] = (0, Form_1.useForm)();
    const actions = (0, overmind_1.useActions)();
    return ((0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "app-main-title-spacing header-2", children: "Invite a friend" }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { name: "basic", form: form, 
                    // labelCol={{ span: 6 }}
                    wrapperCol: { span: 24 }, 
                    // value={{ state }}
                    onFinish: (data) => actions.api.user.invite({ userInvite: data }), 
                    // onFinishFailed={onFinishFailed}
                    autoComplete: "off", children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "phone", rules: [
                                {
                                    message: "Please input your username!",
                                    required: true,
                                },
                            ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "phone" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "fullName", rules: [
                                {
                                    message: "Please input your username!",
                                    required: true,
                                },
                            ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "name" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "email", rules: [
                                {
                                    message: "",
                                },
                            ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "username" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 8, span: 16 }, children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "api.user.invite", progressText: "Inviting user...", type: "primary", htmlType: "submit", children: "Submit" }) })] })] }) }));
};
exports.UserInvite = UserInvite;
//# sourceMappingURL=UserImportExisting.js.map