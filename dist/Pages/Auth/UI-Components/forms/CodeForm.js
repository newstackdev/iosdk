import { jsx as _jsx } from "react/jsx-runtime";
import { AUTH_FLOW_STATUS } from "../../../../overmind/auth/state";
import { CrossCircleErr } from "../../../User/UserCreate";
import { Input } from "antd";
import { useActions, useAppState } from "../../../../overmind";
import Form from "antd/lib/form";
const CodeForm = ({ setIsErrorSubmit, embedded, codeForm }) => {
    const state = useAppState();
    const actions = useActions();
    return (_jsx(Form, { form: codeForm, hidden: state.auth.status !== AUTH_FLOW_STATUS.RECEIVED, name: "basic", initialValues: { phoneVerificationCode: "" }, onFinish: async ({ phoneVerificationCode }) => {
            await actions.firebase.verifyPhone({
                phoneVerificationCode,
            });
        }, autoComplete: "off", className: "nl-onboarding-form", children: _jsx(Form.Item, { name: "phoneVerificationCode", rules: [
                {
                    required: true,
                    message: "Enter your verification code",
                },
            ], className: "nl-onboarding-form-item", children: _jsx(Input, { className: "nl-onboarding-input nl-onboarding-input-code", placeholder: "enter verification code", suffix: _jsx(CrossCircleErr, {}), autoFocus: true, onChange: () => codeForm
                    .validateFields()
                    .then(() => {
                    setIsErrorSubmit(false);
                })
                    .catch((e) => {
                    if (e.errorFields?.length) {
                        setIsErrorSubmit(true);
                    }
                }) }) }) }));
};
export default CodeForm;
//# sourceMappingURL=CodeForm.js.map