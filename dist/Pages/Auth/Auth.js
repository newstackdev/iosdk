import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Form from "antd/lib/form";
import { useEffect } from "react";
import { useActions, useAppState } from "../../overmind";
import { AUTH_FLOW_STATUS } from "../../overmind/auth/state";
import { ContentLayout } from "../../Components/ContentLayout";
import PhoneForm from "./UI-Components/forms/PhoneForm";
import CodeForm from "./UI-Components/forms/CodeForm";
export const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
export const Auth = ({ embedded, setNext, setIsErrorSubmit, }) => {
    const state = useAppState();
    const actions = useActions();
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
            setNext(state.auth.status === AUTH_FLOW_STATUS.ANONYMOUS
                ? {
                    text: "Send verification",
                    command: () => phoneForm.submit(),
                }
                : state.auth.status === AUTH_FLOW_STATUS.RECEIVED
                    ? { text: "Verify", command: () => codeForm.submit() }
                    : undefined);
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
            return (_jsx(ContentLayout, { customClass: "app-content-layout", children: children }));
        else {
            return _jsx(_Fragment, { children: children });
        }
    };
    return (_jsxs(FragmentWrapper, { children: [_jsx("div", { id: "sign-in-button" }), _jsx(PhoneForm, { setIsErrorSubmit: setIsErrorSubmit, embedded: embedded, phoneForm: phoneForm }), _jsx(CodeForm, { setIsErrorSubmit: setIsErrorSubmit, embedded: embedded, codeForm: codeForm }), _jsx("div", { className: "u-margin-top-large support-box__fix-height", hidden: embedded })] }));
};
//# sourceMappingURL=Auth.js.map