"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.layout = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const form_1 = __importDefault(require("antd/lib/form"));
const react_1 = require("react");
const overmind_1 = require("../../overmind");
const state_1 = require("../../overmind/auth/state");
const ContentLayout_1 = require("../../Components/ContentLayout");
const PhoneForm_1 = __importDefault(require("./UI-Components/forms/PhoneForm"));
const CodeForm_1 = __importDefault(require("./UI-Components/forms/CodeForm"));
exports.layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const Auth = ({ embedded, setNext, setIsErrorSubmit, }) => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const [phoneForm] = form_1.default.useForm();
    const [codeForm] = form_1.default.useForm();
    (0, react_1.useEffect)(() => {
        actions.routing.setBreadcrumbs([{ text: "Auth" }]);
    }, []);
    (0, react_1.useEffect)(() => {
        if (state.api.auth.authorized && state.routing.location === "/auth")
            actions.routing.historyPush({ location: "/explore" });
    }, [state.api.auth.authorized, state.routing.location]);
    const _setNext = () => {
        embedded &&
            setNext &&
            setNext(state.auth.status === state_1.AUTH_FLOW_STATUS.ANONYMOUS
                ? {
                    text: "Send verification",
                    command: () => phoneForm.submit(),
                }
                : state.auth.status === state_1.AUTH_FLOW_STATUS.RECEIVED
                    ? { text: "Verify", command: () => codeForm.submit() }
                    : undefined);
        return () => setNext && setNext(undefined);
    };
    (0, react_1.useEffect)(_setNext, [state.auth.status]);
    // if (state.auth.authenticated && state.api.auth.user.id)
    // 	if (state.auth.authenticated)
    // 		return (
    // 			<p>
    // 				You are logged in. Go <Link to="/explore">explore</Link>!
    // 			</p>
    // 		);
    const FragmentWrapper = ({ children }) => {
        if (state.routing.location === "/auth")
            return ((0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, { customClass: "app-content-layout", children: children }));
        else {
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
        }
    };
    return ((0, jsx_runtime_1.jsxs)(FragmentWrapper, { children: [(0, jsx_runtime_1.jsx)("div", { id: "sign-in-button" }), (0, jsx_runtime_1.jsx)(PhoneForm_1.default, { setIsErrorSubmit: setIsErrorSubmit, embedded: embedded, phoneForm: phoneForm }), (0, jsx_runtime_1.jsx)(CodeForm_1.default, { setIsErrorSubmit: setIsErrorSubmit, embedded: embedded, codeForm: codeForm }), (0, jsx_runtime_1.jsx)("div", { className: "u-margin-top-large", style: { height: "69px" }, hidden: embedded })] }));
};
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map