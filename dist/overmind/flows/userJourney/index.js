const state = {
    flags: {},
};
const setFlag = ({ state }, { flag, value }) => {
    state.flows.userJourney.flags[flag] = value;
    window.localStorage.setItem("iosdk_flags", JSON.stringify(state.flows.userJourney.flags));
};
const onInitializeOvermind = ({ state }) => {
    const flags = window.localStorage.getItem("iosdk_flags");
    const parsedFlags = JSON.parse(flags || "{}");
    state.flows.userJourney.flags = parsedFlags;
};
const actions = {
    setFlag,
    onInitializeOvermind,
};
export default {
    actions,
    state,
};
//# sourceMappingURL=index.js.map