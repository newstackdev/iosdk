/// <reference types="react" />
import { Callback, IOView, NLView } from "../types";
import { STAKE_STEPS_TYPE } from "../overmind/flows/stake/state";
import { UserFlowRoutes } from "../Pages/User/User";
import { UserReadPrivateResponse, UserReadPublicResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { UserSocials } from "../Pages/User/interfaces/IUser";
export declare const SOCIAL_MEDIA: UserSocials[];
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
    setActiveKey?: React.Dispatch<React.SetStateAction<UserFlowRoutes>>;
    setShowSocials?: React.Dispatch<React.SetStateAction<boolean>>;
    activeKey?: UserFlowRoutes;
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
    verifyIconLight?: boolean;
}>;
export declare const UserNewcoinPoolsParticipation: IOView<{
    user?: UserReadPrivateResponse;
    onStakeStart?: Callback;
    isWalletUsage?: boolean;
}>;
export declare const UserNewcoinInfo: NLView<{
    user?: UserReadPrivateResponse;
}>;
export declare const UserPrivateInfo: NLView<{
    user?: UserReadPrivateResponse;
}>;
