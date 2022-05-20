import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ContentLayout } from "../../Components/ContentLayout";
import { ProgressButton } from "../../Components/ProgressButton";
import { useActions } from "../../overmind";
export const UserInvite = () => {
    const [form] = useForm();
    const actions = useActions();
    return (_jsx(ContentLayout, { children: _jsxs("div", { children: [_jsx("h2", { className: "app-main-title-spacing header-2", children: "Invite a friend" }), _jsxs(Form, { name: "basic", form: form, 
                    // labelCol={{ span: 6 }}
                    wrapperCol: { span: 24 }, 
                    // value={{ state }}
                    onFinish: (data) => actions.api.user.invite({ userInvite: data }), 
                    // onFinishFailed={onFinishFailed}
                    autoComplete: "off", children: [_jsx(Form.Item, { name: "phone", rules: [
                                {
                                    message: "Please input your username!",
                                    required: true,
                                },
                            ], children: _jsx(Input, { placeholder: "phone" }) }), _jsx(Form.Item, { name: "fullName", rules: [
                                {
                                    message: "Please input your username!",
                                    required: true,
                                },
                            ], children: _jsx(Input, { placeholder: "name" }) }), _jsx(Form.Item, { name: "email", rules: [
                                {
                                    message: "",
                                },
                            ], children: _jsx(Input, { placeholder: "username" }) }), _jsx(Form.Item, { wrapperCol: { offset: 8, span: 16 }, children: _jsx(ProgressButton, { actionName: "api.user.invite", progressText: "Inviting user...", type: "primary", htmlType: "submit", children: "Submit" }) })] })] }) }));
};
//# sourceMappingURL=UserImportExisting.js.map