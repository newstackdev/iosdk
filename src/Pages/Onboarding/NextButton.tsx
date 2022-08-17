import { Button } from "antd";
import { IOView } from "../../types";
import { Link } from "react-router-dom";
import { ProgressButton } from "../../Components/ProgressButton";
import { useActions, useAppState } from "../../overmind";
import { useEffect, useState } from "react";
import Paragraph from "antd/lib/typography/Paragraph";
import SupportBox from "../../Components/SupportBox";

const InitSteps = () => {
  return {
    HASH_VERIFY: {
      title: "Enter hash or nft credentials",
      link: "/",
      action: "flows.user.create.verifyHash",
    },
    AUTHENTICATE: {
      title: "You need to verify your phone number to pre-register your account. You will receive a verification code via SMS",
      link: "/signup/auth", //<Auth embedded={true} setNext={setNext} setIsErrorSubmit={setIsErrorSubmit} isErrorSubmit={isErrorSubmit} />,
      action: "",
    },
    SELECT_DOMAIN: {
      title: "Choose your permanent domain name. This cannot be changed or deleted, and you own it.",
      link: "/signup/domain",
      action: "",
    },
    SUBSCRIBE: {
      title: "",
      action: "payments.pay",
      link: "/signup/subscribe", //<Product embedded={true} setNext={setNext} />,
    },
    CREATE_USER: {
      title: "",
      action: "api.user.create",
      link: "/",
      //<UserCreate embedded={true} setNext={setNext} hideUsername={true} noRouing={true} setIsErrorSubmit={setIsErrorSubmit} />
    },
    // //TODO implement
    // USER_SELECTOR: {
    //   title: "",
    //   action: "api.user.userSelector",
    //   link: <UserSelector />,
    // },
    // HASHTAG_SELECTOR: {
    //   title: "",
    //   action: "",
    //   link: <HashtagSelector />,
    // },
    // //TODO implement
    // DONE: {
    //   title: "",
    //   content: <Done />,
    //   action: "api.user.create",
    // },
  };
};

export const NextButton: IOView<{
  isErrorSubmit?: boolean;
  nextProps?: { command: () => void; text: string };
  visible?: boolean;
}> = ({ isErrorSubmit = false, nextProps, visible = true }) => {
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

  const footerTitle = steps[wizard.current].title;
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
    <>
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

      {!state.flows.user.create.legacyToken &&
        !state.auth.authenticated &&
        wizard.matches("HASH_VERIFY") &&
        state.routing.location === "/" && (
          <div className="app-main-full-width u-margin-top-medium u-margin-bottom-mega text-center">
            <Button type="primary" className="big-button" style={{ width: "100%" }}>
              <Link to="/auth/newlife-members" className="header-1b">
                I'm an early Newlife member!
              </Link>
            </Button>
          </div>
        )}
      <SupportBox />

      <div className="nl-domain-presale__info-text__wrapper">
        <Paragraph className="paragraph-2r nl-domain-presale__footer-paragraph">{footerTitle}</Paragraph>
        {wizard.matches("SELECT_DOMAIN") && (
          <Paragraph className="nl-domain-presale__footer-paragraph paragraph-2r">9 characters max: a-z and 1-5</Paragraph>
        )}
      </div>
    </>
  );
};
