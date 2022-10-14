import { debounce, filter, pipe } from "overmind";
import { omit, uniq } from "lodash";
import websocket from "./effects";
// import { newlifeWebsocketsServer } from "../../config";
import { capFirst } from "../../utils/capFirst";
const toggleWebSocket = pipe(debounce(500), async ({ state, effects, actions }) => {
    if (!state.api.auth.authorized)
        return;
    const token = state.newsafe?.token || state.firebase?.token;
    if (!token)
        return;
    effects.websockets.newlife.toggle(state.config.settings.newgraph.websocketsServer, token);
    if (!token || !effects.websockets.newlife.socket)
        return;
    const res = (await state.api.client.user.activityStreamList()) || {
        data: { Items: [] },
    };
    const items = [...((res.data || {}).Items || [])].reverse();
    items.forEach((ev) => actions.websockets.processIncoming({ msg: JSON.stringify(ev) }));
    effects.websockets.newlife.socket.addEventListener("message", (ev) => {
        if (ev.data === "pong")
            return;
        actions.websockets.processIncoming({ msg: ev.data });
        // state.websockets.messages.incoming.push(ev.data);
        // effects.ux.notification.open({ message: ev.data });
    });
});
const processIncomingNewcoin = //({ reaction, actions, state }, { msg })
 pipe(filter((_, { event: { type } }) => type === "newcoin"), 
// filter((_, { event: { payload } }) => (get(payload, "inbound.0.value.label") != "session")),
({ state, effects }, { event }) => {
    const msg = event.payload.message;
    const msgCore = msg.replace(/_/, " ");
    const asMsg = {
        title: event.updated + " newcoin: " + msgCore,
        link: ``,
        description: msg.error || `You ${msgCore.split(/_/)[1]} some stake.`,
        original: event,
    };
    // effects.ux.message.info(msgCore);
    state.websockets.messages.activityStream.unshift(asMsg);
    state.websockets.messages.newcoin.unshift(asMsg);
});
const modelProcessors = {
    user: ({ state, actions }, u) => {
        const curr = state.api.cache.users.byId[u.id ?? ""];
        if (Object.keys(omit(u, ["id", "label"])).length) {
            actions.api.user.cache({ user: { ...curr, ...u } });
        }
        // state.api.cache.users.byId[u.id ?? ""] = { ...state.api.cache.users.byId[u.id ?? ""], ...u };
        // state.api.cache.users.byUsername[u.username ?? ""] = { ...state.api.cache.users.byUsername[u.username ?? ""], ...u };
    },
    post: ({ actions, state }, p) => {
        state.api.cache.posts[p.id ?? ""] = {
            ...state.api.cache.posts[p.id ?? ""],
            ...p,
        };
    },
    mood: () => { },
};
const processIncomingModelUpdated = //({ reaction, actions, state }, { msg })
 pipe(filter((_, { event: { type } }) => type === "modelUpdated"), 
// filter((_, { event: { payload } }) => (get(payload, "inbound.0.value.label") != "session")),
(ctx, { event }) => {
    const { state } = ctx;
    const model = event.model === "user" ? "profile" : event.model;
    const what = capFirst(model);
    modelProcessors[event.model] && modelProcessors[event.model](ctx, event.payload.value);
    const inRels = event.payload.inbound?.filter(Boolean);
    const outRels = event.payload.outbound?.filter(Boolean);
    const rels = uniq([
        ...(inRels || []).map((r) => r.value.label),
        // ...(outRels || []).map((r: any) => r.value.label)
    ]).filter(Boolean);
    if (rels.length == 1 && rels[0] === "session")
        return;
    const asMsg = {
        title: event.updated + " " + what + " updated",
        link: `/${event.model}/${event.payload.value.id}`,
        description: !rels.length
            ? `Your ${what.toLowerCase()} got updated: ${(event.payload.updatedProps || []).join(", ")}`
            : `${what}'s ${rels.join(", ")} got updated.`,
        original: event,
    };
    return state.websockets.messages.activityStream.unshift(asMsg);
});
const processIncoming = ({ reaction, actions, state }, { msg }) => {
    try {
        const ev = JSON.parse(msg);
        // if(ev.message == "Endpoint request timed out")
        // {
        //   actions.firebase.refreshApiToken();
        //   return;
        // }
        // state.websockets.messages.incoming.unshift(ev)
        actions.websockets.processIncomingModelUpdated({ event: ev });
        actions.websockets.processIncomingNewcoin({ event: ev });
        // state.websockets.messages.activityStream.unshift({ ... })
        // ev.type === "modelUpdated"
    }
    catch (ex) {
        // unparseable?
    }
};
// const onInitializeOvermind: Action = ({ reaction, actions }) => {
//     reaction(
//         (st) => st.auth.user,
//         (id) => id && actions.websockets.toggleWebSocket()
//     )
// }
const actions = {
    // onInitializeOvermind,
    toggleWebSocket,
    processIncoming,
    processIncomingModelUpdated,
    processIncomingNewcoin,
};
export default {
    state: {
        socket: null,
        // url: newlifeWebsocketsServer,
        messages: {
            incoming: [],
            activityStream: [],
            newcoin: [],
        },
    },
    actions,
    effects: {
        newlife: websocket((wsServer, token) => `${wsServer}?token=${token}`),
    },
};
//# sourceMappingURL=index.js.map