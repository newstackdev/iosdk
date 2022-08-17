import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AUTH_FLOW_STATUS } from "../../../../overmind/auth/state";
import { Button, Input } from "antd";
import { CrossCircleErr } from "../../../User/UserCreate";
import { isEmpty } from "lodash";
import { layout } from "../../Auth";
import { useActions, useAppState } from "../../../../overmind";
import { useState } from "react";
import Form from "antd/lib/form";
const PhoneForm = ({ setIsErrorSubmit, embedded, phoneForm }) => {
    const state = useAppState();
    const actions = useActions();
    const [customClassName, setCustomClassName] = useState("");
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
    return (_jsxs(Form, { form: phoneForm, hidden: state.auth.status !== AUTH_FLOW_STATUS.ANONYMOUS, ...layout, name: "basic", initialValues: { phone: "" }, onFinish: ({ phone }) => {
            actions.firebase.requestToken({ phone: isPhonePresent && embedded ? state.flows.user.create.form.phone : phone });
            // phoneForm.resetFields();
        }, 
        // onFinishFailed={onFinishFailed}
        autoComplete: "off", className: "text-center", children: [_jsx(Form.Item, { name: "phone", rules: [
                    {
                        required: !isPhonePresent,
                        message: "The phone number is invalid.",
                        pattern: new RegExp(reg),
                    },
                ], className: "nl-auth-page-form__height", children: _jsx(Input, { className: "text-center", placeholder: isPhonePresent && embedded ? maskedPhoneNum : "enter phone number", disabled: isPhonePresent && embedded, suffix: _jsx(CrossCircleErr, {}), autoFocus: true, onChange: (values) => {
                        if (!values.target.value.includes("+")) {
                            phoneForm.setFieldsValue({
                                phone: "+" + values.target.value,
                            });
                        }
                        phoneForm
                            .validateFields()
                            .then(() => setIsErrorSubmit && setIsErrorSubmit(false))
                            .catch((e) => {
                            if (e.errorFields?.length) {
                                setIsErrorSubmit && setIsErrorSubmit(true);
                            }
                        });
                        const customClassName = phoneForm.getFieldValue("phone").match(reg) ? "" : "disabled-submit-button";
                        setCustomClassName(customClassName);
                    } }) }), _jsx("div", { className: "app-control-surface", hidden: embedded, children: _jsx(Button, { type: "primary", htmlType: "submit", className: customClassName, children: "Send verification" }) })] }));
};
export default PhoneForm;
//# sourceMappingURL=PhoneForm.js.map