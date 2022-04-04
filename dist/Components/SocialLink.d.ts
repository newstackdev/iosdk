import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { NLView } from "../types";
export declare const SocialLink: NLView<{
    platform: string;
    user: UserReadPrivateResponse;
}>;
