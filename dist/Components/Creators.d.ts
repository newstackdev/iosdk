/// <reference types="react" />
import { NLView } from "../types";
import { UserInvitationReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
declare type ICreators = {
    title?: string;
    maxItems?: number;
    users: UserInvitationReadPublicResponse[];
    buttonType?: string;
    setAddedUsers?: React.Dispatch<React.SetStateAction<string[]>>;
    addedUsers?: string[];
    to?: string;
};
export declare const CreatorWidget: NLView<{
    creator: UserInvitationReadPublicResponse;
    avatarClassName?: string;
    buttonType?: string;
    setAddedUsers: React.Dispatch<any>;
    addedUsers: any;
    stakeMode?: boolean;
}>;
export declare const CreatorsList: NLView<ICreators>;
export declare const Creators: NLView<ICreators>;
export declare const TopCreators: NLView<ICreators>;
export default Creators;
