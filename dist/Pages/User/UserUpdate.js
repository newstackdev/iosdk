import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ContentLayout } from "../../Components/ContentLayout";
import { Input, Row } from "antd";
import { LogOut } from "../../Components/Icons/LogOut";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { SocialMediaInputs } from "../../Components/Input/SocialMediaInputs";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import Form from "antd/lib/form";
import UserUpdateHeader from "./UserUpdateHeader";
import UserUpdateInfo from "./UserUpdateInfo";
import omit from "lodash/omit";
export const UserUpdate = ({ 
// hideUsername,
// noRouing,
embedded, setNext, }) => {
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const [form] = useForm();
    useEffect(() => {
        const url = new URLSearchParams(window.location.search);
        if (url.get("status") === "error") {
            effects.ux.message.error(url.get("message"));
        }
        actions.api.user.getCurrent();
    }, []);
    const onFinish = async (values) => {
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
    return (_jsx("div", { className: "section-divider", children: _jsx(Form, { name: "basic", wrapperCol: { span: 24 }, className: "text-center", form: form, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off", initialValues: sf, children: _jsx(ContentLayout, { header: _jsx(UserUpdateHeader, {}), info: _jsx(UserUpdateInfo, { embedded: embedded }), isPost: true, children: _jsxs("div", { className: "post-create-form-width", children: [_jsx("h2", { className: "text-center header-5", style: { margin: "0 auto 20px auto", textAlign: "left" }, children: "My links" }), _jsx(Form.Item, { name: "website", children: _jsx(Input, { placeholder: "website" }) }), _jsx(SocialMediaInputs, { enableVerify: true }), _jsx(Form.Item, { name: "consentEmail", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: _jsx(RowCheckbox, { children: _jsx("p", { className: "paragraph-2r", style: { marginLeft: "20px" }, children: "I agree to receive relevant communication" }) }) }), _jsx(Form.Item, { name: "consentTestgroup", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: _jsx(RowCheckbox, { children: _jsx("p", { className: "paragraph-2r", style: { marginLeft: "20px" }, children: "I would like to take part in the test group" }) }) }), _jsxs(Row, { justify: "end", align: "bottom", onClick: () => actions.auth.logout(), className: "cursor-pointer", children: [_jsx("span", { className: "u-margin-right-small ", children: "Sign Out" }), _jsx(LogOut, {})] })] }) }) }) }));
};
//# sourceMappingURL=UserUpdate.js.map