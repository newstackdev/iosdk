import { Callback, NLView } from "../types";
export declare const ProgressButton: NLView<{
    actionName: string;
    type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined;
    htmlType?: "button" | "submit" | "reset" | undefined;
    className?: string;
    onClick?: Callback;
    disabled?: boolean;
    isErrorSubmit?: boolean;
    progressText?: string;
}>;
