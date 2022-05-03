"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTitle = exports.setBreadcrumbs = exports.historyPush = exports.setHistory = exports.setPreloginRoute = exports.onRouteChange = exports.goBack = exports.routeAfterAuth = void 0;
const naiveQSDecode = (search = "") => search.slice(1).split(/&/).map(kv => kv.split(/=/)).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
const routeAfterAuth = async ({ state, actions }) => {
    const p = state.routing.location;
    if (!state.config.routes.defaultRoute.condition(state) || state.api.auth.authorized) {
        const location = state.config.routes.defaultRoute.defaultLocation(state);
        actions.routing.historyPush({ location });
        return;
    }
    const h0s = state.routing.simpleHistory.length ? state.routing.simpleHistory[0].search : undefined;
    const qs0 = naiveQSDecode(h0s);
    if (qs0.path) {
        actions.routing.historyPush({ location: qs0.path });
        return;
    }
    const nextRoute = !state.api.auth.authorized ? "/user-create" :
        state.routing.preLoginRoute || "/explore";
    //  || 
    // (NONPOSTAUTHLOCATIONS.includes(p) ? 
    //     "/explore" : p);
    state.routing.preLoginRoute = "";
    // (nextRoute != p) && actions.routing.historyPush({ location: nextRoute });
};
exports.routeAfterAuth = routeAfterAuth;
const last = (a) => a[a.length - 1];
const uriFromLocation = ({ pathname, search }) => `${pathname}?${search}`;
const goBack = ({ actions, state }) => {
    state.routing.backHistory.pop();
    const bh = state.routing.backHistory.pop();
    const current = uriFromLocation(state.routing.history.location);
    const prev = bh ? uriFromLocation(bh) : "/";
    actions.routing.historyPush({ location: bh ? uriFromLocation(bh) : "/" });
};
exports.goBack = goBack;
const onRouteChange = async ({ state, actions }, { location: { pathname, search } }) => {
    state.routing.location = [pathname, search].filter(Boolean).join("");
    actions.routing.setPreloginRoute();
    state.routing.simpleHistory.push({ pathname, search });
    const lastBh = last(state.routing.backHistory);
    if (lastBh) {
        const prevPath = (lastBh.pathname || "").split(/\//);
        const currPath = pathname.split(/\//);
        if ((currPath.length <= 3) || (prevPath.length != currPath.length) ||
            currPath.slice(0, currPath.length - 2).join("") != prevPath.slice(0, currPath.length - 2).join(""))
            state.routing.backHistory.push({ pathname, search });
    }
    else {
        state.routing.backHistory.push({ ...state.routing.history.location });
    }
    ;
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
exports.onRouteChange = onRouteChange;
const setPreloginRoute = ({ state, actions, effects }) => {
    const p = state.routing.location;
    if (p !== "/auth")
        state.routing.preLoginRoute = p;
};
exports.setPreloginRoute = setPreloginRoute;
const setHistory = async ({ state, actions, effects }, { history }) => {
    state.routing.history = history;
};
exports.setHistory = setHistory;
const historyPush = async ({ state, effects }, { location, force }) => {
    // effects.ux.message.info("Routing to " + location)
    if (force)
        state.routing.location = "";
    state.routing.location = location;
    state.routing.history.push(location);
};
exports.historyPush = historyPush;
const setBreadcrumbs = ({ state, actions, effects }, value) => {
    state.routing.breadcrumbs = value;
};
exports.setBreadcrumbs = setBreadcrumbs;
const setTitle = ({ state, actions, effects }, value) => {
    global.document.title = (value?.substring(0, 44) || "") + " ~ Newlife.IO";
};
exports.setTitle = setTitle;
//# sourceMappingURL=actions.js.map