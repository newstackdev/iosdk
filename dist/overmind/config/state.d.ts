import React from "react";
import { FirebaseConfig } from "../../types";
declare type OptionalElement = React.ReactElement | null;
export declare const state: {
    settings: {
        firebaseConfig: FirebaseConfig;
        newlifeBaseUrl: string;
        newlifeMediaBucket: string;
        newlifeWebsocketsServer: string;
    };
    components: {
        layout: {
            Layout: OptionalElement;
            TopMenu: OptionalElement;
        };
        auth: {
            AuthWidget: OptionalElement;
        };
        icons: {
            Logo: OptionalElement;
        };
    };
};
export {};
