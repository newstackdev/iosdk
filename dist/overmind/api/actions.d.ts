import * as mood from "./actions/mood";
import * as user from "./actions/user";
import * as post from "./actions/post";
import { Action } from "../../types";
import * as auth from "./actions/auth";
declare const _default: {
    onInitializeOvermind: Action<undefined, void>;
    auth: typeof auth;
    user: typeof user;
    mood: typeof mood;
    post: typeof post;
};
export default _default;
