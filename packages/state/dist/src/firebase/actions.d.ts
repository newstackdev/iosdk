import { Action } from "../state";
import { User } from "firebase/auth";
export declare const onInitializeOvermind: Action<undefined>;
export declare const logout: Action;
export declare const refreshApiToken: Action;
export declare const handleAuthChange: Action<User | null>;
export declare const requestEmailLink: Action<{
    email: string;
}>;
export declare const signInWithEmailLink: Action<{
    email: string;
}, boolean>;
export declare const requestToken: Action<{
    phone: string;
}>;
export declare const verifyPhone: Action<{
    phoneVerificationCode: string;
}>;
export declare const initRecaptchaVerifier: Action<{
    containerOrId?: string | HTMLElement;
}>;
export declare const setFbUser: Action<{
    user: User;
}>;
declare const _default: {};
export default _default;
//# sourceMappingURL=actions.d.ts.map