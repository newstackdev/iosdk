import { Button, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContentLayout } from "../../Components/ContentLayout";
import { ProgressButton } from "../../Components/ProgressButton";
import { Spin } from "../../Components/Spin";
import SupportBox from "../../Components/SupportBox";
import { useActions, useAppState } from "../state";
import { NLView } from "../../types";
import { capFirst } from "../../utils/capFirst";

const STATUS = {
  NONE: 0,
  LINK_NO_EMAIL: 1,
  LINK_EMAIL: 2,
  LINK_REQUESTED: 3,
  ERROR: 4,
  AUTHENTICATED_CANTPROCEED: 5,
  AUTHORIZED: 6,
};

export const LegacyLogin: NLView = () => {
  const [form] = useForm();
  const actions = useActions();
  const state = useAppState();

  const [status, setStatus] = useState<number>(STATUS.NONE);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  // const indicators = state.indicators.specific;
  // const authorizing = state.auth.status > 0 && !state.auth.authorized && !state.auth.authenticated;
  // oobCode &&
  // ["auth.newlifeAuthorize", "auth.refreshApiToken", "auth.firebaseSignInWithEmailLink"]
  //     .find(n => indicators[n]);
  const oobCode = new URLSearchParams(window.location.search).get("oobCode");

  const signIn = async (email: string) => {
    try {
      await actions.firebase.signInWithEmailLink({ email });
    } catch (ex) {
      setStatus(STATUS.ERROR);
      setError(
        capFirst(
          (ex as { code: string }).code
            .replace(/^auth\//, "")
            .replace(/-/g, " ")
        )
      );
      actions.auth.logout({ noRouting: true });
    }
  };

  const tryAgain = () => {
    actions.routing.historyPush({ location: "/auth/legacy" });
    setStatus(STATUS.NONE);
    setError("");
    actions.auth.logout({ noRouting: true });
  };

  useEffect(() => {
    if (state.flows.user.create.legacyToken)
      actions.flows.user.create.stopLegacyImport({ noRedirect: true });

    if (oobCode) {
      const email: string = window.localStorage.getItem("emailForSignIn") || "";
      setStatus(email ? STATUS.LINK_EMAIL : STATUS.LINK_NO_EMAIL);

      email && signIn(email);
    } else if (state.auth.authenticated) {
      if (
        !state.api.auth.authorized &&
        state.api.auth.user?.status !== "imported"
      ) {
        // actions.routing.historyPush({ location: "/" });
        setStatus(STATUS.AUTHENTICATED_CANTPROCEED);
        actions.auth.logout();
      }
    }
    setStatus(state.api.auth.authorized ? STATUS.AUTHORIZED : STATUS.NONE);
  }, []);

  useEffect(() => {
    if (
      !(oobCode && state.auth.status > 0) ||
      state.indicators.specific["auth.handleAuthChange"]
    ) {
      return;
    }

    const st =
      state.auth.authenticated &&
      (state.api.auth.authorized
        ? STATUS.AUTHORIZED
        : STATUS.AUTHENTICATED_CANTPROCEED);

    if (st) {
      setStatus(st);
    }
  }, [state.auth.status, state.api.auth.authorized]);

  const onFinish = ({ email }: { email: string }) => {
    switch (status) {
      case STATUS.NONE:
        window.localStorage.setItem("emailForSignIn", email);
        setStatus(STATUS.LINK_REQUESTED);
        setEmail(email);

        actions.firebase.requestEmailLink({ email });
        break;
      case STATUS.LINK_NO_EMAIL:
        signIn(email);
    }
  };

  if (state.indicators.isWorking) return <Spin />;

  if (error)
    return (
      <>
        <h2 className="heading-2">Error: {error}</h2>
        <div className="section-divider" />
        <Row>
          <Col xs={24} xxl={12}>
            <Button onClick={tryAgain}>Try again</Button>
          </Col>
          <Col xs={24} xxl={12}>
            <Button
              onClick={() => actions.routing.historyPush({ location: "/" })}
            >
              Get onboarded using your phone
            </Button>
          </Col>
        </Row>
      </>
    );
  return (
    <>
      {/* authorized status {state.auth.status}
        {JSON.stringify(state.api.auth.user)}
        local status {status} */}

      {state.auth.authenticated ? (
        <>
          {state.api.auth.authorized ? (
            <>
              <div className="section-divider" />
              <h2>
                Hi{" "}
                {state.api.auth.user?.username ||
                  state.api.auth.user?.displayName}
                , we've been missing you!
              </h2>
              <div className="section-divider" />
              <p>
                Please take a few steps to access the brand new version of
                Newlife.
              </p>
              <div className="section-divider" />
              <Button
                onClick={() => actions.flows.user.create.startLegacyImport()}
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <h2>
                Email authorization is only available for existing users of
                Newlife V1.
              </h2>
              <br />
              <p>
                We could not find your email in our database.
                <ul className="app-ul-simple">
                  <li>
                    {email ? (
                      <>
                        You used the email {email}
                        <br />
                      </>
                    ) : (
                      ""
                    )}
                    Please make sure you are using the same email you were using
                    to access Newlife V1. You may want to
                    <div className="section-divider" />
                    <Button onClick={tryAgain}>Try again</Button>
                  </li>
                  <li>
                    Please make sure you have not migrated your account to v2
                    yet. If you had
                    <div className="section-divider" />
                    <Button
                      onClick={() =>
                        actions.routing.historyPush({
                          location: "/auth",
                        })
                      }
                    >
                      Sign in using your phone
                    </Button>
                  </li>
                  <li>
                    If you still believe this is an error please contact Newlife
                    at info@newlife.io and we will try to help.
                  </li>
                  <li>
                    Otherwise
                    <div className="section-divider" />
                    <Button
                      onClick={() =>
                        actions.routing.historyPush({
                          location: "/",
                        })
                      }
                    >
                      Get onboard using your phone
                    </Button>
                  </li>
                </ul>
                <br />
                <br />
                <br />
                <br />
              </p>
            </>
          )}
        </>
      ) : (
        <></>
      )}
      {status == STATUS.LINK_REQUESTED ? (
        <>Please check your inbox at {email}</>
      ) : (
        <></>
      )}
      {status === STATUS.NONE && !state.api.auth.user?.id ? (
        <>
          <p className="super-size font-variant-none">join NewLife.IO</p>
          <div className="section-divider" />
          <Form
            form={form}
            name="basic"
            initialValues={{ email: "" }} // +420111111111
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Enter your email" }]}
            >
              <Input placeholder="email" />
            </Form.Item>
            <Form.Item>
              <div className="text-center">
                <ProgressButton
                  actionName="auth.firebaseRequestEmailLink"
                  type="primary"
                  htmlType="submit"
                >
                  Connect my account
                </ProgressButton>
              </div>
            </Form.Item>
            <p className="paragraph-2r text-center">
              <Link to="/">I don't have an account yet!</Link>
            </p>
            <div className="section-divider" />
            <SupportBox />
          </Form>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export const LegacyImport = () => {
  return <LegacyLogin />;
};
