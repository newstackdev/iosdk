import { AUTH_FLOW_STATUS } from "../../../../overmind/auth/state";
import { CrossCircleErr } from "../../../User/UserCreate";
import { FormInstance } from "antd";
import { Input } from "antd";
import { NLView } from "../../../../types";
import { ProgressButton } from "../../../../Components/ProgressButton";
import { layout } from "../../Auth";
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
      {...layout}
      hidden={state.auth.status !== AUTH_FLOW_STATUS.RECEIVED}
      name="basic"
      initialValues={{ phoneVerificationCode: "" }} // 111111
      onFinish={({ phoneVerificationCode }) =>
        actions.firebase.verifyPhone({
          phoneVerificationCode,
        })
      }
      autoComplete="off"
    >
      <Form.Item
        label="Phone verification"
        name="phoneVerificationCode"
        rules={[
          {
            required: true,
            message: "Enter your verification code",
          },
        ]}
        className="nl-auth-page-form__height"
      >
        <Input
          className="text-center"
          placeholder="enter verification code"
          suffix={<CrossCircleErr />}
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
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: layout.labelCol.span,
        }}
        hidden={embedded}
      >
        {!embedded && (
          <ProgressButton actionName="auth.firebaseVerifyPhone" type="primary" htmlType="submit" progressText="Verifying...">
            Submit
          </ProgressButton>
        )}
      </Form.Item>
    </Form>
  );
};

export default CodeForm;
