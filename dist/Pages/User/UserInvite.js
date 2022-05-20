import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { ContentLayout } from "../../Components/ContentLayout";
import { ProgressButton } from "../../Components/ProgressButton";
import { Spin } from "../../Components/Spin";
import { useActions } from "../../overmind";
export const UserInvite = () => {
    const [form] = useForm();
    const actions = useActions();
    const [status, setStatus] = useState("start");
    const [fullName, setFullName] = useState("");
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
            return _jsx(Spin, {});
        case "failed":
            return _jsx("div", { children: "Something wend wronk" });
        case "done":
            return _jsxs("div", { children: ["You invited ", fullName] });
        case "start":
            return (_jsxs("div", { children: [_jsx("h2", { className: "app-main-title-spacing header-2", children: "Invite a friend" }), _jsxs(Form, { name: "basic", form: form, 
                        // labelCol={{ span: 6 }}
                        wrapperCol: { span: 24 }, 
                        // value={{ state }}
                        onFinish: onFinish, 
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
                                ], children: _jsx(Input, { placeholder: "email" }) }), _jsx(Form.Item, { wrapperCol: { offset: 8, span: 16 }, children: _jsx(ProgressButton, { actionName: "api.user.invite", progressText: "Inviting user...", type: "primary", htmlType: "submit", children: "Submit" }) })] })] }));
    }
    return _jsx(ContentLayout, {});
};
//# sourceMappingURL=UserInvite.js.map