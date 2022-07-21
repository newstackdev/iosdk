import { ReactElement } from "react";
declare type LayedOutContent = {
    header?: ReactElement | string | undefined;
    info?: ReactElement;
    isWorking?: boolean;
    isDomainPresale?: boolean;
    customClass?: string;
    isPost?: boolean;
    isMood?: boolean;
    position?: "top";
};
export declare const ContentLayout: import("react").FunctionComponent<import("react").PropsWithChildren<LayedOutContent>>;
export {};
