import { Button, Row, Tag, Tooltip } from "antd";
import { RefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import { MaskedInput } from "antd-mask-input";
import { ContentLayout } from "../../Components/ContentLayout";
import { useActions, useAppState } from "../../overmind";
import Paragraph from "antd/lib/typography/Paragraph";
import { EmbeddableControlNextCommand, NLView } from "../../types";
import { Auth } from "../Auth/Auth";
import { Product } from "../Store/Product";
import { UserCreate } from "../User/UserCreate";
import { JoinDao } from "../JoinDao";
import { ProgressButton } from "../../Components/ProgressButton";
import { Link } from "react-router-dom";
import { AppearingComponent } from "../../Components/Appearing";
import { SpaceSpin, Spin } from "../../Components/Spin";
import SupportBox from "../../Components/SupportBox";
import { Done } from "./Done";

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
	const isPaidUsername = () => {
		const len = username.replace(/\.io/, "").length;
		return len > 0 && len < 5;
	};
	return (
		<ContentLayout>
			<MaskedInput
				ref={el as any}
				className={
					fuia === "unavailable"
						? "nl-domain-presale__masked-input masked-input-error"
						: "nl-domain-presale__masked-input"
				}
				defaultValue={
					state.flows.user.create.form.username?.replace(
						/\.io$/,
						""
					) || ""
				}
				size="large"
				mask="xxxxxxxxx.IO"
				placeholderChar="&zwnj;"
				onChange={(
					v: SyntheticEvent & { target: { value: string } }
				) => {
					actions.flows.user.create.updateForm({
						username: v.target.value
							.replace(/\u200c/g, "")
							.toLowerCase(),
					});
				}}
				formatCharacters={{
					x: {
						validate: function (char: string) {
							return /^[a-z1-5\.]$/.test(char);
						},
						transform: function (char: string) {
							return char.toLowerCase();
						},
					},
				}}
			/>
			<SpaceSpin isRotating={fuia === "checking"} />
			{fuia === "unavailable" && (
				<Tag className="u-margin-top-medium">Name is {fuia}</Tag>
			)}

			<Paragraph className="paragraph-2r nl-domain-presale__footer-paragraph">
				{/* {(state.api.auth.user.status === 'imported').toString()} {(state.api.auth.user.username !== state.flows.user.create.form.username).toString()} */}

				{isPaidUsername() ? (
					<AppearingComponent seconds={1}>
						<br />
						{
							state.config.featureFlags.onboarding.premiumDomains ?
								<>
									Premium usernames shorter than 5 characters must be purchased. Click Next to continue.
								</> :
								<>
									For early access please contact&nbsp;
									<a
										href="https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ"
										target="_new"
									>
										our support team
									</a>
									.
								</>
						}
					</AppearingComponent>
				) : (
					""
				)}

				{state.flows.user.create.legacyToken &&
					(state.flows.user.create.form.displayName !==
						state.flows.user.create.form.username ||
						fuia === "unavailable") ? (
					<>
						<Tooltip
							title={
								<>
									Your Newlife identity is now a part of the
									Newcoin ecosystem and provides access to
									many exciting services. You may keep your
									current username as the display name on
									Newlife on the next dialog.
								</>
							}
						>
							<span>Why is my username changing?</span>
						</Tooltip>
						&nbsp;
						<a
							href="/"
							onClick={() =>
								actions.flows.user.create.stopLegacyImport()
							}
						>
							I am not{" "}
							{state.flows.user.create.form.displayName ||
								state.flows.user.create.form.username}
						</a>
					</>
				) : (
					""
				)}
			</Paragraph>
		</ContentLayout>
	);
};

//: Record<string, { title: string, content: ReactElement | EmbeddableControl }>
const InitSteps = (
	setNext: EmbeddableControlNextCommand,
	isErrorSubmit: boolean,
	setIsErrorSubmit: React.Dispatch<React.SetStateAction<boolean>>
) => {
	return {
		SELECT_DOMAIN: {
			title: "Choose your permanent domain name. This cannot be changed or deleted, and you own it.",
			content: <DomainSelector />,
			action: "",
		},
		AUTHENTICATE: {
			title: "You need to verify your phone number to pre-register your account. You will receive a verification code via SMS",
			content: (
				<Auth
					embedded={true}
					setNext={setNext}
					setIsErrorSubmit={setIsErrorSubmit}
					isErrorSubmit={isErrorSubmit}
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
			content: <Done />,
			action: "",
		},
	};
};

export const DomainPresale = () => {
	const actions = useActions();
	const state = useAppState();
	const [isErrorSubmit, setIsErrorSubmit] = useState<boolean>(false);

	const [_next, setNext] = useState<{ command: () => void; text: string }>();
	const [steps] = useState(
		InitSteps(setNext, isErrorSubmit, setIsErrorSubmit)
	);

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

	// if(!state.api.auth.attempted && state.firebase.token)
	// 	return <></>;

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
			<ContentLayout customClass="app-content-layout">
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

				{/* <div>authenticated: { JSON.stringify(state.auth.authenticated) }  -&gt; authorized: { JSON.stringify(state.auth.authorized) }</div> */}

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
				{/* {JSON.stringify(wizard)} */}
				{currentSlide.content}
				<div className="app-control-surface">
					{next || wizard.hasNext ? (
						currentSlide.action ? (
							<ProgressButton
								type="primary"
								progressText="Processing..."
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
								disabled={isErrorSubmit}
								onClick={() =>
									next
										? next.command()
										: actions.flows.user.create.wizardStepNext()
								}
								className={
									isErrorSubmit
										? "disabled-submit-button"
										: ""
								}
							>
								{next ? next.text : "Next"}
							</Button>
						)
					) : (
						<></>
					)}
				</div>

				{/* {wizard.matches("DONE") && (
                )} */}
				{/* {JSON.stringify(next || wizard.hasNext)} {JSON.stringify(next)} */}
				{!state.flows.user.create.legacyToken &&
					!state.auth.authenticated &&
					wizard.matches("SELECT_DOMAIN") && (
						<div className="app-main-full-width u-margin-top-medium text-center">
							<Button type="primary" className="big-button">
								<Link
									to="/auth/newlife-members"
									className="header-1b"
								>
									I'm an early Newlife member!
								</Link>
							</Button>
						</div>
					)}
				<div className="u-margin-top-large">
					<SupportBox />
				</div>
			</ContentLayout>

			{/* Dynamic text above footer */}
			<div
				// hidden={!wizard.matches("SELECT_DOMAIN")}
				className="nl-domain-presale__info-text__wrapper"
			>
				<Paragraph className="paragraph-2r nl-domain-presale__footer-paragraph">
					{footerTitle}
				</Paragraph>
				{wizard.matches("SELECT_DOMAIN") && (
					<Paragraph className="nl-domain-presale__footer-paragraph paragraph-2r">
						9 characters max: a-z and 1-5
					</Paragraph>
				)}
			</div>
		</>
	);
};
