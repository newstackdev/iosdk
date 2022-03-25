import { UserReadPublicResponse } from "@newlife/newlife-creator-client-api";
import { CreatorApi } from "../../../types";
export declare const Websocket: () => {
    socket: WebSocket | null;
    toggle: (url: string) => void;
};
export declare const Api: {
    initialize(): CreatorApi;
    updateToken(token: string): void;
    authorize(): Promise<UserReadPublicResponse>;
};
