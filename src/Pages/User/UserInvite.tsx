import { ContentLayout } from "../../Components/ContentLayout";
import { Form, Input } from "antd";
import { IUserInvite } from "./interfaces/IUser";
import { NLView } from "../../types";
import { ProgressButton } from "../../Components/ProgressButton";
import { SOCIAL_MEDIA } from "../../Components/UserWidget";
import { Spin } from "../../Components/Spin";
import { useActions } from "../../overmind";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import UserInviteInfo from "./UserInviteInfo";

export const UserInvite: NLView = () => {
  const [form] = useForm();
  const actions = useActions();
  const [status, setStatus] = useState<"start" | "inprogress" | "failed" | "done">("start");
  const [fullName, setFullName] = useState<string | undefined>(undefined);

  const onFinish = async (data: IUserInvite) => {
    try {
      setFullName(data.fullName);
      await actions.api.user.invite({ userInvite: data });
      setStatus("done");
    } catch (ex) {
      setStatus("failed");
    }
  };

  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phoneReg = "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,7}$";

  switch (status) {
    case "inprogress":
      return <Spin />;
    case "failed":
      return <div>Something went wrong</div>;
    case "done":
      return <UserInviteInfo invitedUsername={fullName} setStatus={setStatus} form={form} />;
    case "start":
      return (
        <ContentLayout customClass="text-center">
          <p className="super-size font-variant-none" style={{ marginBottom: "40px" }}>
            Invite a friend
          </p>
          <Form
            name="basic"
            form={form}
            // labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            // value={{ state }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{}}
            style={{ width: "40%" }}
          >
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
              name="phone"
              rules={[
                {
                  required: true,
                  message: "The phone number is invalid.",
                  pattern: new RegExp(phoneReg),
                },
              ]}
            >
              <Input placeholder="phone" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  pattern: new RegExp(emailReg),
                  message: "Please input valid email.",
                },
              ]}
            >
              <Input placeholder="email" />
            </Form.Item>
            {SOCIAL_MEDIA.map((social) => (
              <Form.Item name={social} key={social}>
                <Input placeholder={social} />
              </Form.Item>
            ))}
            <Form.Item>
              <div className="u-margin-top-large">
                <ProgressButton actionName="api.user.invite" progressText="Inviting user..." type="primary" htmlType="submit">
                  Send an invite
                </ProgressButton>
              </div>
            </Form.Item>
          </Form>
        </ContentLayout>
      );
  }
};
