"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainPresale = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_1 = require("react");
const antd_mask_input_1 = require("antd-mask-input");
const ContentLayout_1 = require("../../Components/ContentLayout");
const overmind_1 = require("../../overmind");
const Paragraph_1 = __importDefault(require("antd/lib/typography/Paragraph"));
const Auth_1 = require("../Auth/Auth");
const Product_1 = require("../Store/Product");
const UserCreate_1 = require("../User/UserCreate");
const JoinDao_1 = require("../JoinDao");
const ProgressButton_1 = require("../../Components/ProgressButton");
const react_router_dom_1 = require("react-router-dom");
const Appearing_1 = require("../../Components/Appearing");
const Spin_1 = require("../../Components/Spin");
const SupportBox_1 = __importDefault(require("../../Components/SupportBox"));
// const InputWithPostfix:  NLView<InputProps & { postFix: string }>= ({ postFix, ...props }) => {
//     const [val, setVal] = useState<string>(postFix);
//     return <Input
//         {...{...props, value: val } as InputProps}
//         onChange={v => setVal(v.target.value.replace(new RegExp(`(.{3})$`), postFix))}
//     />
// }
const DomainSelector = () => {
    const actions = (0, overmind_1.useActions)();
    const state = (0, overmind_1.useAppState)();
    const fuia = state.flows.user.create.formUsernameIsAvailable;
    const el = (0, react_1.useRef)({});
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
    const isPaidUsername = username.length && username.replace(/\.io/, "").length < 5;
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { children: [(0, jsx_runtime_1.jsx)(antd_mask_input_1.MaskedInput, { ref: el, style: {
                    fontSize: "clamp(20px, 120px, 9.8vw)",
                    textAlign: "center",
                    width: "70%",
                    height: "auto",
                    marginTop: "80px",
                    borderBottomWidth: "13px",
                }, className: fuia === "unavailable"
                    ? "masked-input masked-input-error font-variant-none paragraph-2b"
                    : "masked-input font-variant-none paragraph-2b", defaultValue: state.flows.user.create.form.username?.replace(/\.io$/, "") || "", size: "large", mask: "xxxxxxxxx.IO", placeholderChar: "\u200C", onChange: (v) => {
                    actions.flows.user.create.updateForm({
                        username: v.target.value
                            .replace(/\u200c/g, "")
                            .toLowerCase(),
                    });
                }, formatCharacters: {
                    x: {
                        validate: function (char) {
                            return /^[a-z1-5\.]$/.test(char);
                        },
                        transform: function (char) {
                            return char.toLowerCase();
                        },
                    },
                } }), (0, jsx_runtime_1.jsx)(Spin_1.SpaceSpin, { isRotating: fuia === "checking" }), fuia === "unavailable" && ((0, jsx_runtime_1.jsxs)(antd_1.Tag, { style: { marginTop: "20px" }, children: ["Name is ", fuia] })), (0, jsx_runtime_1.jsxs)(Paragraph_1.default, { className: "paragraph-2r nl-footer-paragraph", style: { width: "60%" }, children: [isPaidUsername ? ((0, jsx_runtime_1.jsxs)(Appearing_1.AppearingComponent, { seconds: 1, children: [(0, jsx_runtime_1.jsx)("br", {}), "Premium usernames shorter than 5 characters will soon be available.", (0, jsx_runtime_1.jsx)("br", {}), "For early access please contact\u00A0", (0, jsx_runtime_1.jsx)("a", { href: "https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ", target: "_new", children: "our support team" }), "."] })) : (""), state.flows.user.create.legacyToken &&
                        (state.flows.user.create.form.displayName !==
                            state.flows.user.create.form.username ||
                            fuia === "unavailable") ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Your Newlife identity is now a part of the Newcoin ecosystem and provides access to many exciting services. You may keep your current username as the display name on Newlife on the next dialog." }), children: (0, jsx_runtime_1.jsx)("span", { children: "Why is my username changing?" }) }), "\u00A0", (0, jsx_runtime_1.jsxs)("a", { href: "/", onClick: () => actions.flows.user.create.stopLegacyImport(), children: ["I am not", " ", state.flows.user.create.form.displayName ||
                                        state.flows.user.create.form.username] })] })) : ("")] })] }));
};
//: Record<string, { title: string, content: ReactElement | EmbeddableControl }>
const InitSteps = (setNext, isErrorSubmit, setIsErrorSubmit) => {
    let buffer;
    const handleCallBack = (value) => (buffer = value);
    console.log(buffer);
    return {
        SELECT_DOMAIN: {
            title: "Choose your permanent domain name. This cannot be changed or deleted, and you own it.",
            content: (0, jsx_runtime_1.jsx)(DomainSelector, {}),
            action: "",
        },
        AUTHENTICATE: {
            title: "You need to verify your phone number to pre-register your account. You will receive a verification code via SMS",
            content: ((0, jsx_runtime_1.jsx)(Auth_1.Auth, { embedded: true, setNext: setNext, handleCallBack: handleCallBack, setIsErrorSubmit: setIsErrorSubmit, isErrorSubmit: isErrorSubmit })),
            action: "",
            buffer: buffer,
        },
        SUBSCRIBE: {
            title: "",
            action: "payments.pay",
            content: (0, jsx_runtime_1.jsx)(Product_1.Product, { embedded: true, setNext: setNext }),
        },
        CREATE_USER: {
            title: "",
            action: "api.user.create",
            content: ((0, jsx_runtime_1.jsx)(UserCreate_1.UserCreate, { embedded: true, setNext: setNext, hideUsername: true, noRouing: true, setIsErrorSubmit: setIsErrorSubmit })),
        },
        DONE: {
            title: "",
            content: (0, jsx_runtime_1.jsx)(JoinDao_1.JoinDao, {}),
            action: "",
        },
    };
};
const DomainPresale = () => {
    const actions = (0, overmind_1.useActions)();
    const state = (0, overmind_1.useAppState)();
    const [isErrorSubmit, setIsErrorSubmit] = (0, react_1.useState)(false);
    const [_next, setNext] = (0, react_1.useState)();
    const [steps] = (0, react_1.useState)(InitSteps(setNext, isErrorSubmit, setIsErrorSubmit));
    const wizard = state.flows.user.create.wizard;
    const next = _next;
    const currentSlide = steps[wizard.current];
    (0, react_1.useEffect)(() => {
        wizard.hasNext && setNext(undefined);
    }, [wizard.hasNext, wizard.current]); // wizard.hasNext,
    const isMember = (state.newcoin.pools || {})["CGY"] > 1087;
    (0, react_1.useEffect)(() => {
        if (isMember)
            actions.routing.historyPush({ location: "/explore" });
    }, [isMember]);
    // if(!state.api.auth.attempted && state.firebase.token)
    // 	return <></>;
    const footerTitle = steps[wizard.current].title;
    if (isMember ||
        (state.indicators.isWorking &&
            !state.flows.user.create.form.username &&
            !state.api.auth.authorized &&
            !state.api.auth.attempted &&
            state.firebase.token))
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { customClass: "app-content-layout", children: [currentSlide.content, (0, jsx_runtime_1.jsx)("div", { className: "app-control-surface", children: next || wizard.hasNext ? (currentSlide.action ? ((0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { type: "primary", progressText: "Processing...", actionName: currentSlide.action, onClick: () => {
                                return next
                                    ? next.command()
                                    : actions.flows.user.create.wizardStepNext();
                            }, isErrorSubmit: isErrorSubmit, children: next ? next.text : "Next" })) : ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", disabled: isErrorSubmit, onClick: () => next
                                ? next.command()
                                : actions.flows.user.create.wizardStepNext(), className: isErrorSubmit
                                ? "disabled-submit-button"
                                : "", children: next ? next.text : "Next" }))) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})) }), !state.flows.user.create.legacyToken &&
                        !state.auth.authenticated &&
                        wizard.matches("SELECT_DOMAIN") && ((0, jsx_runtime_1.jsx)("div", { className: "u-margin-top-medium", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/auth/legacy", className: "paragraph-2b", children: (0, jsx_runtime_1.jsx)("b", { children: "I'm an early Newlife member!" }) }) })), (0, jsx_runtime_1.jsx)("div", { className: "u-margin-top-large", children: (0, jsx_runtime_1.jsx)(SupportBox_1.default, {}) })] }), (0, jsx_runtime_1.jsxs)("div", { 
                // hidden={!wizard.matches("SELECT_DOMAIN")}
                style: { width: "50%", margin: "0 auto" }, children: [(0, jsx_runtime_1.jsx)(Paragraph_1.default, { className: "paragraph-2r nl-footer-paragraph", style: { marginTop: 48, width: "60%" }, children: footerTitle }), wizard.matches("SELECT_DOMAIN") && ((0, jsx_runtime_1.jsx)(Paragraph_1.default, { style: { width: "100%" }, className: "nl-footer-paragraph paragraph-2r", children: "9 characters max: a-z and 1-5" }))] })] }));
};
exports.DomainPresale = DomainPresale;
//# sourceMappingURL=DomainPresale.js.map