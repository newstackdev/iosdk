import { Auth, ConfirmationResult } from "firebase/auth";
import { FirebaseOptions } from "firebase/app";
declare const _default: {
    initialize(firebaseConfig: FirebaseOptions): Auth;
    initRecaptchaVerifier(containerOrId?: string | HTMLElement): void;
    clearRecaptchaVerifier: () => void;
    requestPhoneAuthCode(v: {
        phone: string;
    }): Promise<ConfirmationResult>;
    requestEmailAuthCode(v: {
        email: string;
    }): Promise<void>;
    signInWithEmailLink(email: string, emailLink: string): Promise<void>;
    submitPhonVerificationCode(v: {
        phoneVerificationCode: string;
    }): Promise<import("@firebase/auth").UserCredential>;
    logout(): Promise<void>;
};
export default _default;
//# sourceMappingURL=effects.d.ts.map