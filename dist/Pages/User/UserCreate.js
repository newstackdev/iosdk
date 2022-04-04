"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreate = exports.CrossCircleErr = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const form_1 = __importDefault(require("antd/lib/form"));
const react_1 = require("react");
const overmind_1 = require("../../overmind");
const Form_1 = require("antd/lib/form/Form");
const RowCheckbox_1 = require("../../Components/RowCheckbox");
const ContentLayout_1 = require("../../Components/ContentLayout");
const ProgressButton_1 = require("../../Components/ProgressButton");
const CrossCircle_1 = require("../../Components/Icons/CrossCircle");
// ({ embedded, setNext } : React.PropsWithChildren<EmbeddableControl>) => {
const CrossCircleErr = ({ children, }) => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [children, (0, jsx_runtime_1.jsx)("div", { className: "error-circle-form ", children: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}) })] }));
};
exports.CrossCircleErr = CrossCircleErr;
const UserCreate = ({ hideUsername, noRouing, embedded, setNext, setIsErrorSubmit }) => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const effects = (0, overmind_1.useEffects)();
    const [form] = (0, Form_1.useForm)();
    const username = state.flows.user.create.form.username;
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(setNextEmbedded, [sf]);
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
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { children: [(0, jsx_runtime_1.jsx)("p", { className: "super-size font-variant-none", style: { marginBottom: "40px" }, children: username }), (0, jsx_runtime_1.jsxs)(form_1.default, { name: "sign-up-form", form: form, 
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
                }, initialValues: sf, children: [(0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "username", hidden: hideUsername, rules: [
                            {
                                required: !hideUsername,
                                validator: (_, v) => /^[A-Za-z0-9\.]{4,12}$/.test(v)
                                    ? Promise.resolve()
                                    : Promise.reject(),
                                // validator: (_, v) => (/^[\w](?!.*?\.{2})[\w.]{1,9}[\w]$/.test(v)) ? Promise.resolve() : Promise.reject(),
                                message: "Please input your username!",
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "username", suffix: (0, jsx_runtime_1.jsx)(exports.CrossCircleErr, {}) }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "displayName", rules: [
                            {
                                required: false,
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "name", suffix: (0, jsx_runtime_1.jsx)(exports.CrossCircleErr, {}) }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "email", rules: [
                            {
                                pattern: new RegExp(re),
                                message: "Please input valid email.",
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "email", suffix: (0, jsx_runtime_1.jsx)(exports.CrossCircleErr, {}) }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "description", children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { placeholder: "bio" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "website", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "website" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "instagram", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "instagram" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "tumblr", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "tumblr" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "soundcloud", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "soundcloud" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "twitter", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "twitter" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "consentPrivacyPolicy", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", style: { margin: 0 }, children: "I agree to Newlife's privacy policy" }) }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "consentEmail", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, rules: [
                            {
                                required: true,
                            },
                        ], children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", style: { margin: 0 }, children: "I consent to email communications" }) }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "consentTestgroup", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", style: { margin: 0 }, children: "I'd like to join the beta group!" }) }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { hidden: embedded, wrapperCol: { offset: 8, span: 16 }, children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "api.user.create", type: "primary", htmlType: "submit", progressText: "Creating user...", children: "Submit" }) })] })] }));
};
exports.UserCreate = UserCreate;
//# sourceMappingURL=UserCreate.js.map