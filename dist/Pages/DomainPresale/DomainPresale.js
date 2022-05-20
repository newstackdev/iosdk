import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Tag, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { MaskedInput } from "antd-mask-input";
import { ContentLayout } from "../../Components/ContentLayout";
import { useActions, useAppState } from "../../overmind";
import Paragraph from "antd/lib/typography/Paragraph";
import { Auth } from "../Auth/Auth";
import { Product } from "../Store/Product";
import { UserCreate } from "../User/UserCreate";
import { ProgressButton } from "../../Components/ProgressButton";
import { Link } from "react-router-dom";
import { AppearingComponent } from "../../Components/Appearing";
import { SpaceSpin } from "../../Components/Spin";
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
    const el = useRef({});
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
    return (_jsxs(ContentLayout, { children: [_jsx(MaskedInput, { ref: el, className: fuia === "unavailable"
                    ? "nl-domain-presale__masked-input masked-input-error"
                    : "nl-domain-presale__masked-input", defaultValue: state.flows.user.create.form.username?.replace(/\.io$/, "") || "", size: "large", mask: "xxxxxxxxx.IO", placeholderChar: "\u200C", onChange: (v) => {
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
                } }), _jsx(SpaceSpin, { isRotating: fuia === "checking" }), fuia === "unavailable" && (_jsxs(Tag, { className: "u-margin-top-medium", children: ["Name is ", fuia] })), _jsxs(Paragraph, { className: "paragraph-2r nl-domain-presale__footer-paragraph", children: [isPaidUsername() ? (_jsxs(AppearingComponent, { seconds: 1, children: [_jsx("br", {}), state.config.featureFlags.onboarding.premiumDomains ?
                                _jsx(_Fragment, { children: "Premium usernames shorter than 5 characters must be purchased. Click Next to continue." }) :
                                _jsxs(_Fragment, { children: ["For early access please contact\u00A0", _jsx("a", { href: "https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ", target: "_new", children: "our support team" }), "."] })] })) : (""), state.flows.user.create.legacyToken &&
                        (state.flows.user.create.form.displayName !==
                            state.flows.user.create.form.username ||
                            fuia === "unavailable") ? (_jsxs(_Fragment, { children: [_jsx(Tooltip, { title: _jsx(_Fragment, { children: "Your Newlife identity is now a part of the Newcoin ecosystem and provides access to many exciting services. You may keep your current username as the display name on Newlife on the next dialog." }), children: _jsx("span", { children: "Why is my username changing?" }) }), "\u00A0", _jsxs("a", { href: "/", onClick: () => actions.flows.user.create.stopLegacyImport(), children: ["I am not", " ", state.flows.user.create.form.displayName ||
                                        state.flows.user.create.form.username] })] })) : ("")] })] }));
};
//: Record<string, { title: string, content: ReactElement | EmbeddableControl }>
const InitSteps = (setNext, isErrorSubmit, setIsErrorSubmit) => {
    return {
        SELECT_DOMAIN: {
            title: "Choose your permanent domain name. This cannot be changed or deleted, and you own it.",
            content: _jsx(DomainSelector, {}),
            action: "",
        },
        AUTHENTICATE: {
            title: "You need to verify your phone number to pre-register your account. You will receive a verification code via SMS",
            content: (_jsx(Auth, { embedded: true, setNext: setNext, setIsErrorSubmit: setIsErrorSubmit, isErrorSubmit: isErrorSubmit })),
            action: "",
        },
        SUBSCRIBE: {
            title: "",
            action: "payments.pay",
            content: _jsx(Product, { embedded: true, setNext: setNext }),
        },
        CREATE_USER: {
            title: "",
            action: "api.user.create",
            content: (_jsx(UserCreate, { embedded: true, setNext: setNext, hideUsername: true, noRouing: true, setIsErrorSubmit: setIsErrorSubmit })),
        },
        DONE: {
            title: "",
            content: _jsx(Done, {}),
            action: "",
        },
    };
};
export const DomainPresale = () => {
    const actions = useActions();
    const state = useAppState();
    const [isErrorSubmit, setIsErrorSubmit] = useState(false);
    const [_next, setNext] = useState();
    const [steps] = useState(InitSteps(setNext, isErrorSubmit, setIsErrorSubmit));
    const wizard = state.flows.user.create.wizard;
    const next = _next;
    const currentSlide = steps[wizard.current];
    useEffect(() => {
        wizard.hasNext && setNext(undefined);
    }, [wizard.hasNext, wizard.current]); // wizard.hasNext,
    const isMember = (state.newcoin.pools || {})["CGY"] > 1087;
    useEffect(() => {
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
        return _jsx(_Fragment, {});
    return (_jsxs(_Fragment, { children: [_jsxs(ContentLayout, { customClass: "app-content-layout", children: [currentSlide.content, _jsx("div", { className: "app-control-surface", children: next || wizard.hasNext ? (currentSlide.action ? (_jsx(ProgressButton, { type: "primary", progressText: "Processing...", actionName: currentSlide.action, onClick: () => {
                                return next
                                    ? next.command()
                                    : actions.flows.user.create.wizardStepNext();
                            }, isErrorSubmit: isErrorSubmit, children: next ? next.text : "Next" })) : (_jsx(Button, { type: "primary", disabled: isErrorSubmit, onClick: () => next
                                ? next.command()
                                : actions.flows.user.create.wizardStepNext(), className: isErrorSubmit
                                ? "disabled-submit-button"
                                : "", children: next ? next.text : "Next" }))) : (_jsx(_Fragment, {})) }), !state.flows.user.create.legacyToken &&
                        !state.auth.authenticated &&
                        wizard.matches("SELECT_DOMAIN") && (_jsx("div", { className: "app-main-full-width u-margin-top-medium text-center", children: _jsx(Button, { type: "primary", className: "big-button", children: _jsx(Link, { to: "/auth/newlife-members", className: "header-1b", children: "I'm an early Newlife member!" }) }) })), _jsx("div", { className: "u-margin-top-large", children: _jsx(SupportBox, {}) })] }), _jsxs("div", { 
                // hidden={!wizard.matches("SELECT_DOMAIN")}
                className: "nl-domain-presale__info-text__wrapper", children: [_jsx(Paragraph, { className: "paragraph-2r nl-domain-presale__footer-paragraph", children: footerTitle }), wizard.matches("SELECT_DOMAIN") && (_jsx(Paragraph, { className: "nl-domain-presale__footer-paragraph paragraph-2r", children: "9 characters max: a-z and 1-5" }))] })] }));
};
//# sourceMappingURL=DomainPresale.js.map