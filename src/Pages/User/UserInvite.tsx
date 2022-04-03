import { Input, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { ContentLayout } from "../../Components/ContentLayout";
import { ProgressButton } from "../../Components/ProgressButton";
import { Spin } from "../../Components/Spin";
import { useActions } from "../state";
import { NLView } from "../../types";

export const UserInvite: NLView = () => {
  const [form] = useForm();
  const actions = useActions();
  const [status, setStatus] = useState<
    "start" | "inprogress" | "failed" | "done"
  >("start");
  const [fullName, setFullName] = useState("");

  const onFinish = async (data: {
    phone: string;
    email: string;
    fullName: string;
  }) => {
    try {
      setFullName(data.fullName);
      await actions.api.user.invite({ userInvite: data });
      setStatus("done");
    } catch (ex) {
      setStatus("failed");
    }
  };

  switch (status) {
    case "inprogress":
      return <Spin />;
    case "failed":
      return <div>Something wend wronk</div>;
    case "done":
      return <div>You invited {fullName}</div>;
    case "start":
      return (
        <div>
          <h2 className="app-main-title-spacing header-2">Invite a friend</h2>
          <Form
            name="basic"
            form={form}
            // labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            // value={{ state }}
            onFinish={onFinish}
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
              <Input placeholder="email" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <ProgressButton
                actionName="api.user.invite"
                type="primary"
                htmlType="submit"
              >
                Submit
              </ProgressButton>
            </Form.Item>
          </Form>
        </div>
      );
  }

  return <ContentLayout></ContentLayout>;
};
