/// <reference types="react" />
import { UserReadPrivateResponse, UserReadPublicResponse } from "@newlife/newlife-creator-client-api";
import { Callback, NLView } from "../types";
import { STAKE_STEPS_TYPE } from "../overmind/flows/stake/state";
export declare const UserWidgetVertical: NLView<{
    user?: UserReadPublicResponse;
}>;
/**
 * User stake widget.
 * @param
 * @returns
 */
export declare const UserStake: NLView<{
    user?: UserReadPrivateResponse;
    mode?: STAKE_STEPS_TYPE;
    value?: number;
    minValue?: number;
    hideButton?: boolean;
    hideSelect?: boolean;
    buttonText?: string;
    closeOnDone?: boolean;
    onDone?: Callback;
    onCancel?: Callback;
}>;
export declare const UserPowerup: NLView<{
    user?: UserReadPrivateResponse;
}>;
export declare const UserWidgetTopFixed: NLView<{
    user?: UserReadPrivateResponse;
}>;
export declare const UserWidgetHeading: NLView<{
    user?: UserReadPrivateResponse;
    setActiveKey: React.Dispatch<React.SetStateAction<string>>;
    setShowSocials?: React.Dispatch<React.SetStateAction<boolean>>;
}>;
export declare const UserSocialInfo: NLView<{
    user?: UserReadPrivateResponse;
}>;
export declare const UsersList: NLView<{
    users?: UserReadPrivateResponse[];
    powerUp?: boolean;
    title?: string;
    layout?: "horizontal" | "vertical";
}>;
export declare const UsersHorizontalScroller: NLView<{
    users?: UserReadPrivateResponse[];
    powerUp?: boolean;
    title?: string;
    layout?: "horizontal" | "vertical";
}>;
export declare const UsersGrid: NLView<{
    users?: UserReadPrivateResponse[];
    powerUp?: boolean;
    title?: string;
    layout?: "horizontal" | "vertical";
}>;
export declare const UserSocialInfoRow: NLView<{
    user?: UserReadPrivateResponse;
}>;
export declare const PoolInfoDataRow: NLView<{
    pool?: {
        code: string;
    };
}>;
export declare const UserNewcoinPoolsParticipation: NLView<{
    user?: UserReadPrivateResponse;
    onStakeStart?: Callback;
}>;
export declare const UserNewcoinInfo: NLView<{
    user?: UserReadPrivateResponse;
}>;
export declare const UserPrivateInfo: NLView<{
    user?: UserReadPrivateResponse;
}>;
