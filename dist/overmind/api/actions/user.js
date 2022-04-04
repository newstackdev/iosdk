"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrent = exports.getPowerups = exports.powerup = exports.invite = exports.stake = exports.getMoods = exports.update = exports.create = exports.read = exports.cache = void 0;
const lodash_1 = require("lodash");
const overmind_1 = require("overmind");
const state_1 = require("../../auth/state");
const cache = async ({ state, actions, effects }, { user }) => {
    // moods.forEach(m => m.author = ur.data)
    const { id, username } = { id: "", username: "", ...user };
    const cache = state.api.cache.users;
    if (!id && !username)
        return;
    // mr.data.value?.forEach(m => (m.id && (state.api.cache.moods[m.id] = { ...state.api.cache.moods[m.id], ...m })));
    const curr = cache.byId[id] || cache.byUsername[username] || null;
    const mr = curr?.moods || ((await state.api.client.user.moodsList({ id })).data?.value);
    const moods = mr || [];
    mr && actions.api.mood.cache({ moods: mr });
    if (curr && curr.id && curr.username && curr.moods && curr.moods.length < moods.length) {
        cache.byId[id].moods = moods;
        cache.byUsername[curr.username || ""].moods = moods;
    }
    else {
        cache.byId[id] = { ...curr, ...user, moods: mr };
        cache.byUsername[username] = { ...curr, ...user, moods };
    }
};
exports.cache = cache;
const inProgress = {};
const read = async ({ state, actions, effects }, { id, username }) => {
    if (!(id || username))
        return;
    const known = (id && state.api.cache.users.byId[id]) || (username && state.api.cache.users.byUsername[username]);
    const ur = await (known ? Promise.resolve({ data: known }) : state.api.client.user.userList({ ...(id ? { id } : {}), username }));
    id = id || ur.data.id || "";
    actions.api.user.cache({ user: ur.data });
    return ur.data;
};
exports.read = read;
exports.create = (0, overmind_1.pipe)((0, overmind_1.throttle)(3000), async ({ state, effects, actions }, { noRouting, user, preregisterCreate }) => {
    try {
        const currUser = state.api.auth.user || {};
        if (currUser.id && preregisterCreate)
            return;
        if (currUser.id && currUser.username && !["imported"].includes(currUser.status || ""))
            return;
        const pn = state.firebase.user.phoneNumber;
        if (!pn) {
            !noRouting && actions.routing.historyPush({ location: "/auth" });
            return;
        }
        user.phone = pn;
        const nu = preregisterCreate ?
            await state.api.client.user.preregisterCreate(user) :
            await state.api.client.user.userCreate({ ...user, legacyToken: state.flows.user.create.legacyToken });
        !preregisterCreate && effects.ux.notification.open({
            message: 'Success!',
            description: 'User was created successfully'
        });
        await actions.api.auth.logout({ keepFbUser: true });
        await actions.firebase.refreshApiToken();
        await actions.api.auth.authorize();
        state.flows.user.create.justCreated = true;
    }
    catch (ex) {
        effects.ux.message.error(JSON.stringify((0, lodash_1.get)(ex, "error.errorMessage.details") || (0, lodash_1.get)(ex, "message")));
    }
});
const update = async ({ state, effects, actions }, { user, file }) => {
    const id = state.api.auth.user?.id ?? "";
    await state.api.client.user.userUpdate({ ...user, id });
    effects.ux.message.info(`Successfully updated profile`);
    state.api.cache.users.byId[id] = state.api.auth.user = { ...state.api.auth.user };
    if (file && file.originFileObj) {
        //@ts-ignore
        const uploadInfo = await state.api.client.user.uploadCreate({ filename: file.name, contentType: file.type });
        const r = await fetch(uploadInfo.data.url, {
            method: 'PUT',
            body: file.originFileObj
        });
        await actions.api.user.cache({ user: { ...state.api.auth.user, ...user, contentUrl: "processing" } });
        effects.ux.message.info(`Successfully updated profile avatar. Processing the image, this will take up to a minute.`);
    }
    // state.auth.user = { ...state.auth.user, ...user, contentUrl: "PROCESSING" };
};
exports.update = update;
const getMoods = async ({ state, actions, effects }, { id }) => {
    if (!id)
        return;
    const r = await state.api.client.user.moodsList({ id });
    if (!r.data)
        return;
    const u = state.api.cache.users.byId[id];
    const un = u?.username || "";
    state.api.cache.users.byId[id] = {
        ...u,
        moods: (r.data?.value || [])
    };
    state.api.cache.users.byUsername[un] = {
        ...u,
        moods: (r.data?.value || [])
    };
    actions.api.mood.cache({ moods: r.data?.value });
    // r.data.value?.forEach(p => p.id && (state.api.cache.moods[p.id] = { ...state.api.cache.moods[p.id], ...p }))
};
exports.getMoods = getMoods;
exports.stake = (0, overmind_1.pipe)((0, overmind_1.debounce)(1000), async ({ state, actions, effects }, { user, amount }) => {
    try {
        const u = await actions.api.user.read(user);
        const res = await state.api.client.user.stakeCreate({ username: u?.username || "", amount });
        state.api.cache.stakeHistory.push({ user, amount, response: res, error: null });
        //tate.api.actions.newcoin.getAccountBalance();({ user, amount, response: res });
        const pool = { owner: user.username };
        actions.newcoin.getAccountBalance({ user: state.api.auth.user || {} });
        actions.newcoin.getPoolInfo({ pool: { owner: user.username } });
    }
    catch (ex) {
        const { error: { errorMessage } } = ex;
        state.api.cache.stakeHistory.push({ user, amount, response: null, error: ex });
        effects.ux.message.error(errorMessage);
    }
});
const invite = ({ state }, { userInvite }) => {
    const rate = state.api.client.user.inviteCreate(userInvite);
};
exports.invite = invite;
exports.powerup = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), async ({ state, actions, effects }, { user, amount }) => {
    try {
        const res = await state.api.client.user.rateCreate({ targetId: user.id, value: amount || 1 });
        effects.ux.message.info("Powerup successful");
        await actions.api.user.getPowerups({ user: state.api.auth.user || {} });
        await actions.api.user.getPowerups({ user });
    }
    catch (ex) {
        effects.ux.message.error(ex.error.errorMessage);
    }
});
exports.getPowerups = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), async ({ state }, { user }) => {
    const o = await state.api.client.user.ratedOutUsersList(user);
    const i = await state.api.client.user.ratedInList(user);
    state.api.cache.powerups[user.id || ""] = {
        in: i.data,
        out: o.data
    };
});
const getCurrent = async ({ state, actions, effects }) => {
    try {
        state.routing.simpleHistory[0].search.slice(1).split(/&/).map(kv => kv.split(/=/)).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        state.api.auth.user = (await state.api.client.user.currentList()).data;
        state.auth.status = state.api.auth.user.username ? state_1.AUTH_FLOW_STATUS.AUTHORIZED : state.auth.status;
    }
    catch (ex) {
        state.api.auth.user = {};
    }
    // actions.auth.routeAfterAuth();
};
exports.getCurrent = getCurrent;
//# sourceMappingURL=user.js.map