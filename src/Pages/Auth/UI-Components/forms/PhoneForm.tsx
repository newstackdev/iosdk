import { AUTH_FLOW_STATUS } from "../../../../overmind/auth/state";
import { Button, Input } from "antd";
import { CrossCircleErr } from "../../../User/UserCreate";
import { FormInstance } from "antd";
import { NLView } from "../../../../types";
import { isEmpty } from "lodash";
import { layout } from "../../Auth";
import { useActions, useAppState } from "../../../../overmind";
import { useState } from "react";
import Form from "antd/lib/form";

const PhoneForm: NLView<{
  setIsErrorSubmit: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  embedded: boolean | undefined;
  phoneForm: FormInstance<any>;
}> = ({ setIsErrorSubmit, embedded, phoneForm }) => {
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

  return (
    <Form
      form={phoneForm}
      hidden={state.auth.status !== AUTH_FLOW_STATUS.ANONYMOUS}
      name="basic"
      initialValues={{ phone: "" }} // +420111111111
      onFinish={({ phone }) => {
        actions.firebase.requestToken({ phone: isPhonePresent && embedded ? state.flows.user.create.form.phone : phone });
        // phoneForm.resetFields();
      }}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="nl-onboarding-form"
    >
      <Form.Item
        name="phone"
        className="nl-onboarding-form-item"
        validateTrigger="onBlur"
        rules={[
          {
            required: !isPhonePresent,
            message: "The phone number is invalid.",
            pattern: new RegExp(reg),
          },
        ]}
      >
        <Input
          className={`nl-onboarding-input nl-onboarding-input-phone ${
            isPhonePresent && embedded ? "nl-onboarding-input-phone-disabled text-center" : null
          }`}
          placeholder={isPhonePresent && embedded ? maskedPhoneNum : "enter phone number"}
          disabled={isPhonePresent && embedded}
          suffix={isPhonePresent && embedded ? undefined : <CrossCircleErr />}
          autoFocus
          onChange={(values) => {
            if (!values.target.value.includes("+")) {
              phoneForm.setFieldsValue({
                phone: "+" + values.target.value,
              });
            }
            if (!new RegExp(reg).test(values.target.value)) {
              setIsErrorSubmit && setIsErrorSubmit!(true);
            } else {
              setIsErrorSubmit && setIsErrorSubmit(false);
            }
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default PhoneForm;
