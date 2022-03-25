import { UserCreateRequest } from "@newlife/newlife-creator-client-api";
import { Action } from "../../../../types";
import { WizardInput } from "./wizardStateMachine";
export declare const onInitializeOvermind: Action<any>;
export declare const updateForm: Action<Partial<UserCreateRequest>>;
export declare const startLegacyImport: Action;
export declare const stopLegacyImport: Action<{
    noRedirect?: boolean;
} | undefined>;
export declare const wizardStepPrev: Action;
export declare const _wizardReact: Action<WizardInput>;
export declare const wizardStepNext: Action;
export declare const preregisterCreate: Action<{
    noRouting?: boolean;
    user?: UserCreateRequest;
}>;
export declare const create: Action<{
    noRouting?: boolean;
    user: UserCreateRequest;
}>;
export declare const checkAvailability: Action<{
    username: string;
}>;
