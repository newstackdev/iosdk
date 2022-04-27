import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { CreatorApi } from "../../types";
declare const _default: {
    initialize(baseUrl: any): CreatorApi;
    updateToken(token: string): void;
    authorize(): Promise<UserReadPrivateResponse>;
};
export default _default;
