// import { NONPOSTAUTHLOCATIONS } from "../../constants";
import { Action, Link } from "@newcoin-foundation/core";
import { History } from "history";
import { ROUTE_ACCESS_LEVELS } from "./state";

const naiveQSDecode = (search: string = ""): Record<string, string> =>
  search
    .slice(1)
    .split(/&/)
    .map((kv) => kv.split(/=/))
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

export const routeAfterAuth: Action<unknown> = async ({ state, actions }) => {
  const p = state.routing.location;
  if (!state.api.auth.authorized) {
    actions.routing.historyPush({ location: "/" });
    return;
  }
  const h0s = state.routing.simpleHistory.length
    ? state.routing.simpleHistory[0].search
    : undefined;
  const qs0 = naiveQSDecode(h0s);
  if (qs0.path) {
    actions.routing.historyPush({ location: qs0.path });
    return;
  }

  const nextRoute = !state.api.auth.authorized
    ? "/user-create"
    : state.routing.preLoginRoute || "/explore";
  //  ||
  // (NONPOSTAUTHLOCATIONS.includes(p) ?
  //     "/explore" : p);

  state.routing.preLoginRoute = "";

  // (nextRoute != p) && actions.routing.historyPush({ location: nextRoute });
};

const last = <T>(a: T[]) => a[a.length - 1];
const uriFromLocation = ({
  pathname,
  search,
}: {
  pathname: string;
  search: string;
}) => `${pathname}?${search}`;

export const goBack: Action = ({ actions, state }) => {
  state.routing.backHistory.pop();
  const bh = state.routing.backHistory.pop();

  const current = uriFromLocation(state.routing.history.location);
  const prev = bh ? uriFromLocation(bh) : "/";

  actions.routing.historyPush({ location: bh ? uriFromLocation(bh) : "/" });
};

export const onRouteChange: Action<{
  location: { pathname: string; search: string };
}> = async ({ state, actions }, { location: { pathname, search } }) => {
  state.routing.location = [pathname, search].filter(Boolean).join("");
  actions.routing.setPreloginRoute();

  state.routing.simpleHistory.push({ pathname, search });

  const lastBh = last(state.routing.backHistory);
  if (lastBh) {
    const prevPath = (lastBh.pathname || "").split(/\//);
    const currPath = pathname.split(/\//);

    if (
      currPath.length <= 3 ||
      prevPath.length != currPath.length ||
      currPath.slice(0, currPath.length - 2).join("") !=
        prevPath.slice(0, currPath.length - 2).join("")
    )
      state.routing.backHistory.push({ pathname, search });
  } else {
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

export const setPreloginRoute: Action<undefined> = ({
  state,
  actions,
  effects,
}) => {
  const p = state.routing.location;

  if (p !== "/auth") state.routing.preLoginRoute = p;
};

export const setHistory: Action<{ history: History }> = async (
  { state, actions, effects },
  { history }
) => {
  state.routing.history = history;
};

export const historyPush: Action<{
  location: string;
  force?: boolean;
}> = async ({ state, effects }, { location, force }) => {
  // effects.ux.message.info("Routing to " + location)

  if (force) state.routing.location = "";

  state.routing.location = location;

  state.routing.history.push(location);
};

export const setBreadcrumbs: Action<Link[]> = (
  { state, actions, effects },
  value
) => {
  state.routing.breadcrumbs = value;
};

export const setTitle: Action<string | undefined> = (
  { state, actions, effects },
  value
) => {
  global.document.title = (value?.substring(0, 44) || "") + " ~ Newlife.IO";
};
