"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInvite = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const Form_1 = require("antd/lib/form/Form");
const react_1 = require("react");
const ContentLayout_1 = require("../../Components/ContentLayout");
const ProgressButton_1 = require("../../Components/ProgressButton");
const Spin_1 = require("../../Components/Spin");
const overmind_1 = require("../../overmind");
const UserInvite = () => {
    const [form] = (0, Form_1.useForm)();
    const actions = (0, overmind_1.useActions)();
    const [status, setStatus] = (0, react_1.useState)("start");
    const [fullName, setFullName] = (0, react_1.useState)("");
    const onFinish = async (data) => {
        try {
            setFullName(data.fullName);
            await actions.api.user.invite({ userInvite: data });
            setStatus("done");
        }
        catch (ex) {
            setStatus("failed");
        }
    };
    switch (status) {
        case "inprogress":
            return (0, jsx_runtime_1.jsx)(Spin_1.Spin, {});
        case "failed":
            return (0, jsx_runtime_1.jsx)("div", { children: "Something wend wronk" });
        case "done":
            return (0, jsx_runtime_1.jsxs)("div", { children: ["You invited ", fullName] });
        case "start":
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "app-main-title-spacing header-2", children: "Invite a friend" }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { name: "basic", form: form, 
                        // labelCol={{ span: 6 }}
                        wrapperCol: { span: 24 }, 
                        // value={{ state }}
                        onFinish: onFinish, 
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
                                ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "email" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 8, span: 16 }, children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "api.user.invite", progressText: "Inviting user...", type: "primary", htmlType: "submit", children: "Submit" }) })] })] }));
    }
    return (0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, {});
};
exports.UserInvite = UserInvite;
//# sourceMappingURL=UserInvite.js.map