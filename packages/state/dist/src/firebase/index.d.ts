import * as actions from "./actions";
declare const _default: {
    actions: typeof actions;
    effects: {
        initialize(firebaseConfig: import("@firebase/app").FirebaseOptions): import("@firebase/auth").Auth;
        initRecaptchaVerifier(containerOrId?: string | HTMLElement): void;
        clearRecaptchaVerifier: () => void;
        requestPhoneAuthCode(v: {
            phone: string;
        }): Promise<import("@firebase/auth").ConfirmationResult>;
        requestEmailAuthCode(v: {
            email: string;
        }): Promise<void>;
        signInWithEmailLink(email: string, emailLink: string): Promise<void>;
        submitPhonVerificationCode(v: {
            phoneVerificationCode: string;
        }): Promise<import("@firebase/auth").UserCredential>;
        logout(): Promise<void>;
    };
    state: {
        token: string;
        user: import("@firebase/auth").User;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map