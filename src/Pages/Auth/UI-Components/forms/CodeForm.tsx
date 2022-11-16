import { AUTH_FLOW_STATUS } from "../../../../overmind/auth/state";
import { CrossCircleErr } from "../../../User/UserCreate";
import { FormInstance } from "antd";
import { Input } from "antd";
import { NLView } from "../../../../types";
import { useActions, useAppState } from "../../../../overmind";
import Form from "antd/lib/form";

const CodeForm: NLView<{
  setIsErrorSubmit: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  embedded: boolean | undefined;
  codeForm: FormInstance<any>;
}> = ({ setIsErrorSubmit, embedded, codeForm }) => {
  const state = useAppState();
  const actions = useActions();

  return (
    <Form
      form={codeForm}
      hidden={state.auth.status !== AUTH_FLOW_STATUS.RECEIVED}
      name="basic"
      initialValues={{ phoneVerificationCode: "" }} // 111111
      onFinish={async ({ phoneVerificationCode }) => {
        await actions.firebase.verifyPhone({
          phoneVerificationCode,
        });
      }}
      autoComplete="off"
      className="nl-onboarding-form"
    >
      <Form.Item
        name="phoneVerificationCode"
        rules={[
          {
            required: true,
            message: "Enter your verification code",
          },
        ]}
        className="nl-onboarding-form-item"
      >
        <Input
          id="basic_phoneVerificationCode"
          className="nl-onboarding-input nl-onboarding-input-code"
          placeholder="enter verification code"
          suffix={<CrossCircleErr />}
          autoFocus
          onChange={() =>
            codeForm
              .validateFields()
              .then(() => {
                setIsErrorSubmit!(false);
              })
              .catch((e) => {
                if (e.errorFields?.length) {
                  setIsErrorSubmit!(true);
                }
              })
          }
        />
      </Form.Item>
    </Form>
  );
};

export default CodeForm;
