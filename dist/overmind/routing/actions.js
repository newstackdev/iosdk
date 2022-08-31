import { Wizard, routesToCreateWizard } from "../flows/user/onboarding/wizardStateMachine";
import isEmpty from "lodash/isEmpty";
const naiveQSDecode = (search = "") => search
    .slice(1)
    .split(/&/)
    .map((kv) => kv.split(/=/))
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
export const routeAfterAuth = async ({ state, actions }) => {
    const p = state.routing.location;
    const h0s = state.routing.simpleHistory.length ? state.routing.simpleHistory[0].search : undefined;
    const qs0 = naiveQSDecode(h0s);
    if (qs0.path) {
        setTimeout(() => {
            actions.routing.historyPush({ location: qs0.path });
        });
        return;
    }
    if (state.routing.isAllowed) {
        return;
    }
    if (!state.routing.isAllowed && !state.config.routes.defaultRoute.condition(state)) {
        const location = state.config.routes.defaultRoute.defaultLocation(state);
        actions.routing.historyPush({ location });
        return;
    }
    // const nextRoute = !state.api.auth.authorized ? "/user-create" : state.routing.preLoginRoute || "/explore";
    //  ||
    // (NONPOSTAUTHLOCATIONS.includes(p) ?
    //     "/explore" : p);
    state.routing.preLoginRoute = "";
    // (nextRoute != p) && actions.routing.historyPush({ location: nextRoute });
};
const last = (a) => a[a.length - 1];
const uriFromLocation = ({ pathname, search }) => `${pathname}?${search}`;
export const goBack = ({ actions, state }) => {
    window.history.back();
};
const onRouteChangeWizard = (pathname, state) => {
    const restrictedPrev = ["HASH_VERIFY", "AUTHENTICATE"];
    if (!state.api.auth.authorized) {
        if (!isEmpty(state.flows.user.create.progressedSteps)) {
            if (routesToCreateWizard[pathname]) {
                state.flows.user.create.progressedSteps = state.flows.user.create.progressedSteps.map((step, i) => {
                    if (step.current === routesToCreateWizard[pathname]) {
                        if (restrictedPrev.includes(routesToCreateWizard[pathname])) {
                            location.replace("/");
                            return;
                        }
                        state.flows.user.create.wizard = Wizard.create(step, step[i]);
                    }
                    return step;
                });
            }
        }
    }
};
export const onRouteChange = async ({ state, actions }, { location: { pathname, search } }) => {
    state.routing.location = [pathname, search].filter(Boolean).join("");
    actions.routing.setPreloginRoute();
    state.routing.simpleHistory.push({ pathname, search });
    onRouteChangeWizard(pathname, state);
    const lastBh = last(state.routing.backHistory);
    if (lastBh) {
        const prevPath = (lastBh.pathname || "").split(/\//);
        const currPath = pathname.split(/\//);
        if (currPath.length <= 3 ||
            prevPath.length != currPath.length ||
            currPath.slice(0, currPath.length - 2).join("") != prevPath.slice(0, currPath.length - 2).join(""))
            state.routing.backHistory.push({ pathname, search });
    }
    else {
        state.routing.backHistory.push({ ...state.routing.history.location });
    }
    if (!state.routing.isAllowed) {
        return;
    }
    setTimeout(() => window.scrollTo(0, 0));
    // if(state.auth.authorized)
    //     return actions.routing.historyPush({ location: "/explore" });
    // return actions.routing.historyPush({ location: "/auth", force: true });
    // if(state.auth.authenticated && isAuthPath)
    //     return actions.routing.historyPush({ location: "/explore" });
    // if(!state.auth.authenticated && !isAuthPath)
    //     return actions.routing.historyPush({ location: "/auth", force: true });
};
export const setPreloginRoute = ({ state, actions, effects }) => {
    const p = state.routing.location;
    if (p !== "/auth")
        state.routing.preLoginRoute = p;
};
export const setHistory = async ({ state, actions, effects }, { history }) => {
    state.routing.history = history;
};
export const historyPush = async ({ state, effects }, { location, force }) => {
    // effects.ux.message.info("Routing to " + location)
    if (force)
        state.routing.location = "";
    state.routing.location = location;
    state.routing.history.push(location);
};
export const setBreadcrumbs = ({ state, actions, effects }, value) => {
    state.routing.breadcrumbs = value;
};
export const setTitle = ({ state, actions, effects }, value) => {
    global.document.title = (value?.substring(0, 44) || "") + " ~ Newlife.IO";
};
//# sourceMappingURL=actions.js.map