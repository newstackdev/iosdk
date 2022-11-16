import { ContentLayout } from "../../Components/ContentLayout";
import { EmbeddableControl, NLView } from "../../types";
import { Input, Row } from "antd";
import { LogOut } from "../../Components/Icons/LogOut";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { SocialMediaInputs } from "../../Components/Input/SocialMediaInputs";
import { UserUpdateRequest } from "@newstackdev/iosdk-newgraph-client-js";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import Form from "antd/lib/form";
import UserUpdateHeader from "./UserUpdateHeader";
import UserUpdateInfo from "./UserUpdateInfo";
import omit from "lodash/omit";

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
            <SocialMediaInputs enableVerify />
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
            <Row justify="end" align="bottom" onClick={() => actions.auth.logout()} className="cursor-pointer">
              <span className="u-margin-right-small ">Sign Out</span>
              <LogOut />
            </Row>
          </div>
        </ContentLayout>
      </Form>
    </div>
  );
};

// function logout() {
//     throw new Error("Function not implemented.");
// }
