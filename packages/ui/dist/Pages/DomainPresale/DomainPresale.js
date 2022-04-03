"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DomainPresale = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var antd_mask_input_1 = require("antd-mask-input");
var ContentLayout_1 = require("../../Components/ContentLayout");
var Paragraph_1 = __importDefault(require("antd/lib/typography/Paragraph"));
var Auth_1 = require("../Auth");
var UserCreate_1 = require("../User/UserCreate");
var ProgressButton_1 = require("../../Components/ProgressButton");
var react_router_dom_1 = require("react-router-dom");
var Appearing_1 = require("../../Components/Appearing");
var Spin_1 = require("../../Components/Spin");
var state_1 = require("@newcoin-foundation/state");
var JoinDao_1 = require("../JoinDao");
var Product_1 = require("../Store/Product");
var Step = antd_1.Steps.Step;
// const InputWithPostfix:  NLView<InputProps & { postFix: string }>= ({ postFix, ...props }) => {
//     const [val, setVal] = useState<string>(postFix);
//     return <Input
//         {...{...props, value: val } as InputProps}
//         onChange={v => setVal(v.target.value.replace(new RegExp(`(.{3})$`), postFix))}
//     />
// }
var DomainSelector = function () {
    var _a;
    var actions = (0, state_1.useActions)();
    var state = (0, state_1.useAppState)();
    var fuia = state.flows.user.create.formUsernameIsAvailable;
    var el = (0, react_1.useRef)({});
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
    var username = state.flows.user.create.form.username || "";
    var isPaidUsername = username.length && username.replace(/\.io/, "").length < 5;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_mask_input_1.MaskedInput, { ref: el, style: {
                    fontSize: "clamp(20px, 120px, 9.8vw)",
                    textAlign: "center",
                    width: "70%",
                    height: "auto",
                    marginBottom: "80px",
                    paddingTop: "15vh"
                }, className: fuia === "unavailable"
                    ? "masked-input masked-input-error font-variant-none"
                    : "masked-input font-variant-none", defaultValue: ((_a = state.flows.user.create.form.username) === null || _a === void 0 ? void 0 : _a.replace(/\.io$/, "")) || "", size: "large", mask: "xxxxxxxxx.IO", placeholderChar: "\u200C", onChange: function (v) {
                    actions.flows.user.create.updateForm({
                        username: v.target.value.replace(/\u200c/g, "").toLowerCase()
                    });
                }, formatCharacters: {
                    x: {
                        validate: function (char) {
                            return /[\w1-5\.]/.test(char);
                        },
                        transform: function (char) {
                            return char.toLowerCase();
                        }
                    }
                } }), fuia === "checking" && ((0, jsx_runtime_1.jsx)("div", __assign({ style: { position: "absolute" } }, { children: (0, jsx_runtime_1.jsx)(Spin_1.Spin, {}) }))), fuia === "unavailable" && ((0, jsx_runtime_1.jsxs)(antd_1.Tag, __assign({ style: { marginTop: "20px" } }, { children: ["Name is ", fuia] }))), (0, jsx_runtime_1.jsxs)(Paragraph_1["default"], __assign({ className: "paragraph-2r nl-footer-paragraph", style: { marginTop: 48, width: "60%" } }, { children: [isPaidUsername ? ((0, jsx_runtime_1.jsxs)(Appearing_1.AppearingComponent, __assign({ seconds: 1 }, { children: [(0, jsx_runtime_1.jsx)("br", {}), "Premium usernames shorter than 5 characters will soon be available.", (0, jsx_runtime_1.jsx)("br", {}), "For early access please contact\u00A0", (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ", target: "_new" }, { children: "our support team" })), "."] }))) : (""), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), state.flows.user.create.legacyToken &&
                        (state.flows.user.create.form.displayName !==
                            state.flows.user.create.form.username ||
                            fuia === "unavailable") ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Tooltip, __assign({ title: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Your Newlife identity is now a part of the Newcoin ecosystem and provides access to many exciting services. You may keep your current username as the display name on Newlife on the next dialog." }) }, { children: (0, jsx_runtime_1.jsx)("span", { children: "Why is my username changing?" }) })), "\u00A0", (0, jsx_runtime_1.jsxs)("a", __assign({ href: "/", onClick: function () { return actions.flows.user.create.stopLegacyImport(); } }, { children: ["I am not", " ", state.flows.user.create.form.displayName ||
                                        state.flows.user.create.form.username] }))] })) : (""), !state.flows.user.create.legacyToken && !state.auth.authenticated ? ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/auth/legacy", className: "paragraph-3b" }, { children: (0, jsx_runtime_1.jsx)("b", { children: "I'm an early Newlife user!" }) }))) : ("")] }))] }));
};
var SELECT_DOMAIN = {
    title: "",
    content: (0, jsx_runtime_1.jsx)(DomainSelector, {}),
    action: ""
};
//: Record<string, { title: string, content: ReactElement | EmbeddableControl }>
var InitSteps = function (setNext, setIsErrorSubmit) { return ({
    SELECT_DOMAIN: SELECT_DOMAIN,
    AUTHENTICATE: {
        title: "",
        content: ((0, jsx_runtime_1.jsx)(Auth_1.Auth, { embedded: true, setNext: setNext, setIsErrorSubmit: setIsErrorSubmit })),
        action: ""
    },
    SUBSCRIBE: {
        title: "",
        action: "payments.pay",
        content: (0, jsx_runtime_1.jsx)(Product_1.Product, { embedded: true, setNext: setNext })
    },
    CREATE_USER: {
        title: "",
        action: "api.user.create",
        content: ((0, jsx_runtime_1.jsx)(UserCreate_1.UserCreate, { embedded: true, setNext: setNext, hideUsername: true, noRouing: true, setIsErrorSubmit: setIsErrorSubmit }))
    },
    DONE: {
        title: "",
        content: (0, jsx_runtime_1.jsx)(JoinDao_1.JoinDao, {}),
        action: ""
    }
}); };
var DomainPresale = function () {
    var actions = (0, state_1.useActions)();
    var state = (0, state_1.useAppState)();
    var _a = (0, react_1.useState)(false), isErrorSubmit = _a[0], setIsErrorSubmit = _a[1];
    var _b = (0, react_1.useState)(), _next = _b[0], setNext = _b[1];
    var steps = (0, react_1.useState)(InitSteps(setNext, setIsErrorSubmit))[0];
    var wizard = state.flows.user.create.wizard;
    var next = _next;
    var currentSlide = steps[wizard.current];
    (0, react_1.useEffect)(function () {
        wizard.hasNext && setNext(undefined);
    }, [wizard.hasNext, wizard.current]); // wizard.hasNext,
    var isMember = (state.newcoin.pools || {})["CGY"] > 1087;
    (0, react_1.useEffect)(function () {
        if (isMember)
            actions.routing.historyPush({ location: "/explore" });
    }, [isMember]);
    if (isMember ||
        (state.indicators.isWorking &&
            !state.flows.user.create.form.username &&
            !state.api.auth.authorized &&
            !state.api.auth.attempted &&
            state.firebase.token))
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, __assign({ customClass: "app-content-layout-domain-presale" }, { children: [(0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: currentSlide.content }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "app-control-surface" }, { children: next || wizard.hasNext ? (currentSlide.action ? ((0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, __assign({ type: "primary", actionName: currentSlide.action, onClick: function () {
                        return next
                            ? next.command()
                            : actions.flows.user.create.wizardStepNext();
                    }, isErrorSubmit: isErrorSubmit }, { children: next ? next.text : "Next" }))) : ((0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ type: "primary", onClick: function () {
                        return next
                            ? next.command()
                            : actions.flows.user.create.wizardStepNext();
                    }, className: isErrorSubmit ? "disabled-submit-button" : "" }, { children: next ? next.text : "Next" })))) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})) })), (0, jsx_runtime_1.jsxs)("div", __assign({ hidden: !wizard.matches("SELECT_DOMAIN"), style: {
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    flex: "1"
                } }, { children: [(0, jsx_runtime_1.jsx)(Paragraph_1["default"], __assign({ className: "paragraph-2r nl-footer-paragraph", style: { marginTop: 48, width: "60%" } }, { children: "This will be your permanent domain and it cannot be changed or deleted." })), (0, jsx_runtime_1.jsx)(Paragraph_1["default"], __assign({ style: { width: "100%" }, className: "nl-footer-paragraph paragraph-2r" }, { children: "9 characters max: a-z and 1-5" }))] }))] })));
};
exports.DomainPresale = DomainPresale;
