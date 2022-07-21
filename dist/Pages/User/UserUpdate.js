import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Input } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { LogOut } from "../../Components/Icons/LogOut";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { SOCIAL_MEDIA } from "../../Components/UserWidget";
import { SocialLink } from "../../Components/SocialLink";
import { Success } from "../../Components/Icons/Success";
import { omit } from "lodash";
import { stage } from "../../config";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import Form from "antd/lib/form";
import UserUpdateHeader from "./UserUpdateHeader";
import UserUpdateInfo from "./UserUpdateInfo";
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
    const onVerifySocial = (provider) => {
        window.open(`https://api-${stage}.newlife.io/creator/auth/provider/${provider}?token=${state.firebase.token}&redirect_url=${window.location.href}`, "_self");
    };
    const verify = (provider) => {
        if (provider === "soundcloud") {
            return false;
        }
        const sanitizedProvider = provider.replace(/[0-9]/g, "");
        return !isSocialVerified(sanitizedProvider) ? (_jsx(Button, { className: "secondary-button nl-social-media-verify", onClick: () => onVerifySocial(provider), children: _jsx("span", { className: "paragraph-2b", children: "Verify" }) })) : (_jsx(Success, {}));
    };
    const getSocialIcon = (social) => {
        return _jsx(SocialLink, { user: state.api.auth.user, platform: social, disableLink: true });
    };
    const isSocialVerified = (social) => {
        return state.api.auth.user.verifiedSocialIds?.includes(social);
    };
    const getSocialMediaInputs = () => {
        return SOCIAL_MEDIA.map((social) => {
            const isVerified = isSocialVerified(social);
            let cls = `nl-userUpdate-social-input nl-social-input-${social} ${isVerified ? "nl-social-input-verified" : ""}`;
            return (_jsx(Form.Item, { name: social, rules: social === "instagram"
                    ? [
                        {
                            // required: true,
                            message: "Your instagram please",
                        },
                    ]
                    : undefined, children: _jsx(Input, { placeholder: social, suffix: verify(social === "twitter" || social === "tumblr" ? `${social}2` : social), prefix: getSocialIcon(social), disabled: isVerified, className: cls }) }, social));
        });
    };
    return (_jsx("div", { className: "section-divider", children: _jsx(Form, { name: "basic", wrapperCol: { span: 24 }, className: "text-center", form: form, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off", initialValues: sf, children: _jsx(ContentLayout, { header: _jsx(UserUpdateHeader, {}), info: _jsx(UserUpdateInfo, { embedded: embedded }), isPost: true, children: _jsxs("div", { className: "post-create-form-width", children: [_jsx("h2", { className: "text-center header-5", style: { margin: "0 auto 20px auto", textAlign: "left" }, children: "My links" }), _jsx(Form.Item, { name: "website", children: _jsx(Input, { placeholder: "website" }) }), getSocialMediaInputs(), _jsx(Form.Item, { name: "consentEmail", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: _jsx(RowCheckbox, { children: _jsx("p", { className: "paragraph-2r", style: { marginLeft: "20px" }, children: "I agree to receive relevant communication" }) }) }), _jsx(Form.Item, { name: "consentTestgroup", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: _jsx(RowCheckbox, { children: _jsx("p", { className: "paragraph-2r", style: { marginLeft: "20px" }, children: "I would like to take part in the test group" }) }) }), _jsxs("span", { style: { display: "flex", alignItems: "center" }, children: [_jsx("span", { style: { marginRight: "20px" }, children: "Sign Out" }), _jsx(LogOut, {})] })] }) }) }) }));
};
//# sourceMappingURL=UserUpdate.js.map