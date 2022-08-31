import { jsx as _jsx } from "react/jsx-runtime";
import { AUTH_FLOW_STATUS } from "../../../../overmind/auth/state";
import { Input } from "antd";
import { CrossCircleErr } from "../../../User/UserCreate";
import { isEmpty } from "lodash";
import { useActions, useAppState } from "../../../../overmind";
import Form from "antd/lib/form";
const PhoneForm = ({ setIsErrorSubmit, embedded, phoneForm }) => {
    const state = useAppState();
    const actions = useActions();
    const phoneNumArr = state.flows.user.create.form.phone?.split("");
    const maskedPhoneNum = phoneNumArr
        ?.map((char, i) => {
        if (i < phoneNumArr.length - 3 && i > 3) {
            return "X";
        }
        return char;
    })
        .join("");
    const isPhonePresent = !isEmpty(state.flows.user.create.form.phone);
    const reg = "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,7}$";
    return (_jsx(Form, { form: phoneForm, hidden: state.auth.status !== AUTH_FLOW_STATUS.ANONYMOUS, name: "basic", initialValues: { phone: "" }, onFinish: ({ phone }) => {
            actions.firebase.requestToken({ phone: isPhonePresent && embedded ? state.flows.user.create.form.phone : phone });
            // phoneForm.resetFields();
        }, 
        // onFinishFailed={onFinishFailed}
        autoComplete: "off", className: "nl-onboarding-form", children: _jsx(Form.Item, { name: "phone", className: "nl-onboarding-form-item", validateTrigger: "onBlur", rules: [
                {
                    required: !isPhonePresent,
                    message: "The phone number is invalid.",
                    pattern: new RegExp(reg),
                },
            ], children: _jsx(Input, { className: `nl-onboarding-input nl-onboarding-input-phone ${isPhonePresent && embedded ? "nl-onboarding-input-phone-disabled text-center" : null}`, placeholder: isPhonePresent && embedded ? maskedPhoneNum : "enter phone number", disabled: isPhonePresent && embedded, suffix: isPhonePresent && embedded ? undefined : _jsx(CrossCircleErr, {}), autoFocus: true, onChange: (values) => {
                    if (!values.target.value.includes("+")) {
                        phoneForm.setFieldsValue({
                            phone: "+" + values.target.value,
                        });
                    }
                    if (!new RegExp(reg).test(values.target.value)) {
                        setIsErrorSubmit && setIsErrorSubmit(true);
                    }
                    else {
                        setIsErrorSubmit && setIsErrorSubmit(false);
                    }
                } }) }) }));
};
export default PhoneForm;
//# sourceMappingURL=PhoneForm.js.map