import { AUTH_FLOW_STATUS } from "../auth/state";
export const onInitializeOvermind = async ({ effects, state, actions, reaction }) => {
    const auth = effects.firebase.initialize(state.config.settings.firebaseConfig);
    setTimeout(() => (state.auth.initialized = true), 700);
    auth.onAuthStateChanged((u) => actions.firebase.handleAuthChange(u));
};
export const logout = async ({ effects, state }) => {
    await effects.firebase.logout();
    state.firebase.token = "";
};
export const refreshApiToken = async ({ state, actions, effects }) => {
    const token = state.firebase.user ? (await state.firebase.user.getIdToken(true)) : "";
    if (!token)
        return actions.auth.logout();
    state.auth.status = Math.max(AUTH_FLOW_STATUS.AUTHENTICATED, state.auth.status);
    state.firebase.token = token;
    effects.api.updateToken(token);
    state.auth.tokens["firebase"] = { tokenType: "firebase", token, logout: actions.firebase.logout };
    // actions.auth.newlifeAuthorize();
};
export const handleAuthChange = async ({ actions, state, effects }, fbUser) => {
    const userChanged = state.firebase.user?.uid !== fbUser?.uid;
    if (fbUser) {
        await actions.firebase.setFbUser({ user: fbUser });
        await actions.firebase.refreshApiToken();
        const timeout = setTimeout(() => {
            actions.firebase.refreshApiToken();
        }, 30 * 60000);
        state.auth.timers.timeToRefreshCancel = () => clearTimeout(timeout);
        if (userChanged)
            await actions.api.auth.authorize();
    }
    else {
        // if(state.auth.user.id)
        if (state.auth.status === AUTH_FLOW_STATUS.REQUESTED)
            actions.auth.logout({ noRouting: true });
        state.auth.timers.timeToRefreshCancel();
    }
};
export const requestEmailLink = async ({ state, actions, effects }, { email }) => {
    await effects.firebase.requestEmailAuthCode({ email });
};
export const signInWithEmailLink = async ({ state, actions, effects }) => {
    const email = window.localStorage.getItem('emailForSignIn') || "";
    if (!email)
        return false;
    await effects.firebase.signInWithEmailLink(email, window.location.href); // state.routing.location); // with react-router, location.href is the landing url; using the router internal
    state.auth.status = AUTH_FLOW_STATUS.REQUESTED;
    return true;
};
export const requestToken = async ({ state, actions, effects }, { phone }) => {
    if (!phone)
        return effects.ux.message.warning("No phone provided");
    effects.firebase.initRecaptchaVerifier(); // ok unless we want another name for recaptcha invoking button
    actions.auth.resetAuthTimer();
    const int = setInterval(() => actions.auth.reduceTimer(), 1000);
    const timeout = setTimeout(() => {
        actions.auth.resetAuthTimer();
        clearInterval(int);
        if (state.auth.status != AUTH_FLOW_STATUS.AUTHENTICATED) {
            effects.ux.message.warning("Authentication was taking too long. Please try again.");
            actions.auth.logout();
        }
    }, 120 * 1000);
    state.auth.timers.authTimeoutCancel = () => { clearTimeout(timeout); clearInterval(int); };
    try {
        await effects.firebase.requestPhoneAuthCode({ phone });
    }
    catch (ex) {
        effects.ux.message.warning("Please try again.");
        state.auth.status = AUTH_FLOW_STATUS.ANONYMOUS;
        // actions.auth.logout({ noRouting: true });
    }
    state.auth.status = AUTH_FLOW_STATUS.RECEIVED;
};
export const verifyPhone = async ({ state, actions, effects }, { phoneVerificationCode }) => {
    state.auth.status = AUTH_FLOW_STATUS.SUBMITTED;
    const r = await effects.firebase.submitPhonVerificationCode({ phoneVerificationCode });
    effects.firebase.clearRecaptchaVerifier();
    actions.auth.resetAuthTimer();
    if (r)
        state.auth.status = AUTH_FLOW_STATUS.AUTHENTICATED;
    else {
        effects.ux.notification.error({ message: "Something went wrong, please try again" });
        await actions.auth.logout({ noRouting: true });
    }
};
export const initRecaptchaVerifier = ({ effects }, { containerOrId }) => {
    effects.firebase.initRecaptchaVerifier(containerOrId);
};
export const setFbUser = async ({ state, actions, effects }, { user }) => {
    state.firebase.user = user;
};
export default {};
//# sourceMappingURL=actions.js.map