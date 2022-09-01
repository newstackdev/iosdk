import { Api } from "@newstackdev/iosdk-newgraph-client-js";
import { Context } from "./overmind/overmind";
import React from "react";

export class CreatorApi extends Api<{ token: string }> {}

export type NLView<T = {}> = React.FunctionComponent<React.PropsWithChildren<T>>; //React.FC<React.PropsWithChildren<T>>;
export type GenericComponent = NLView<any> | React.FC<any>;
export type IOView<T = {}> = NLView<T>;

type ValueOf<T> = T[keyof T];

export type Action<T = undefined, R = void> = (context: Context, value: T) => R | Promise<R>;

export interface Link {
  url?: string;
  text: string;
}

export type EmbeddableControlNextCommand = (args?: { command: () => void; text: string }) => void;
export type EmbeddableControl = {
  embedded?: boolean;
  setNext?: EmbeddableControlNextCommand;
  handleCallBack?: (value: any) => any;
  setIsErrorSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
  isErrorSubmit?: boolean;
};

export type Timer = ReturnType<typeof setInterval>;
export type EventHandler = (e?: KeyboardEvent | MouseEvent) => void;
export type Callback<T = any> = (e?: T) => void;

export type ActiveKey = "0" | "1" | "2" | "3";

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

// export interface UserInfo {
// 	status?: string;
// 	token?: string;
// 	user?: UserReadPrivateResponse;
// 	fbUser?: UserCredential;
// 	loading?: boolean;
// 	signOut: () => void;
// }
