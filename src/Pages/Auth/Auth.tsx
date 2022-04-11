import Form from "antd/lib/form";
import { useEffect, useState } from "react";
import { EmbeddableControl } from "../../types";
import { useActions, useAppState } from "../../overmind";
import { AUTH_FLOW_STATUS } from "../../overmind/auth/state";
import { ContentLayout } from "../../Components/ContentLayout";

import PhoneForm from "./UI-Components/forms/PhoneForm";
import CodeForm from "./UI-Components/forms/CodeForm";

export const layout = {
	labelCol: { span: 0 },
	wrapperCol: { span: 24 },
};

export const Auth = ({
	embedded,
	setNext,
	handleCallBack,
	setIsErrorSubmit,
	isErrorSubmit,
}: React.PropsWithChildren<EmbeddableControl>) => {
	const state = useAppState();
	const actions = useActions();
	const [error, setError] = useState<boolean>(false);

	const [phoneForm] = Form.useForm();
	const [codeForm] = Form.useForm();

	useEffect(() => {
		actions.routing.setBreadcrumbs([{ text: "Auth" }]);
	}, []);

	useEffect(() => {
		if (state.api.auth.authorized && state.routing.location === "/auth")
			actions.routing.historyPush({ location: "/explore" });
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
					: undefined
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
		if (state.routing.location === "/auth")
			return (
				<ContentLayout customClass="app-content-layout">
					{children}
				</ContentLayout>
			);
		else {
			return <>{children}</>;
		}
	};

	return (
		<FragmentWrapper>
			<div id="sign-in-button" />
			<PhoneForm
				setIsErrorSubmit={setIsErrorSubmit}
				isErrorSubmit={isErrorSubmit}
				embedded={embedded}
				phoneForm={phoneForm}
				handleCallBack={handleCallBack}
				setError={setError}
				error={error}
			/>
			<CodeForm
				setIsErrorSubmit={setIsErrorSubmit}
				embedded={embedded}
				codeForm={codeForm}
			/>

			{/* TODO do we need this here? */}
			{/* <div style={{ maxWidth: 640, margin: "auto" }}>
				<IndeterminateProgressAction actionName="auth.firebaseVerifyPhone" />
			</div> */}
			<div
				className="u-margin-top-large"
				style={{ height: "69px" }}
				hidden={embedded}
			/>
		</FragmentWrapper>
	);
};