import { Button } from "antd";
import { IOView } from "../../types";
import { ProgressButton } from "../../Components/ProgressButton";
import { useActions, useAppState } from "../../overmind";
import { useEffect, useState } from "react";
import Paragraph from "antd/lib/typography/Paragraph";
import SupportBox from "../../Components/SupportBox";

const InitSteps = () => {
  return {
    HASH_VERIFY: {
      link: "/",
      action: "flows.user.create.verifyHash",
    },
    AUTHENTICATE: {
      link: "/signup/auth",
      action: "",
    },
    SELECT_DOMAIN: {
      link: "/signup/domain",
      action: "",
    },
    SUBSCRIBE: {
      title: "",
      action: "payments.pay",
      link: "/signup/subscribe",
    },
    CREATE_USER: {
      title: "",
      action: "api.user.create",
      link: "/",
    },
  };
};

export const NextButton: IOView<{
  isErrorSubmit?: boolean;
  nextProps?: { command: () => void | Promise<void>; text: string };
  visible?: boolean;
  contentDescription?: React.ReactNode | string;
}> = ({ isErrorSubmit = false, nextProps, visible = true, contentDescription }) => {
  const actions = useActions();
  const state = useAppState();

  const [_next, setNext] = useState<{ command: () => void | Promise<void>; text: string } | undefined>(nextProps);
  const [steps] = useState(InitSteps());

  const wizard = state.flows.user.create.wizard;
  const next = _next;
  const currentSlide = steps[wizard.current];

  useEffect(() => {
    !nextProps && wizard.hasNext && setNext(undefined);
  }, [wizard.hasNext, wizard.current]); // wizard.hasNext,

  const isMember = (state.newcoin.pools || {})["CGY"] > 1087;

  useEffect(() => {
    if (isMember) actions.routing.historyPush({ location: "/explore" });
  }, [isMember]);

  if (
    isMember ||
    (state.indicators.isWorking &&
      !state.flows.user.create.form.username &&
      !state.api.auth.authorized &&
      !state.api.auth.attempted &&
      state.firebase.token)
  )
    return <></>;

  return (
    <div className="nl-onboarding-footer">
      <div className="app-control-surface">
        {visible ? (
          next || wizard.hasNext ? (
            currentSlide.action ? (
              <ProgressButton
                type="primary"
                progressText="Processing..."
                actionName={currentSlide.action}
                onClick={() => {
                  return next ? next.command() : actions.flows.user.create.wizardStepNext();
                }}
                isErrorSubmit={isErrorSubmit}
              >
                {next ? next.text : "Next"}
              </ProgressButton>
            ) : (
              <Button
                type="primary"
                disabled={isErrorSubmit}
                onClick={() => {
                  return next ? next.command() : actions.flows.user.create.wizardStepNext();
                }}
                className={isErrorSubmit ? "disabled-submit-button" : ""}
              >
                {next ? next.text : "Next"}
              </Button>
            )
          ) : null
        ) : null}
      </div>

      <div className="nl-domain-presale__info-text__wrapper">
        <Paragraph className="paragraph-2r nl-domain-presale__footer-paragraph">{contentDescription}</Paragraph>
        <SupportBox />
      </div>
    </div>
  );
};
