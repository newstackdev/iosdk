import { ContentLayout } from "../../Components/ContentLayout";
import { Form, Input } from "antd";
import { NLView } from "../../types";
import { ProgressButton } from "../../Components/ProgressButton";
import { useActions } from "../../overmind";
import { useForm } from "antd/lib/form/Form";

export const UserInvite: NLView = () => {
  const [form] = useForm();
  const actions = useActions();

  return (
    <ContentLayout>
      <div>
        <h2 className="app-main-title-spacing header-2">Invite a friend</h2>
        <Form
          name="basic"
          form={form}
          // labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          // value={{ state }}
          onFinish={(data) => actions.api.user.invite({ userInvite: data })}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          // initialValues={sf}
        >
          <Form.Item
            name="phone"
            rules={[
              {
                message: "Please input your username!",
                required: true,
              },
            ]}
          >
            <Input placeholder="phone" />
          </Form.Item>
          <Form.Item
            name="fullName"
            rules={[
              {
                message: "Please input your username!",
                required: true,
              },
            ]}
          >
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                message: "",
              },
            ]}
          >
            <Input placeholder="username" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <ProgressButton actionName="api.user.invite" progressText="Inviting user..." type="primary" htmlType="submit">
              Submit
            </ProgressButton>
          </Form.Item>
        </Form>
      </div>
    </ContentLayout>
  );
};
