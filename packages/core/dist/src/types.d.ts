import { Api } from "@newlife/newlife-creator-client-api";
import React from "react";
import { Context } from "@newcoin-foundation/state";
import { PartialDeep } from "type-fest";
import { config } from "./config";
export declare class CreatorApi extends Api<{
    token: string;
}> {
}
export declare type NLView<T = {}> = React.FC<React.PropsWithChildren<T>>;
export declare type GenericComponent = NLView<any> | React.FC<any>;
export declare type Action<T = undefined, R = void> = (context: Context, value: T) => R | Promise<R>;
export interface Link {
    url?: string;
    text: string;
}
export declare type EmbeddableControlNextCommand = (args?: {
    command: () => void;
    text: string;
}) => void;
export declare type EmbeddableControl = {
    embedded?: boolean;
    setNext?: EmbeddableControlNextCommand;
    setIsErrorSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare type Timer = ReturnType<typeof setInterval>;
export declare type EventHandler = (e?: KeyboardEvent | MouseEvent) => void;
export declare type Callback = (e?: any) => void;
export declare type ActiveKey = "0" | "1" | "2" | "3";
export declare type FirebaseConfig = {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
};
export declare type Configuration<T = {}> = typeof config & T;
export declare type PartialConfiguration<T = {}> = PartialDeep<Configuration<T>>;
//# sourceMappingURL=types.d.ts.map