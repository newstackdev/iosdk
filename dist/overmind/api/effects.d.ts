import { CreatorApi } from "../../types";
import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
declare const _default: {
    initialize(baseUrl: string): CreatorApi;
    updateToken(token: string): void;
    authorize(): Promise<UserReadPrivateResponse>;
};
export default _default;
