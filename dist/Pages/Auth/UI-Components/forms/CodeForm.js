import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AUTH_FLOW_STATUS } from "../../../../overmind/auth/state";
import { CrossCircleErr } from "../../../User/UserCreate";
import { Input } from "antd";
import { ProgressButton } from "../../../../Components/ProgressButton";
import { layout } from "../../Auth";
import { useActions, useAppState } from "../../../../overmind";
import Form from "antd/lib/form";
const CodeForm = ({ setIsErrorSubmit, embedded, codeForm }) => {
    const state = useAppState();
    const actions = useActions();
    return (_jsxs(Form, { form: codeForm, ...layout, hidden: state.auth.status !== AUTH_FLOW_STATUS.RECEIVED, name: "basic", initialValues: { phoneVerificationCode: "" }, onFinish: async ({ phoneVerificationCode }) => {
            await actions.firebase.verifyPhone({
                phoneVerificationCode,
            });
        }, autoComplete: "off", children: [_jsx(Form.Item, { label: "Phone verification", name: "phoneVerificationCode", rules: [
                    {
                        required: true,
                        message: "Enter your verification code",
                    },
                ], className: "nl-auth-page-form__height", children: _jsx(Input, { className: "text-center", placeholder: "enter verification code", suffix: _jsx(CrossCircleErr, {}), onChange: () => codeForm
                        .validateFields()
                        .then(() => {
                        setIsErrorSubmit(false);
                    })
                        .catch((e) => {
                        if (e.errorFields?.length) {
                            setIsErrorSubmit(true);
                        }
                    }) }) }), _jsx(Form.Item, { wrapperCol: {
                    ...layout.wrapperCol,
                    offset: layout.labelCol.span,
                }, hidden: embedded, children: !embedded && (_jsx(ProgressButton, { actionName: "auth.firebaseVerifyPhone", type: "primary", htmlType: "submit", progressText: "Verifying...", children: "Submit" })) })] }));
};
export default CodeForm;
//# sourceMappingURL=CodeForm.js.map