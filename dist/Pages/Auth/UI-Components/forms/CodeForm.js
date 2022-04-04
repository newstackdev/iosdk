"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const form_1 = __importDefault(require("antd/lib/form"));
const overmind_1 = require("../../../../overmind");
const state_1 = require("../../../../overmind/auth/state");
const ProgressButton_1 = require("../../../../Components/ProgressButton");
const UserCreate_1 = require("../../../User/UserCreate");
const Auth_1 = require("../../Auth");
const CodeForm = ({ setIsErrorSubmit, embedded, codeForm }) => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    return ((0, jsx_runtime_1.jsxs)(form_1.default, { form: codeForm, ...Auth_1.layout, hidden: state.auth.status !== state_1.AUTH_FLOW_STATUS.RECEIVED, name: "basic", initialValues: { phoneVerificationCode: "" }, onFinish: ({ phoneVerificationCode }) => actions.firebase.verifyPhone({
            phoneVerificationCode,
        }), autoComplete: "off", children: [(0, jsx_runtime_1.jsx)(form_1.default.Item, { label: "Phone verification", name: "phoneVerificationCode", rules: [
                    {
                        required: true,
                        message: "Enter your verification code",
                    },
                ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { className: "text-center", placeholder: "enter verification code", suffix: (0, jsx_runtime_1.jsx)(UserCreate_1.CrossCircleErr, {}), onChange: () => codeForm
                        .validateFields()
                        .then(() => {
                        setIsErrorSubmit(false);
                    })
                        .catch((e) => {
                        console.log(e.errorFields?.length);
                        if (e.errorFields?.length) {
                            setIsErrorSubmit(true);
                        }
                    }) }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { wrapperCol: {
                    ...Auth_1.layout.wrapperCol,
                    offset: Auth_1.layout.labelCol.span,
                }, hidden: embedded, children: !embedded && ((0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "auth.firebaseVerifyPhone", type: "primary", htmlType: "submit", progressText: "Verifying...", children: "Submit" })) })] }));
};
exports.default = CodeForm;
//# sourceMappingURL=CodeForm.js.map