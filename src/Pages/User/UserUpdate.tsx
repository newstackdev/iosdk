import { Button, Checkbox, Col, Input, Modal, Row } from "antd";
import { ContentImage } from "../../Components/Image";
import { ContentLayout } from "../../Components/ContentLayout";
import { EmbeddableControl, NLView } from "../../types";
import { FieldData } from "rc-field-form/lib/interface";
import { LogOut } from "../../Components/Icons/LogOut";
import { PictureWallFormItem } from "../../Components/PicturesWall";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { SOCIAL_MEDIA } from "../../Components/UserWidget";
import { SocialLink } from "../../Components/SocialLink";
import { Success } from "../../Components/Icons/Success";
import { UserCreateRequest, UserUpdateRequest } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { isEmpty, omit } from "lodash";
import { stage } from "../../config";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import Form from "antd/lib/form";
import UserUpdateHeader from "./UserUpdateHeader";
import UserUpdateInfo from "./UserUpdateInfo";

export const UserUpdate: NLView<EmbeddableControl & { hideUsername?: boolean; noRouing?: boolean }> = ({
  // hideUsername,
  // noRouing,
  embedded,
  setNext,
}) => {
  const state = useAppState();
  const actions = useActions();
  const effects = useEffects();

  const [form] = useForm();

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    if (url.get("status") === "error") {
      effects.ux.message.error(url.get("message"));
    }
    actions.api.user.getCurrent();
  }, []);

  const onFinish = async (values: UserUpdateRequest & { file: any }) => {
    await actions.api.user.update({
      user: omit(values, "file"),
      file: values.file?.fileList[0],
    });
    actions.routing.historyPush({ location: "/my/profile" });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    effects.ux.message.error(JSON.stringify(errorInfo));
  };

  const sf = state.api.auth.user || {};

  const onVerifySocial = (provider: string) => {
    window.open(
      `https://api-${stage}.newlife.io/creator/auth/provider/${provider}?token=${state.firebase.token}&redirect_url=${window.location.href}`,
      "_self",
    );
  };

  const verify = (provider: string): React.ReactNode => {
    if (provider === "soundcloud") {
      return false;
    }

    const sanitizedProvider = provider.replace(/[0-9]/g, "");
    return !isSocialVerified(sanitizedProvider) ? (
      <Button className="secondary-button nl-social-media-verify" onClick={() => onVerifySocial(provider)}>
        <span className="paragraph-2b">Verify</span>
      </Button>
    ) : (
      <Success />
    );
  };

  const getSocialIcon = (social: string) => {
    return <SocialLink user={state.api.auth.user} platform={social} disableLink />;
  };

  const isSocialVerified = (social: string) => {
    return state.api.auth.user.verifiedSocialIds?.includes(social);
  };

  const getSocialMediaInputs = () => {
    return SOCIAL_MEDIA.map((social) => {
      const isVerified = isSocialVerified(social);
      let cls = `nl-userUpdate-social-input nl-social-input-${social} ${isVerified ? "nl-social-input-verified" : ""}`;

      return (
        <Form.Item
          key={social}
          name={social}
          rules={
            social === "instagram"
              ? [
                  {
                    // required: true,
                    message: "Your instagram please",
                  },
                ]
              : undefined
          }
        >
          <Input
            placeholder={social}
            suffix={verify(social === "twitter" || social === "tumblr" ? `${social}2` : social)}
            prefix={getSocialIcon(social)}
            disabled={isVerified}
            className={cls}
          />
        </Form.Item>
      );
    });
  };

  return (
    <div className="section-divider">
      <Form
        name="basic"
        wrapperCol={{ span: 24 }}
        className="text-center"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={sf}
      >
        <ContentLayout header={<UserUpdateHeader />} info={<UserUpdateInfo embedded={embedded} />} isPost>
          <div className="post-create-form-width">
            <h2 className="text-center header-5" style={{ margin: "0 auto 20px auto", textAlign: "left" }}>
              My links
            </h2>
            {/* <Form.Item
							name="lastName"
							rules={[
								{
									required: true,
									message: "Please input your last name!",
								},
							]}
						>
							<Input placeholder="last name" />
						</Form.Item> */}
            <Form.Item name="website">
              <Input placeholder="website" />
            </Form.Item>
            {getSocialMediaInputs()}
            <Form.Item name="consentEmail" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
              <RowCheckbox>
                <p className="paragraph-2r" style={{ marginLeft: "20px" }}>
                  I agree to receive relevant communication
                </p>
              </RowCheckbox>
            </Form.Item>
            <Form.Item name="consentTestgroup" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
              <RowCheckbox>
                <p className="paragraph-2r" style={{ marginLeft: "20px" }}>
                  I would like to take part in the test group
                </p>
              </RowCheckbox>
            </Form.Item>
            <span style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "20px" }}>Sign Out</span>
              <LogOut />
            </span>
          </div>
        </ContentLayout>
      </Form>
    </div>
  );
};

// function logout() {
//     throw new Error("Function not implemented.");
// }
