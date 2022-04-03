import { UserCreateRequest, UserInviteRequest, UserReadPublicResponse, UserUpdateRequest } from "@newlife/newlife-creator-client-api";
import { Action } from "../../state";
export declare const cache: Action<{
    user: UserReadPublicResponse;
}>;
export declare const read: Action<{
    id?: string;
    username?: string;
}, UserReadPublicResponse>;
export declare const create: Action<{
    noRouting?: boolean;
    user: UserCreateRequest;
    preregisterCreate?: boolean;
}>;
export declare const update: Action<{
    user: UserUpdateRequest;
    file?: any;
}>;
export declare const getMoods: Action<{
    id?: string;
}>;
export declare const stake: Action<{
    user: UserReadPublicResponse;
    amount: string;
}>;
export declare const invite: Action<{
    userInvite: UserInviteRequest;
}>;
export declare const powerup: Action<{
    user: UserReadPublicResponse;
    amount: number;
}>;
export declare const getPowerups: Action<{
    user: UserReadPublicResponse;
}>;
export declare const getCurrent: Action<undefined>;
//# sourceMappingURL=user.d.ts.map