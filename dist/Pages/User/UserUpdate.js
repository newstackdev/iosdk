import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "antd";
import Form from "antd/lib/form";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useForm } from "antd/lib/form/Form";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { omit } from "lodash";
import { useEffect } from "react";
import { ContentLayout } from "../../Components/ContentLayout";
import UserUpdateInfo from "./UserUpdateInfo";
import UserUpdateHeader from "./UserUpdateHeader";
import { LogOut } from "../../Components/Icons/LogOut";
export const UserUpdate = ({ 
// hideUsername,
// noRouing,
embedded, setNext, }) => {
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const [form] = useForm();
    useEffect(() => {
        actions.api.user.getCurrent();
    }, []);
    const onFinish = async (values) => {
        console.log("Success:", values);
        await actions.api.user.update({
            user: omit(values, "file"),
            file: values.file?.fileList[0],
        });
        actions.routing.historyPush({ location: "/my/profile" });
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        effects.ux.message.error(JSON.stringify(errorInfo));
    };
    const sf = state.api.auth.user || {};
    return (_jsx("div", { className: "section-divider", children: _jsx(Form, { name: "basic", wrapperCol: { span: 24 }, className: "text-center", form: form, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off", initialValues: sf, children: _jsx(ContentLayout, { header: _jsx(UserUpdateHeader, {}), info: _jsx(UserUpdateInfo, { embedded: embedded }), isPost: true, children: _jsxs("div", { className: "post-create-form-width", children: [_jsx("h2", { className: "text-center header-5", style: { margin: "0 auto 20px auto" }, children: "My links" }), _jsx(Form.Item, { name: "website", children: _jsx(Input, { placeholder: "website" }) }), _jsx(Form.Item, { name: "instagram", rules: [
                                {
                                    required: true,
                                    message: "Your instagram please",
                                },
                            ], children: _jsx(Input, { placeholder: "instagram" }) }), _jsx(Form.Item
                        // label="Tumblr"
                        , { 
                            // label="Tumblr"
                            name: "tumblr", children: _jsx(Input, { placeholder: "tumblr" }) }), _jsx(Form.Item, { name: "soundcloud", children: _jsx(Input, { placeholder: "soundcloud" }) }), _jsx(Form.Item, { name: "twitter", children: _jsx(Input, { placeholder: "twitter" }) }), _jsx(Form.Item, { name: "consentEmail", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: _jsx(RowCheckbox, { children: _jsx("p", { className: "paragraph-2r", style: { marginLeft: "20px" }, children: "I agree to receive relevant communication" }) }) }), _jsx(Form.Item, { name: "consentTestgroup", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: _jsx(RowCheckbox, { children: _jsx("p", { className: "paragraph-2r", style: { marginLeft: "20px" }, children: "I would like to take part in the test group" }) }) }), _jsxs("span", { style: { display: "flex", alignItems: "center" }, children: [_jsx("span", { style: { marginRight: "20px" }, children: "Sign Out" }), _jsx(LogOut, {})] })] }) }) }) }));
};
//# sourceMappingURL=UserUpdate.js.map