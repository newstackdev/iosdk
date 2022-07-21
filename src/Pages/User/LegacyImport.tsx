import { Button, Col, Form, Input, Row } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { Link } from "react-router-dom";
import { NLView } from "../../types";
import { ProgressButton } from "../../Components/ProgressButton";
import { Spin } from "../../Components/Spin";
import { capFirst } from "../../utils/capFirst";
import { useActions, useAppState } from "../../overmind";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import SupportBox from "../../Components/SupportBox";

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

  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const signIn = async (email: string) => {
    try {
      await actions.firebase.signInWithEmailLink({ email });
    } catch (ex) {
      setStatus(STATUS.ERROR);
      setError(capFirst((ex as { code: string }).code.replace(/^auth\//, "").replace(/-/g, " ")));
      actions.auth.logout({ noRouting: true });
    }
  };

  const tryAgain = () => {
    actions.routing.historyPush({ location: "/auth/newlife-members" });
    setStatus(STATUS.NONE);
    setError("");
    actions.auth.logout({ noRouting: true });
  };

  useEffect(() => {
    if (state.flows.user.create.legacyToken) actions.flows.user.create.stopLegacyImport({ noRedirect: true });

    if (oobCode) {
      const email: string = window.localStorage.getItem("emailForSignIn") || "";
      setStatus(email ? STATUS.LINK_EMAIL : STATUS.LINK_NO_EMAIL);

      email && signIn(email);
    } else if (state.auth.authenticated) {
      if (!state.api.auth.authorized && state.api.auth.user?.id && state.api.auth.user?.status !== "imported") {
        // actions.routing.historyPush({ location: "/" });
        setStatus(STATUS.AUTHENTICATED_CANTPROCEED);
        actions.auth.logout();
      }
    }
    setStatus(state.api.auth.authorized ? STATUS.AUTHORIZED : STATUS.NONE);
  }, []);

  useEffect(() => {
    if (!(oobCode && state.auth.status > 0) || state.indicators.specific["auth.handleAuthChange"]) {
      return;
    }

    const st = state.auth.authenticated && (state.api.auth.authorized ? STATUS.AUTHORIZED : STATUS.AUTHENTICATED_CANTPROCEED);

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
      <div className="text-left">
        <h2 className="header-2">Oops! {error}</h2>
        <div className="section-divider" />
        <Col className="u-margin-bottom-mega">
          <Button onClick={tryAgain} className="secondary-button">
            <span className="paragraph-2r">Try again</span>
          </Button>
        </Col>
        <Col>
          <p
            className="paragraph-2r"
            onClick={() =>
              actions.routing.historyPush({
                location: "/",
              })
            }
          >
            Try
            <span className="paragraph-2u"> on mobile</span>
          </p>
        </Col>
      </div>
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
              <h2>Hi {state.api.auth.user?.username || state.api.auth.user?.displayName}, we've been missing you!</h2>
              <div className="section-divider" />
              <p>Please take a few steps to access the brand new version of Newlife.</p>
              <div className="section-divider" />
              <Button
                onClick={() => {
                  actions.flows.user.create.startLegacyImport();
                }}
              >
                Continue
              </Button>
            </>
          ) : status == STATUS.AUTHENTICATED_CANTPROCEED ? (
            <div className="text-left">
              <p className="header-2">Oops! Looks like you didn’t have an existing account.</p>
              <br />
              <ul style={{ padding: 0 }}>
                <li className="u-margin-bottom-mega">
                  {email ? (
                    <>
                      You used the email {email}
                      <br />
                    </>
                  ) : (
                    ""
                  )}
                  <b>Please check your email address is correct.</b>
                  <div className="section-divider" />
                  <Button onClick={tryAgain} className="secondary-button">
                    <span className="paragraph-2r">Try again</span>
                  </Button>
                </li>
                <li>
                  <b>Or make sure you haven’t already connected to Newlife.IO</b>
                  <div className="section-divider" />
                  <Row>
                    <Button
                      onClick={() =>
                        actions.routing.historyPush({
                          location: "/auth",
                        })
                      }
                      className="secondary-button u-margin-right-medium"
                    >
                      Sign in
                    </Button>
                    <Button
                      onClick={() =>
                        actions.routing.historyPush({
                          location: "/",
                        })
                      }
                      className="secondary-button"
                    >
                      <p className="paragraph-2r">
                        Join <span className="paragraph-2u">on mobile</span>
                      </p>
                    </Button>
                  </Row>
                </li>
              </ul>
              <br />
              <br />
              <br />
              <br />
              <span className="paragraph-2b">
                Still having issues? Email <span className="paragraph-2u">info@newlife.io</span>
              </span>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      {status === STATUS.LINK_REQUESTED && (
        <>
          <p className="super-size font-variant-none text-center">check your inbox</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div>
            <SupportBox />
          </div>
          <div className="section-divider" />

          <p className="paragraph-3b text-center">
            <Link to="#">I don't have an account yet!</Link>
          </p>
        </>
      )}
      {status === STATUS.NONE && !state.api.auth.user?.id ? (
        <>
          <p className="super-size text-center">join newlife.IO</p>

          <ContentLayout customClass="app-content-layout">
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
                rules={[
                  {
                    pattern: new RegExp(regexEmail),
                    message: "Please input valid email.",
                  },
                ]}
              >
                <Input placeholder="email" />
              </Form.Item>
              <Form.Item>
                <div className="text-center">
                  <ProgressButton
                    actionName="auth.firebaseRequestEmailLink"
                    type="primary"
                    htmlType="submit"
                    progressText="Connecting..."
                  >
                    Connect my account
                  </ProgressButton>
                </div>
              </Form.Item>
              <p className="paragraph-2b text-center">
                <Link to="/">I don't have an account yet!</Link>
              </p>
              <div className="section-divider" />
              <SupportBox />
            </Form>
          </ContentLayout>
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
