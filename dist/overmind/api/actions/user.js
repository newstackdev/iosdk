import { AUTH_FLOW_STATUS } from "../../auth/state";
import { debounce, pipe, throttle } from "overmind";
import { get } from "lodash";
export const cache = async ({ state, actions, effects }, { user, force }) => {
    // moods.forEach(m => m.author = ur.data)
    let { id, username } = { id: "", username: "", ...user };
    const cache = state.api.cache.users;
    if (!id && !username)
        return;
    !id && (id = cache.byUsername[username].id || "");
    !username && (username = cache.byId[id].username || "");
    // mr.data.value?.forEach(m => (m.id && (state.api.cache.moods[m.id] = { ...state.api.cache.moods[m.id], ...m })));
    let curr;
    try {
        curr = (id ? cache.byId[id] : cache.byUsername[username]) || null;
    }
    catch (ex) {
        console.log(ex);
    }
    const isNewer = force || !curr || !curr.moods?.length || new Date(user?.updated || 0).getTime() - new Date(curr?.updated || 0).getTime() > 0;
    if (!isNewer)
        return;
    const mr = curr?.moods?.length || 0 > 4 ? curr?.moods : (await state.api.client.user.moodsList({ id })).data?.value;
    const moods = mr || [];
    mr && actions.api.mood.cache({ moods: mr });
    if (state.api.auth.user?.id == id)
        state.api.auth.moods = [...(state.api.cache.users.byId[state.api.auth.user?.id || ""]?.moods || [])];
    if (curr && curr.id && curr.username && curr.moods && curr.moods.length < moods.length) {
        cache.byId[id].moods = moods;
        cache.byUsername[username || ""].moods = moods;
    }
    else {
        cache.byId[id] = { ...curr, ...user, moods: mr };
        cache.byUsername[username] = { ...curr, ...user, moods };
    }
    state.api.auth.user?.id === user.id && (state.api.auth.user = Object.assign({}, cache.byId[id])); //state.api.auth.user, user));
};
const inProgress = {};
export const read = async ({ state, actions, effects }, { id, username }) => {
    if (!(id || username))
        return;
    const known = (id && state.api.cache.users.byId[id]) || (username && state.api.cache.users.byUsername[username]);
    const ur = await (known
        ? Promise.resolve({ data: known })
        : state.api.client.user.userList({ ...(id ? { id } : {}), username }));
    id = id || ur.data.id || "";
    actions.api.user.cache({ user: ur.data });
    return ur.data;
};
export const create = pipe(throttle(3000), async ({ state, effects, actions }, { noRouting, user, preregisterCreate }) => {
    try {
        const currUser = state.api.auth.user || {};
        if (currUser.id && preregisterCreate) {
            return;
        }
        if (currUser.id &&
            currUser.username &&
            !["imported"].includes(currUser.status || "") &&
            !state.flows.user.create.isLegacyUpdateOngoing) {
            return;
        }
        const pn = state.firebase.user.phoneNumber;
        if (!pn) {
            !noRouting && actions.routing.historyPush({ location: "/auth" });
            return;
        }
        user.phone = pn;
        const nu = preregisterCreate
            ? await state.api.client.user.preregisterCreate(user)
            : await state.api.client.user.userCreate({
                ...user,
                legacyToken: state.flows.user.create.legacyToken,
            });
        !preregisterCreate &&
            effects.ux.notification.open({
                message: "Success!",
                description: "User was created successfully. Welcome to Newlife.IO!",
            });
        await actions.api.auth.logout({ keepFbUser: true });
        await actions.firebase.refreshApiToken();
        await actions.api.auth.authorize();
        state.flows.user.create.justCreated = true;
        state.flows.user.create.isLegacyUpdateOngoing = false;
    }
    catch (ex) {
        effects.ux.message.error(JSON.stringify(get(ex, "error.errorMessage.details") || get(ex, "message")));
    }
});
export const update = async ({ state, effects, actions }, { user, file }) => {
    const id = state.api.auth.user?.id ?? "";
    await state.api.client.user.userUpdate({ ...user, id });
    effects.ux.message.info(`Successfully updated profile`);
    // state.api.cache.users.byId[id] = state.api.auth.user = {
    //   ...state.api.auth.user
    // };
    const hasUpload = file && file.originFileObj;
    if (hasUpload) {
        //@ts-ignore
        const uploadInfo = await state.api.client.user.uploadCreate({
            filename: file.name,
            contentType: file.type,
        });
        const r = await fetch(uploadInfo.data.url, {
            method: "PUT",
            body: file.originFileObj,
        });
        effects.ux.message.info(`Successfully updated profile avatar. Processing the image, this will take up to a minute.`);
    }
    actions.api.user.cache({
        force: true,
        user: { ...user, id, ...(hasUpload ? { contentUrl: "PROCESSING" } : {}) },
    });
};
export const getMoods = async ({ state, actions, effects }, { id }) => {
    if (!id)
        return;
    const r = await state.api.client.user.moodsList({ id });
    if (!r.data)
        return;
    const u = state.api.cache.users.byId[id];
    actions.api.user.cache({ user: u });
    // const un = u?.username || "";
    // state.api.cache.users.byId[id].moods =  (r.data?.value || []) as MoodReadResponse[];
    // state.api.cache.users.byUsername[u.username || ""].moods =  (r.data?.value || []) as MoodReadResponse[];
    //   moods: (r.data?.value || []) as MoodReadResponse[],
    // };
    actions.api.mood.cache({ moods: r.data?.value });
    // r.data.value?.forEach(p => p.id && (state.api.cache.moods[p.id] = { ...state.api.cache.moods[p.id], ...p }))
};
export const stake = pipe(debounce(1000), async ({ state, actions, effects }, { user, amount }) => {
    try {
        const u = await actions.api.user.read(user);
        const res = await state.api.client.user.stakeCreate({
            username: u?.username || "",
            amount,
        });
        state.api.cache.stakeHistory.push({
            user,
            amount,
            response: res,
            error: null,
        });
        //tate.api.actions.newcoin.getAccountBalance();({ user, amount, response: res });
        const pool = { owner: user.username };
        actions.newcoin.getAccountBalance({
            user: state.api.auth.user || {},
        });
        actions.newcoin.getPoolInfo({ pool: { owner: user.username } });
        return res.data;
    }
    catch (ex) {
        const { error: { errorMessage }, } = ex;
        state.api.cache.stakeHistory.push({
            user,
            amount,
            response: null,
            error: ex,
        });
        effects.ux.message.error(errorMessage);
    }
});
export const invite = ({ state }, { userInvite }) => {
    const rate = state.api.client.user.inviteCreate(userInvite);
};
export const powerup = pipe(debounce(300), async ({ state, actions, effects }, { user, amount }) => {
    try {
        const res = await state.api.client.user.userRateCreate({
            targetId: user.id,
            value: amount || 1,
        });
        effects.ux.message.info("Powerup successful");
        await actions.api.user.getPowerups({
            user: state.api.auth.user || {},
        });
        await actions.api.user.getPowerups({ user });
    }
    catch (ex) {
        effects.ux.message.error(ex.error.errorMessage);
    }
});
export const powerUpMultiple = pipe(debounce(300), async ({ state, actions, effects }, powerUps) => {
    try {
        const promise = powerUps.users.map((user) => {
            return state.api.client.user.userRateCreate({
                targetId: user.id,
                value: 1,
            });
        });
        await Promise.all(promise);
        // effects.ux.message.info("Powerups successful");
        await actions.api.user.getPowerups({
            user: state.api.auth.user || {},
        });
        const promiseSecond = powerUps.users.map((user) => {
            return actions.api.user.getPowerups({ user });
        });
        await Promise.all(promiseSecond);
    }
    catch (ex) {
        effects.ux.message.error(ex.error.errorMessage);
    }
});
export const getPowerups = pipe(
// throttle(300),
async ({ state }, { user }) => {
    if (!user.id)
        return;
    if (state.api.cache.powerups[user.id || ""])
        return;
    const o = await state.api.client.user.ratedOutUsersList(user);
    const i = await state.api.client.user.ratedInList(user);
    state.api.cache.powerups[user.id || ""] = {
        in: i.data,
        out: o.data,
    };
});
export const getCurrent = async ({ state, actions, effects }) => {
    try {
        state.routing.simpleHistory[0].search
            .slice(1)
            .split(/&/)
            .map((kv) => kv.split(/=/))
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        state.api.auth.user = (await state.api.client.user.currentList()).data;
        state.auth.status = state.api.auth.user.username ? AUTH_FLOW_STATUS.AUTHORIZED : state.auth.status;
    }
    catch (ex) {
        state.api.auth.user = {};
    }
    // actions.auth.routeAfterAuth();
};
export const checkLinkHash = ({ effects }, { hash }) => {
    // effects.api
    return;
};
export const checkNft = ({ effects }, { collectionAddr, nftId }) => {
    // effects.api
    return;
};
//# sourceMappingURL=user.js.map