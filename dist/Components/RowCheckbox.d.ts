/// <reference types="react" />
import { Callback } from "../types";
export declare const RowCheckbox: ({ children, onChange, disabled, title, }: {
    disabled?: boolean | undefined;
    title?: string | undefined;
    children: string | React.FC | JSX.Element;
    onChange?: Callback | undefined;
}) => JSX.Element;
