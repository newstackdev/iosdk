import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Form, Input } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { CreatorsList } from "../../Components/Creators";
import { ProgressButton } from "../../Components/ProgressButton";
import { SocialMediaInputs } from "../../Components/Input/SocialMediaInputs";
import { Spin } from "../../Components/Spin";
import { phoneNumberReformat } from "../../utils/phoneNumberReformat";
import { useActions, useAppState } from "../../overmind";
import { useCachedInvitees } from "../../hooks/useCached";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import UserInviteInfo from "./UserInviteInfo";
export const UserInvite = () => {
    const [form] = useForm();
    const actions = useActions();
    const state = useAppState();
    const [status, setStatus] = useState("start");
    const [fullName, setFullName] = useState(undefined);
    const [hash, setHash] = useState();
    const [visibleForm, setVisibleForm] = useState(false);
    const user = state.api.auth.user;
    const numberOfInvites = user.availableInvites || undefined;
    const onFinish = async (data) => {
        try {
            setFullName(data.fullName);
            const responseHash = await actions.api.user.invite({ userInvite: data });
            setHash(responseHash);
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
            return (_jsx(ContentLayout, { customClass: "text-center", children: _jsxs("div", { className: "paragraph-1r", children: ["Oops! Looks like something went wrong. ", _jsx("br", {}), " Try to refresh or", _jsxs("a", { href: "https://t.me/newcoinprotocol", target: "_blank", rel: "noreferrer", className: "paragraph-1u", children: [" ", "ask support"] })] }) }));
        case "done":
            return _jsx(UserInviteInfo, { invitedUsername: fullName, setStatus: setStatus, form: form, hash: hash });
        case "start":
            return (_jsx(ContentLayout, { customClass: "text-center", position: "top", children: numberOfInvites === 0 || numberOfInvites === undefined || visibleForm ? (_jsx(FormInviteFriend, { form: form, onFinish: onFinish })) : (_jsx(InviteesList, { setVisibleForm: setVisibleForm, maxItems: 4, title: "List of invited users" })) }));
    }
};
export const InviteesList = ({ setVisibleForm, maxItems, title }) => {
    const inviteesList = useCachedInvitees();
    const state = useAppState();
    const user = state.api.auth.user;
    const numberOfInvites = user.availableInvites ?? 0;
    return (_jsxs("div", { className: "text-center", children: [maxItems !== undefined && (_jsxs(_Fragment, { children: [_jsxs("p", { className: "super-size font-variant-none", style: { marginBottom: "40px" }, children: ["You have ", numberOfInvites, " invites left"] }), _jsx(Button, { type: "primary", onClick: () => setVisibleForm(true), children: "Share a new invite" })] })), _jsx(CreatorsList, { users: inviteesList.value })] }));
};
const FormInviteFriend = ({ form, onFinish, }) => {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneReg = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
    return (_jsxs(_Fragment, { children: [_jsx("p", { className: "super-size font-variant-none", style: { marginBottom: "40px" }, children: "Invite a friend" }), _jsxs(Form, { name: "basic", className: "nl-user-invite-form", form: form, wrapperCol: { span: 24 }, onFinish: onFinish, autoComplete: "off", initialValues: {}, children: [_jsx(Form.Item, { name: "fullName", rules: [
                            {
                                message: "Please input your username!",
                                required: true,
                            },
                        ], children: _jsx(Input, { placeholder: "name *" }) }), _jsx(Form.Item, { name: "phone", rules: [
                            {
                                required: true,
                                message: "The phone number is invalid.",
                                pattern: new RegExp(phoneReg),
                            },
                        ], children: _jsx(Input, { placeholder: "phone *", onChange: (values) => phoneNumberReformat(values, form) }) }), _jsx("p", { className: "text-left u-margin-bottom-small header-2 u-margin-top-large", children: "Optional" }), _jsx(Form.Item, { name: "email", rules: [
                            {
                                pattern: new RegExp(emailReg),
                                message: "Please input valid email.",
                            },
                        ], children: _jsx(Input, { placeholder: "email" }) }), _jsx(SocialMediaInputs, {}), _jsx(Form.Item, { children: _jsx("div", { className: "u-margin-top-large", children: _jsx(ProgressButton, { actionName: "api.user.invite", progressText: "Inviting user...", type: "primary", htmlType: "submit", children: "Generate invite" }) }) })] })] }));
};
//# sourceMappingURL=UserInvite.js.map