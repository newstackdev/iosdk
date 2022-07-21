import { NLView } from "../types";
import { UserReadPrivateResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
export declare const SocialLink: NLView<{
    platform: string;
    user: UserReadPrivateResponse;
    disableLink?: boolean;
}>;
