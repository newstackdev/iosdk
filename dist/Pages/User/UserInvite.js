import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ContentLayout } from "../../Components/ContentLayout";
import { Form, Input } from "antd";
import { ProgressButton } from "../../Components/ProgressButton";
import { SOCIAL_MEDIA } from "../../Components/UserWidget";
import { Spin } from "../../Components/Spin";
import { useActions } from "../../overmind";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import UserInviteInfo from "./UserInviteInfo";
export const UserInvite = () => {
    const [form] = useForm();
    const actions = useActions();
    const [status, setStatus] = useState("start");
    const [fullName, setFullName] = useState(undefined);
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
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneReg = "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,7}$";
    switch (status) {
        case "inprogress":
            return _jsx(Spin, {});
        case "failed":
            return _jsx("div", { children: "Something went wrong" });
        case "done":
            return _jsx(UserInviteInfo, { invitedUsername: fullName, setStatus: setStatus, form: form });
        case "start":
            return (_jsxs(ContentLayout, { customClass: "text-center", children: [_jsx("p", { className: "super-size font-variant-none", style: { marginBottom: "40px" }, children: "Invite a friend" }), _jsxs(Form, { name: "basic", form: form, 
                        // labelCol={{ span: 6 }}
                        wrapperCol: { span: 24 }, 
                        // value={{ state }}
                        onFinish: onFinish, 
                        // onFinishFailed={onFinishFailed}
                        autoComplete: "off", initialValues: {}, style: { width: "40%" }, children: [_jsx(Form.Item, { name: "fullName", rules: [
                                    {
                                        message: "Please input your username!",
                                        required: true,
                                    },
                                ], children: _jsx(Input, { placeholder: "name" }) }), _jsx(Form.Item, { name: "phone", rules: [
                                    {
                                        required: true,
                                        message: "The phone number is invalid.",
                                        pattern: new RegExp(phoneReg),
                                    },
                                ], children: _jsx(Input, { placeholder: "phone" }) }), _jsx(Form.Item, { name: "email", rules: [
                                    {
                                        pattern: new RegExp(emailReg),
                                        message: "Please input valid email.",
                                    },
                                ], children: _jsx(Input, { placeholder: "email" }) }), SOCIAL_MEDIA.map((social) => (_jsx(Form.Item, { name: social, children: _jsx(Input, { placeholder: social }) }, social))), _jsx(Form.Item, { children: _jsx("div", { className: "u-margin-top-large", children: _jsx(ProgressButton, { actionName: "api.user.invite", progressText: "Inviting user...", type: "primary", htmlType: "submit", children: "Send an invite" }) }) })] })] }));
    }
};
//# sourceMappingURL=UserInvite.js.map