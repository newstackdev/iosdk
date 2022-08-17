import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AUTH_FLOW_STATUS } from "../../overmind/auth/state";
import { ContentLayout } from "../../Components/ContentLayout";
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
export const Auth = ({ embedded }) => {
    const state = useAppState();
    const actions = useActions();
    const [nextCommand, setNextCommand] = useState();
    const [isErrorSubmit, setIsErrorSubmit] = useState(false);
    const [phoneForm] = Form.useForm();
    const [codeForm] = Form.useForm();
    useEffect(() => {
        actions.routing.setBreadcrumbs([{ text: "Auth" }]);
    }, []);
    useEffect(() => {
        if (state.api.auth.authorized &&
            (state.routing.location === "/auth" || state.routing.location === "/signup/auth") &&
            !state.flows.user.create.isLegacyUpdateOngoing)
            actions.routing.historyPush({ location: "/explore" });
    }, [state.api.auth.authorized, state.routing.location, state.flows.user.create.isLegacyUpdateOngoing]);
    useEffect(() => {
        if (embedded) {
            setNextCommand(state.auth.status === AUTH_FLOW_STATUS.ANONYMOUS
                ? {
                    text: "Send verification",
                    command: () => phoneForm.submit(),
                }
                : state.auth.status === AUTH_FLOW_STATUS.RECEIVED
                    ? { text: "Verify", command: () => codeForm.submit() }
                    : undefined);
        }
    }, [state.auth.status]);
    const FragmentWrapper = ({ children }) => {
        if (state.routing.location === "/auth")
            return _jsx(ContentLayout, { customClass: "app-content-layout", children: children });
        else {
            return _jsx(_Fragment, { children: children });
        }
    };
    return (_jsxs(FragmentWrapper, { children: [_jsx("div", { id: "sign-in-button" }), _jsx(PhoneForm, { setIsErrorSubmit: setIsErrorSubmit, embedded: embedded, phoneForm: phoneForm }), _jsx(CodeForm, { setIsErrorSubmit: setIsErrorSubmit, embedded: embedded, codeForm: codeForm }), embedded && _jsx(NextButton, { nextProps: nextCommand, isErrorSubmit: isErrorSubmit }), _jsx("div", { className: "support-box__fix-height", hidden: embedded })] }));
};
//# sourceMappingURL=Auth.js.map