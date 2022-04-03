import {
  Steps,
  Button,
  message,
  Form,
  InputProps,
  Tag,
  Row,
  Col,
  Space,
  Tooltip,
} from "antd";
import {
  ReactElement,
  RefObject,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { MaskedInput } from "antd-mask-input";

import { ContentLayout } from "../../Components/ContentLayout";
import { STAKE_STEPS } from "../../Components/UserWidget";
import { useActions, useAppState } from "../state";
import { state } from "../../state/auth/state";
import Paragraph from "antd/lib/typography/Paragraph";
import {
  EmbeddableControl,
  EmbeddableControlNextCommand,
  NLView,
} from "../../types";
import { Auth } from "../Auth";
import { Product } from "../Store/Product";
import { UserCreate } from "../User/UserCreate";
import { UserStake } from "../../Components/UserWidget";
import { JoinDao } from "../JoinDao";
import { ProgressButton } from "../../Components/ProgressButton";
import { Link } from "react-router-dom";
import { AppearingComponent } from "../../Components/Appearing";
import { Spin } from "../../Components/Spin";

const { Step } = Steps;

// const InputWithPostfix:  NLView<InputProps & { postFix: string }>= ({ postFix, ...props }) => {
//     const [val, setVal] = useState<string>(postFix);
//     return <Input
//         {...{...props, value: val } as InputProps}
//         onChange={v => setVal(v.target.value.replace(new RegExp(`(.{3})$`), postFix))}
//     />
// }

const DomainSelector = () => {
  const actions = useActions();
  const state = useAppState();
  const fuia = state.flows.user.create.formUsernameIsAvailable;
  const el: RefObject<typeof MaskedInput> = useRef({} as typeof MaskedInput);

  console.log(actions);

  // useEffect(() => {
  // 	if(["imported", "known"].includes(state.api.auth.user?.status || "") && !state.flows.user.create.form.username) {
  // 		actions.flows.user.create.startLegacyImport();
  // 		if(el.current) {
  // 			const c = el.current as any as { setInputValue: (v: string) => void };
  // 			c.setInputValue(state.flows.user.create.form.username || "");
  // 		}
  // 	}

  //  }, [state.api.auth.user]);

  const username = state.flows.user.create.form.username || "";
  const isPaidUsername =
    username.length && username.replace(/\.io/, "").length < 5;

  return (
    <>
      <MaskedInput
        ref={el as any}
        style={{
          fontSize: "clamp(20px, 120px, 9.8vw)",
          textAlign: "center",
          width: "70%",
          height: "auto",
          marginBottom: "80px",
          paddingTop: "15vh",
        }}
        className={
          fuia === "unavailable"
            ? "masked-input masked-input-error font-variant-none"
            : "masked-input font-variant-none"
        }
        defaultValue={
          state.flows.user.create.form.username?.replace(/\.io$/, "") || ""
        }
        size="large"
        mask="xxxxxxxxx.IO"
        placeholderChar="&zwnj;"
        onChange={(v: SyntheticEvent & { target: { value: string } }) => {
          actions.flows.user.create.updateForm({
            username: v.target.value.replace(/\u200c/g, "").toLowerCase(),
          });
        }}
        formatCharacters={{
          x: {
            validate: function (char: string) {
              return /[\w1-5\.]/.test(char);
            },
            transform: function (char: string) {
              return char.toLowerCase();
            },
          },
        }}
      />
      {fuia === "checking" && (
        <div style={{ position: "absolute" }}>
          <Spin />
        </div>
      )}
      {fuia === "unavailable" && (
        <Tag style={{ marginTop: "20px" }}>Name is {fuia}</Tag>
      )}
      <Paragraph
        className="paragraph-2r nl-footer-paragraph"
        style={{ marginTop: 48, width: "60%" }}
      >
        {/* {(state.api.auth.user.status === 'imported').toString()} {(state.api.auth.user.username !== state.flows.user.create.form.username).toString()} */}

        {isPaidUsername ? (
          <AppearingComponent seconds={1}>
            <br />
            Premium usernames shorter than 5 characters will soon be available.
            <br />
            For early access please contact&nbsp;
            <a
              href="https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ"
              target="_new"
            >
              our support team
            </a>
            .
          </AppearingComponent>
        ) : (
          ""
        )}
        <br />
        <br />

        {state.flows.user.create.legacyToken &&
        (state.flows.user.create.form.displayName !==
          state.flows.user.create.form.username ||
          fuia === "unavailable") ? (
          <>
            <Tooltip
              title={
                <>
                  Your Newlife identity is now a part of the Newcoin ecosystem
                  and provides access to many exciting services. You may keep
                  your current username as the display name on Newlife on the
                  next dialog.
                </>
              }
            >
              <span>Why is my username changing?</span>
            </Tooltip>
            &nbsp;
            <a
              href="/"
              onClick={() => actions.flows.user.create.stopLegacyImport()}
            >
              I am not{" "}
              {state.flows.user.create.form.displayName ||
                state.flows.user.create.form.username}
            </a>
          </>
        ) : (
          ""
        )}

        {!state.flows.user.create.legacyToken && !state.auth.authenticated ? (
          <Link to="/auth/legacy" className="paragraph-3b">
            <b>I'm an early Newlife user!</b>
          </Link>
        ) : (
          ""
        )}
      </Paragraph>
    </>
  );
};

const SELECT_DOMAIN = {
  title: "",
  content: <DomainSelector />,
  action: "",
};

//: Record<string, { title: string, content: ReactElement | EmbeddableControl }>
const InitSteps = (
  setNext: EmbeddableControlNextCommand,
  setIsErrorSubmit: React.Dispatch<React.SetStateAction<boolean>>
) => ({
  SELECT_DOMAIN,
  AUTHENTICATE: {
    title: "",
    content: (
      <Auth
        embedded={true}
        setNext={setNext}
        setIsErrorSubmit={setIsErrorSubmit}
      />
    ),
    action: "",
  },
  SUBSCRIBE: {
    title: "",
    action: "payments.pay",
    content: <Product embedded={true} setNext={setNext} />,
  },
  CREATE_USER: {
    title: "",
    action: "api.user.create",
    content: (
      <UserCreate
        embedded={true}
        setNext={setNext}
        hideUsername={true}
        noRouing={true}
        setIsErrorSubmit={setIsErrorSubmit}
      />
    ),
  },
  DONE: {
    title: "",
    content: <JoinDao />,
    action: "",
  },
});

export const DomainPresale = () => {
  const actions = useActions();
  const state = useAppState();
  const [isErrorSubmit, setIsErrorSubmit] = useState<boolean>(false);

  const [_next, setNext] = useState<{ command: () => void; text: string }>();
  const [steps] = useState(InitSteps(setNext, setIsErrorSubmit));

  const wizard = state.flows.user.create.wizard;
  const next = _next;
  const currentSlide = steps[wizard.current];

  useEffect(() => {
    wizard.hasNext && setNext(undefined);
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
    <ContentLayout customClass="app-content-layout-domain-presale">
      {/* {["SELECT_DOMAIN", "DONE"].includes(wizard.current) ? (
				""
			) : (
				<>
					<h2 className="header-2">
						Pre-registering{" "}
						<b>{state.flows.user.create.form.username || ""}</b>
						<br />
					</h2>
				</>
			)} */}
      {/* prev: {wizard.hasPrev}<br />
            curr: {wizard.current}<br />
            next: {wizard.hasNext}<br />
            {JSON.stringify(wizard)} */}

      <>{currentSlide.content}</>
      {/* <div>authenticated: { JSON.stringify(state.auth.authenticated) }  -&gt; authorized: { JSON.stringify(state.auth.authorized) }</div> */}
      <div className={"app-control-surface"}>
        {/* {wizard.hasPrev && (
					<Button
						className="ant-btn"
						style={{ margin: "0 8px" }}
						onClick={() =>
							actions.flows.user.create.wizardStepPrev()
						}
					>
						Previous
					</Button>
				)} */}
        {/* {JSON.stringify(next)} */}

        {next || wizard.hasNext ? (
          currentSlide.action ? (
            <ProgressButton
              type="primary"
              actionName={currentSlide.action}
              onClick={() => {
                return next
                  ? next.command()
                  : actions.flows.user.create.wizardStepNext();
              }}
              isErrorSubmit={isErrorSubmit}
            >
              {next ? next.text : "Next"}
            </ProgressButton>
          ) : (
            <Button
              type="primary"
              onClick={() =>
                next
                  ? next.command()
                  : actions.flows.user.create.wizardStepNext()
              }
              className={isErrorSubmit ? "disabled-submit-button" : ""}
            >
              {next ? next.text : "Next"}
            </Button>
          )
        ) : (
          <></>
        )}
        {/* {wizard.matches("DONE") && (
                )} */}
        {/* {JSON.stringify(next || wizard.hasNext)} {JSON.stringify(next)} */}
      </div>

      <div
        hidden={!wizard.matches("SELECT_DOMAIN")}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          flex: "1",
        }}
      >
        <Paragraph
          className="paragraph-2r nl-footer-paragraph"
          style={{ marginTop: 48, width: "60%" }}
        >
          This will be your permanent domain and it cannot be changed or
          deleted.
        </Paragraph>
        <Paragraph
          style={{ width: "100%" }}
          className="nl-footer-paragraph paragraph-2r"
        >
          9 characters max: a-z and 1-5
        </Paragraph>
      </div>
    </ContentLayout>
  );
};
