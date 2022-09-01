import { Button, Checkbox, Input, Row, notification } from "antd";
import { ErrorResponse, UserCreateRequest, UserUpdateRequest } from "@newstackdev/iosdk-newgraph-client-js";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import Form from "antd/lib/form";
// import { logout } from "./Auth";
import { ContentLayout } from "../../Components/ContentLayout";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
import { EmbeddableControl, NLView } from "../../types";
import { FieldData } from "rc-field-form/lib/interface";
import { IndeterminateProgress, IndeterminateProgressAction } from "../../Components/IndeterminateProgress";
import { ProgressButton } from "../../Components/ProgressButton";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { User } from "@firebase/auth";
import { assert } from "console";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useForm } from "antd/lib/form/Form";
import { useHistory } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";

const defaultCreateFormValues = [
  "consentEmail",
  "consentTestgroup",
  "description",
  "discord",
  "displayName",
  "email",
  "facebook",
  "id",
  "instagram",
  "pinterest",
  "soundcloud",
  "tumblr",
  "twitter",
  "website",
  "youtube",
];

export const CrossCircleErr: NLView<{ children?: JSX.Element }> = ({ children }) => {
  return (
    <>
      {children}
      <div className="error-circle-form ">
        <CrossCircle />
      </div>
    </>
  );
};

export const UserCreate: NLView<
  EmbeddableControl & {
    hideUsername?: boolean;
    noRouing?: boolean;
  }
> = ({ hideUsername, noRouing, embedded, setNext }) => {
  const state = useAppState();
  const actions = useActions();
  const effects = useEffects();
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);

  const [form] = useForm();

  const username = state.flows.user.create.form.username;

  useEffect(() => {
    actions.routing.setBreadcrumbs([{ text: "Create your profile" }]);
    // For imported users, if they have email, they should not be able to change it
    setIsEmailAvailable(!isEmpty(state.flows.user.create.form.email));
  }, []);

  const setNextEmbedded = () => {
    (!state.api.auth.user?.username || state.flows.user.create.legacyToken) && //["invited", "imported", "known"].includes(state.api.auth.user.status || "") &&
      setNext &&
      setNext({
        text: "Next",
        command: () => form.submit(),
      });

    return () => setNext && setNext(undefined);
  };

  const sf = state.flows.user.create.form;

  useEffect(setNextEmbedded, [sf]);

  const onFinish = async (values: UserCreateRequest) => {
    console.log("Creating:", values);

    try {
      await form.validateFields();
    } catch (e: any) {
      console.log(e.errorFields.length);
      return;
    }

    if (state.flows.user.create.metamaskFlow) {
      await actions.api.user.update({
        user: {
          ...pick(state.api.auth.user, defaultCreateFormValues),
          id: state.api.auth.user.id || "",
          ...values,
        },
      });
      actions.routing.historyPush({ location: "/explore" });
      return;
    }
    actions.flows.user.create.create({
      noRouting: !!noRouing,
      user: values,
    });
  };

  // const onFinishFailed = (errorInfo: any) => {
  //     console.log('Failed:', errorInfo);
  //     effects.ux.message.error(JSON.stringify(errorInfo))
  // };

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <ContentLayout>
      <p className="super-size font-variant-none" style={{ marginBottom: "40px" }}>
        {username}
      </p>
      <Form
        name="sign-up-form"
        form={form}
        // labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        // value={{ state }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFieldsChange={(_ch, all) => {
          const upd = _ch.reduce(
            (r, c: FieldData) =>
              // @ts-ignore
              ({ ...r, [c.name[0]]: c.value || c.values }),
            sf as Partial<UserCreateRequest>,
          );

          actions.flows.user.create.updateForm(upd as UserCreateRequest);

          sessionStorage.setItem("cachedOnboarding", JSON.stringify(state.flows.user.create));
        }}
        initialValues={sf}
      >
        <Form.Item
          name="couponCode"
          hidden={true}
          rules={[
            {
              // required: !hideUsername,
              // validator: (_, v) => (/^[A-Za-z0-9\.]{4,12}$/.test(v) ? Promise.resolve() : Promise.reject()),
              // validator: (_, v) => (/^[\w](?!.*?\.{2})[\w.]{1,9}[\w]$/.test(v)) ? Promise.resolve() : Promise.reject(),
              // message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="username" suffix={<CrossCircleErr />} />
        </Form.Item>
        <Form.Item
          name="username"
          hidden={hideUsername}
          rules={[
            {
              required: !hideUsername,
              validator: (_, v) => (/^[A-Za-z0-9\.]{4,12}$/.test(v) ? Promise.resolve() : Promise.reject()),
              // validator: (_, v) => (/^[\w](?!.*?\.{2})[\w.]{1,9}[\w]$/.test(v)) ? Promise.resolve() : Promise.reject(),
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="username" suffix={<CrossCircleErr />} />
        </Form.Item>
        <Form.Item
          name="newcoinTicker"
          rules={[
            {
              required: true,
              pattern: /^[a-z]{3,7}$/,
              message: "3 - 7 characters, latin alphabet only",
            },
          ]}
        >
          <Input placeholder="newcoin ticker" suffix={<CrossCircleErr />} />
        </Form.Item>
        <Form.Item
          name="displayName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="name" suffix={<CrossCircleErr />} />
        </Form.Item>
        {/* <Form.Item
					name="firstName"
					rules={[
						{
							required: true,
							message: "Please enter your first name.",
						},
					]}
				>
					<Input placeholder="name" suffix={<CrossCircleErr />} />
				</Form.Item> */}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              pattern: new RegExp(re),
              message: "Please input valid email.",
            },
          ]}
        >
          <Input
            placeholder="email"
            suffix={<CrossCircleErr />}
            disabled={isEmailAvailable && state.flows.user.create.isLegacyUpdateOngoing}
          />
        </Form.Item>

        {/* <Form.Item
					name="lastName"
					rules={[
						{
							required: true,
							message: "Please input your last name!",
						},
					]}
				>
					<Input
						placeholder="last name"
						suffix={<CrossCircleErr />}
					/>
				</Form.Item> */}
        <Form.Item name="description">
          <Input.TextArea placeholder="bio" />
        </Form.Item>
        <Form.Item name="website">
          <Input placeholder="website" />
        </Form.Item>
        <Form.Item name="twitter">
          <Input placeholder="twitter" />
        </Form.Item>
        <Form.Item name="discord">
          <Input placeholder="discord" />
        </Form.Item>
        <Form.Item name="instagram">
          <Input placeholder="instagram" />
        </Form.Item>
        <Form.Item name="tumblr">
          <Input placeholder="tumblr" />
        </Form.Item>
        <Form.Item name="soundcloud">
          <Input placeholder="soundcloud" />
        </Form.Item>
        <p className="paragraph-2r u-margin-top-medium u-margin-bottom-medium">You can add or edit socials later!</p>

        <Form.Item
          name="consentPrivacyPolicy"
          valuePropName="checked"
          wrapperCol={{ offset: 0, span: 24 }}
          rules={[
            {
              required: true,
              message: "please confirm",
            },
          ]}
        >
          <RowCheckbox>
            <p className="paragraph-2r" style={{ margin: 0 }}>
              I agree to Newlife's{" "}
              <span className="paragraph-2u">
                <a href="/privacy_policy" target="_blank">
                  privacy policy
                </a>
              </span>
            </p>
          </RowCheckbox>
        </Form.Item>
        <Form.Item name="consentEmail" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
          <RowCheckbox>
            <p className="paragraph-2r" style={{ margin: 0 }}>
              I consent to email communications
            </p>
          </RowCheckbox>
        </Form.Item>
        <Form.Item name="consentTestgroup" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
          <RowCheckbox>
            <p className="paragraph-2r" style={{ margin: 0 }}>
              I'd like to join the beta group!
            </p>
          </RowCheckbox>
        </Form.Item>
        {/* <Form.Item
					hidden={!embedded}
					wrapperCol={{ offset: 0, span: 24 }}
				>
					<IndeterminateProgressAction actionName="api.user.create" />
				</Form.Item> */}
        <Form.Item hidden={embedded} wrapperCol={{ offset: 8, span: 16 }}>
          <ProgressButton actionName="api.user.create" type="primary" htmlType="submit" progressText="Creating user...">
            Submit
          </ProgressButton>
        </Form.Item>
      </Form>
    </ContentLayout>
  );
};

// function logout() {
//     throw new Error("Function not implemented.");
// }
