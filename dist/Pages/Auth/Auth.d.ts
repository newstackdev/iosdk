/// <reference types="react" />
import { EmbeddableControl } from "../../types";
export declare const layout: {
    labelCol: {
        span: number;
    };
    wrapperCol: {
        span: number;
    };
};
export declare const Auth: ({ embedded, setNext, handleCallBack, setIsErrorSubmit, isErrorSubmit, }: React.PropsWithChildren<EmbeddableControl>) => JSX.Element;
