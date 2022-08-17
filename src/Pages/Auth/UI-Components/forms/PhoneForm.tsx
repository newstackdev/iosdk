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

  return (
    <Form
      form={phoneForm}
      hidden={state.auth.status !== AUTH_FLOW_STATUS.ANONYMOUS}
      {...layout}
      name="basic"
      initialValues={{ phone: "" }} // +420111111111
      onFinish={({ phone }) => {
        actions.firebase.requestToken({ phone: isPhonePresent && embedded ? state.flows.user.create.form.phone : phone });
        // phoneForm.resetFields();
      }}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="text-center"
    >
      <Form.Item
        name="phone"
        rules={[
          {
            required: !isPhonePresent,
            message: "The phone number is invalid.",
            pattern: new RegExp(reg),
          },
        ]}
        className="nl-auth-page-form__height"
      >
        <Input
          className="text-center"
          placeholder={isPhonePresent && embedded ? maskedPhoneNum : "enter phone number"}
          disabled={isPhonePresent && embedded}
          suffix={<CrossCircleErr />}
          autoFocus
          onChange={(values) => {
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
                  setIsErrorSubmit && setIsErrorSubmit!(true);
                }
              });

            const customClassName = phoneForm.getFieldValue("phone").match(reg) ? "" : "disabled-submit-button";

            setCustomClassName(customClassName);
          }}
        />
      </Form.Item>

      <div className="app-control-surface" hidden={embedded}>
        <Button type="primary" htmlType="submit" className={customClassName}>
          Send verification
        </Button>
      </div>
    </Form>
  );
};

export default PhoneForm;
