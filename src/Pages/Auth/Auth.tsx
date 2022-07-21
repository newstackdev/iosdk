import { AUTH_FLOW_STATUS } from "../../overmind/auth/state";
import { ContentLayout } from "../../Components/ContentLayout";
import { EmbeddableControl } from "../../types";
import { useActions, useAppState } from "../../overmind";
import { useEffect } from "react";
import CodeForm from "./UI-Components/forms/CodeForm";
import Form from "antd/lib/form";
import PhoneForm from "./UI-Components/forms/PhoneForm";

export const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export const Auth = ({ embedded, setNext, setIsErrorSubmit }: React.PropsWithChildren<EmbeddableControl>) => {
  const state = useAppState();
  const actions = useActions();

  const [phoneForm] = Form.useForm();
  const [codeForm] = Form.useForm();

  useEffect(() => {
    actions.routing.setBreadcrumbs([{ text: "Auth" }]);
  }, []);

  useEffect(() => {
    if (state.api.auth.authorized && state.routing.location === "/auth") actions.routing.historyPush({ location: "/explore" });
  }, [state.api.auth.authorized, state.routing.location]);

  const _setNext = () => {
    embedded &&
      setNext &&
      setNext(
        state.auth.status === AUTH_FLOW_STATUS.ANONYMOUS
          ? {
              text: "Send verification",
              command: () => phoneForm.submit(),
            }
          : state.auth.status === AUTH_FLOW_STATUS.RECEIVED
          ? { text: "Verify", command: () => codeForm.submit() }
          : undefined,
      );

    return () => setNext && setNext(undefined);
  };

  useEffect(_setNext, [state.auth.status]);

  // if (state.auth.authenticated && state.api.auth.user.id)
  // 	if (state.auth.authenticated)
  // 		return (
  // 			<p>
  // 				You are logged in. Go <Link to="/explore">explore</Link>!
  // 			</p>
  // 		);

  const FragmentWrapper = ({ children }) => {
    if (state.routing.location === "/auth") return <ContentLayout customClass="app-content-layout">{children}</ContentLayout>;
    else {
      return <>{children}</>;
    }
  };

  return (
    <FragmentWrapper>
      <div id="sign-in-button" />
      <PhoneForm setIsErrorSubmit={setIsErrorSubmit} embedded={embedded} phoneForm={phoneForm} />
      <CodeForm setIsErrorSubmit={setIsErrorSubmit} embedded={embedded} codeForm={codeForm} />

      {/* TODO do we need this here? */}
      {/* <div style={{ maxWidth: 640, margin: "auto" }}>
				<IndeterminateProgressAction actionName="auth.firebaseVerifyPhone" />
			</div> */}
      <div className="support-box__fix-height" hidden={embedded} />
    </FragmentWrapper>
  );
};
