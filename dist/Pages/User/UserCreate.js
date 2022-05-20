import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "antd";
import Form from "antd/lib/form";
import { useEffect } from "react";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useForm } from "antd/lib/form/Form";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { ContentLayout } from "../../Components/ContentLayout";
import { ProgressButton } from "../../Components/ProgressButton";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
// ({ embedded, setNext } : React.PropsWithChildren<EmbeddableControl>) => {
export const CrossCircleErr = ({ children, }) => {
    return (_jsxs(_Fragment, { children: [children, _jsx("div", { className: "error-circle-form ", children: _jsx(CrossCircle, {}) })] }));
};
export const UserCreate = ({ hideUsername, noRouing, embedded, setNext, setIsErrorSubmit }) => {
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const [form] = useForm();
    const username = state.flows.user.create.form.username;
    useEffect(() => {
        actions.routing.setBreadcrumbs([{ text: "Create your profile" }]);
    }, []);
    const setNextEmbedded = () => {
        (!state.api.auth.user?.username ||
            state.flows.user.create.legacyToken) && //["invited", "imported", "known"].includes(state.api.auth.user.status || "") &&
            setNext &&
            setNext({
                text: "Next",
                command: () => form.submit(),
            });
        return () => setNext && setNext(undefined);
    };
    const sf = state.flows.user.create.form;
    useEffect(setNextEmbedded, [sf]);
    const onFinish = async (values) => {
        console.log("Creating:", values);
        try {
            await form.validateFields();
            setIsErrorSubmit(false);
        }
        catch (e) {
            console.log(e.errorFields.length);
            setIsErrorSubmit(true);
            return;
        }
        actions.flows.user.create.create({
            noRouting: !!noRouing,
            user: values,
        });
    };
    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    //     effects.ux.message.error(JSON.stringify(errorInfo))
    // };
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (_jsxs(ContentLayout, { children: [_jsx("p", { className: "super-size font-variant-none", style: { marginBottom: "40px" }, children: username }), _jsxs(Form, { name: "sign-up-form", form: form, 
                // labelCol={{ span: 6 }}
                wrapperCol: { span: 24 }, 
                // value={{ state }}
                onFinish: onFinish, 
                // onFinishFailed={onFinishFailed}
                autoComplete: "off", onFieldsChange: (_ch, all) => {
                    const upd = _ch.reduce((r, c) => 
                    // @ts-ignore
                    ({ ...r, [c.name[0]]: c.value || c.values }), sf);
                    actions.flows.user.create.updateForm(upd);
                }, initialValues: sf, children: [_jsx(Form.Item, { name: "username", hidden: hideUsername, rules: [
                            {
                                required: !hideUsername,
                                validator: (_, v) => /^[A-Za-z0-9\.]{4,12}$/.test(v)
                                    ? Promise.resolve()
                                    : Promise.reject(),
                                // validator: (_, v) => (/^[\w](?!.*?\.{2})[\w.]{1,9}[\w]$/.test(v)) ? Promise.resolve() : Promise.reject(),
                                message: "Please input your username!",
                            },
                        ], children: _jsx(Input, { placeholder: "username", suffix: _jsx(CrossCircleErr, {}) }) }), _jsx(Form.Item, { name: "newcoinTicker", rules: [
                            {
                                required: true,
                            },
                        ], children: _jsx(Input, { placeholder: "newcoin ticker", suffix: _jsx(CrossCircleErr, {}) }) }), _jsx(Form.Item, { name: "displayName", rules: [
                            {
                                required: false,
                            },
                        ], children: _jsx(Input, { placeholder: "name", suffix: _jsx(CrossCircleErr, {}) }) }), _jsx(Form.Item, { name: "email", rules: [
                            {
                                pattern: new RegExp(re),
                                message: "Please input valid email.",
                            },
                        ], children: _jsx(Input, { placeholder: "email", suffix: _jsx(CrossCircleErr, {}) }) }), _jsx(Form.Item, { name: "description", children: _jsx(Input.TextArea, { placeholder: "bio" }) }), _jsx(Form.Item, { name: "website", children: _jsx(Input, { placeholder: "website" }) }), _jsx(Form.Item, { name: "instagram", children: _jsx(Input, { placeholder: "instagram" }) }), _jsx(Form.Item, { name: "tumblr", children: _jsx(Input, { placeholder: "tumblr" }) }), _jsx(Form.Item, { name: "soundcloud", children: _jsx(Input, { placeholder: "soundcloud" }) }), _jsx(Form.Item, { name: "twitter", children: _jsx(Input, { placeholder: "twitter" }) }), _jsx(Form.Item, { name: "consentPrivacyPolicy", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: _jsx(RowCheckbox, { children: _jsxs("p", { className: "paragraph-2r", style: { margin: 0 }, children: ["I agree to Newlife's", " ", _jsx("span", { className: "paragraph-2u", children: _jsx("a", { href: "/privacy_policy", target: "_blank", children: "privacy policy" }) })] }) }) }), _jsx(Form.Item, { name: "consentEmail", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, rules: [
                            {
                                required: true,
                            },
                        ], children: _jsx(RowCheckbox, { children: _jsx("p", { className: "paragraph-2r", style: { margin: 0 }, children: "I consent to email communications" }) }) }), _jsx(Form.Item, { name: "consentTestgroup", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: _jsx(RowCheckbox, { children: _jsx("p", { className: "paragraph-2r", style: { margin: 0 }, children: "I'd like to join the beta group!" }) }) }), _jsx(Form.Item, { hidden: embedded, wrapperCol: { offset: 8, span: 16 }, children: _jsx(ProgressButton, { actionName: "api.user.create", type: "primary", htmlType: "submit", progressText: "Creating user...", children: "Submit" }) })] })] }));
};
//# sourceMappingURL=UserCreate.js.map