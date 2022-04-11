import { PartialDeep } from "type-fest";
import { FirebaseConfig, GenericComponent } from "./types";
export declare const APP_DOMAIN = "life.nco";
export declare const firebaseConfig: FirebaseConfig;
export declare const newlifeBaseUrl: string;
export declare const newlifeMediaBucket: any;
export declare const newlifeWebsocketsServer: any;
export declare const config: {
    settings: {
        app: {
            newgraph: {
                apiKey: string;
            };
            newcoin: {
                domain: string;
                poolSymbol: string;
            };
        };
        firebaseConfig: FirebaseConfig;
        newlife: {
            baseUrl: string;
            mediaBucket: any;
            websocketsServer: any;
        };
        routing: {
            routeAccessLevels: Record<string, (st: import("./overmind/auth/state").AUTH_FLOW_STATUS_TYPE) => boolean>;
        };
    };
    routes: {
        useDefaultRoutes: boolean;
        overrides: {};
        noBackButton: string[];
    };
    components: {
        layout: {
            Layout: GenericComponent;
            TopMenu: GenericComponent;
        };
        auth: {
            AuthWidget: GenericComponent;
        };
        icons: {
            Logo: GenericComponent;
        };
    };
};
export declare type Configuration<T = {}> = typeof config & T;
export declare type PartialConfiguration<T = {}> = PartialDeep<Configuration<T>>;
