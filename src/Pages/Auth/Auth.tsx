import { AUTH_FLOW_STATUS } from "../../overmind/auth/state";
import { ContentLayout } from "../../Components/ContentLayout";
import { EmbeddableControl, IOView } from "../../types";
import { EmbeddableControlNextCommand } from "../../types";
import { NextButton } from "../Onboarding";
import { useActions, useAppState } from "../../overmind";
import { useEffect, useState } from "react";
import CodeForm from "./UI-Components/forms/CodeForm";
import Form from "antd/lib/form";
import PhoneForm from "./UI-Components/forms/PhoneForm";

export const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export const Auth: IOView<{ embedded: boolean }> = ({ embedded }) => {
  const state = useAppState();
  const actions = useActions();
  const [nextCommand, setNextCommand] = useState<{ text: string; command: () => void }>();
  const [isErrorSubmit, setIsErrorSubmit] = useState(false);

  const [phoneForm] = Form.useForm();
  const [codeForm] = Form.useForm();

  useEffect(() => {
    actions.routing.setBreadcrumbs([{ text: "Auth" }]);
  }, []);

  useEffect(() => {
    if (
      state.api.auth.authorized &&
      (state.routing.location === "/auth" || state.routing.location === "/signup/auth") &&
      !state.flows.user.create.isLegacyUpdateOngoing
    )
      actions.routing.historyPush({ location: "/explore" });
  }, [state.api.auth.authorized, state.routing.location, state.flows.user.create.isLegacyUpdateOngoing]);

  useEffect(() => {
    if (embedded) {
      setNextCommand(
        state.auth.status === AUTH_FLOW_STATUS.ANONYMOUS
          ? {
              text: "Send verification",
              command: () => phoneForm.submit(),
            }
          : state.auth.status === AUTH_FLOW_STATUS.RECEIVED
          ? { text: "Verify", command: () => codeForm.submit() }
          : undefined,
      );
    }
  }, [state.auth.status]);
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

      {embedded && <NextButton nextProps={nextCommand} isErrorSubmit={isErrorSubmit} />}
      <div className="support-box__fix-height" hidden={embedded} />
    </FragmentWrapper>
  );
};
