import * as auth from "./actions/auth";
import * as mood from "./actions/mood";
import * as post from "./actions/post";
import * as user from "./actions/user";
import { Action } from "../../types";
declare const _default: {
    onInitializeOvermind: Action<undefined, void>;
    auth: typeof auth;
    user: typeof user;
    mood: typeof mood;
    post: typeof post;
};
export default _default;
