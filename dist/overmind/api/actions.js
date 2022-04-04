"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mood = __importStar(require("./actions/mood"));
const user = __importStar(require("./actions/user"));
const post = __importStar(require("./actions/post"));
const state_1 = require("../auth/state");
const auth = __importStar(require("./actions/auth"));
const onInitializeOvermind = async ({ effects, state, actions, reaction }) => {
    state.api.client = effects.api.initialize();
    // reaction(
    //     (state) => state.firebase.user,
    //     async (fbUser) => {
    //         if (!fbUser && state.api.auth?.user?.id)
    //             return actions.api.auth.logout();
    //     });
    reaction((state) => state.api.auth.authorized, async () => {
        if (state.auth.status < state_1.AUTH_FLOW_STATUS.AUTHORIZED ||
            !["registered", "admitted"].includes(state.api.auth.user?.status || "")) {
            console.log("Not yet authorized");
            return;
        }
        ;
        actions.websockets.toggleWebSocket();
        await actions.api.user.getMoods({ id: state.api.auth.user?.id });
        state.api.auth.moods = [...(state.api.cache.users.byId[state.api.auth.user?.id || ""]?.moods || [])];
        await actions.api.user.getPowerups({ user: state.api.auth.user || {} });
    });
};
exports.default = {
    onInitializeOvermind,
    auth,
    user,
    mood,
    post
};
// export default namespaced({
//     user: { actions: user },
//     mood: { actions: mood },
//     post: { actions: post }
// });
//# sourceMappingURL=actions.js.map