import { Button, Form, Input } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { CreatorsList } from "../../Components/Creators";
import { FormInstance } from "antd-latest";
import { IOView, NLView } from "../../types";
import { IUserInvite } from "./interfaces/IUser";
import { ProgressButton } from "../../Components/ProgressButton";
import { SocialMediaInputs } from "../../Components/Input/SocialMediaInputs";
import { Spin } from "../../Components/Spin";
import { UserInvitationReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { phoneNumberReformat } from "../../utils/phoneNumberReformat";
import { useActions, useAppState } from "../../overmind";
import { useCachedInvitees } from "../../hooks/useCached";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import UserInviteInfo from "./UserInviteInfo";

export const UserInvite: NLView = () => {
  const [form] = useForm();
  const actions = useActions();
  const state = useAppState();
  const [status, setStatus] = useState<"start" | "inprogress" | "failed" | "done">("start");
  const [fullName, setFullName] = useState<string | undefined>(undefined);
  const [hash, setHash] = useState<string | undefined>();
  const [visibleForm, setVisibleForm] = useState<boolean>(false);

  const user = state.api.auth.user;

  const numberOfInvites = user.availableInvites || undefined;

  const onFinish = async (data: IUserInvite) => {
    try {
      setFullName(data.fullName);
      const responseHash = await actions.api.user.invite({ userInvite: data });
      setHash(responseHash);
      setStatus("done");
    } catch (ex) {
      setStatus("failed");
    }
  };

  switch (status) {
    case "inprogress":
      return <Spin />;
    case "failed":
      return (
        <ContentLayout customClass="text-center">
          <div className="paragraph-1r">
            Oops! Looks like something went wrong. <br /> Try to refresh or
            <a href="https://t.me/newcoinprotocol" target="_blank" rel="noreferrer" className="paragraph-1u">
              {" "}
              ask support
            </a>
          </div>
        </ContentLayout>
      );
    case "done":
      return <UserInviteInfo invitedUsername={fullName} setStatus={setStatus} form={form} hash={hash} />;
    case "start":
      return (
        <ContentLayout customClass="text-center" position="top">
          {numberOfInvites === 0 || numberOfInvites === undefined || visibleForm ? (
            <FormInviteFriend form={form} onFinish={onFinish} />
          ) : (
            <InviteesList setVisibleForm={setVisibleForm} maxItems={4} title={"List of invited users"} />
          )}
        </ContentLayout>
      );
  }
};

export const InviteesList: IOView<{
  setVisibleForm: React.Dispatch<React.SetStateAction<boolean>>;
  maxItems?: number;
  title?: string;
}> = ({ setVisibleForm, maxItems, title }) => {
  const inviteesList = useCachedInvitees();
  const state = useAppState();

  const user = state.api.auth.user;

  const numberOfInvites = user.availableInvites ?? 0;

  return (
    <div className="text-center">
      {maxItems !== undefined && (
        <>
          <p className="super-size font-variant-none" style={{ marginBottom: "40px" }}>
            You have {numberOfInvites} invites left
          </p>
          <Button type="primary" onClick={() => setVisibleForm(true)}>
            Share a new invite
          </Button>
        </>
      )}
      <CreatorsList users={inviteesList.value as UserInvitationReadPublicResponse[]} />
    </div>
  );
};

const FormInviteFriend: IOView<{ form: FormInstance<any>; onFinish: (data: IUserInvite) => Promise<void> }> = ({
  form,
  onFinish,
}) => {
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneReg = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;

  return (
    <>
      <p className="super-size font-variant-none" style={{ marginBottom: "40px" }}>
        Invite a friend
      </p>
      <Form
        name="basic"
        className={"nl-user-invite-form"}
        form={form}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{}}
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
          <Input placeholder="name *" />
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
          <Input placeholder="phone *" onChange={(values) => phoneNumberReformat(values, form)} />
        </Form.Item>
        <p className="text-left u-margin-bottom-small header-2 u-margin-top-large">Optional</p>
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
        <SocialMediaInputs />
        <Form.Item>
          <div className="u-margin-top-large">
            <ProgressButton actionName="api.user.invite" progressText="Inviting user..." type="primary" htmlType="submit">
              Generate invite
            </ProgressButton>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
