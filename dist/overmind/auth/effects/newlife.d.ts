import { UserReadPublicResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { CreatorApi } from "../../../types";
export declare const Websocket: () => {
    socket: WebSocket | null;
    toggle: (url: string) => void;
};
export declare const Api: {
    initialize(baseUrl: string): CreatorApi;
    updateToken(token: string): void;
    authorize(): Promise<UserReadPublicResponse>;
};
