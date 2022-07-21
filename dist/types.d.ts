import { Api } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { Context } from "./overmind/overmind";
import React from "react";
export declare class CreatorApi extends Api<{
    token: string;
}> {
}
export declare type NLView<T = {}> = React.FunctionComponent<React.PropsWithChildren<T>>;
export declare type GenericComponent = NLView<any> | React.FC<any>;
export declare type IOView<T = {}> = NLView<T>;
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
    handleCallBack?: (value: any) => any;
    setIsErrorSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
    isErrorSubmit?: boolean;
};
export declare type Timer = ReturnType<typeof setInterval>;
export declare type EventHandler = (e?: KeyboardEvent | MouseEvent) => void;
export declare type Callback<T = any> = (e?: T) => void;
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
