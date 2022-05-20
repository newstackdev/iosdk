import { PartialDeep } from "type-fest";
import { FirebaseConfig, GenericComponent } from "./types";
export declare const APP_DOMAIN = "life.nco";
export declare const firebaseConfig: FirebaseConfig;
export declare const newlifeBaseUrl: string;
export declare const newlifeMediaBucket: any;
export declare const newlifeWebsocketsServer: any;
export declare const stripeKey: any;
export declare const config: {
    env: {
        stage: string;
    };
    settings: {
        newcoin: {
            daoId: string;
            daoDomain: string;
            poolId: string;
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
        stripe: {
            publicKey: any;
        };
    };
    routes: {
        useDefaultRoutes: boolean;
        overrides: {};
        noBackButton: string[];
        defaultRoute: {
            condition: (state: any) => any;
            defaultLocation: (_state: any) => string;
        };
    };
    components: {
        layout: {
            Layout: GenericComponent;
            TopMenu: GenericComponent;
            Header: GenericComponent;
        };
        auth: {
            AuthWidget: GenericComponent;
        };
        icons: {
            Logo: GenericComponent;
        };
    };
    featureFlags: {
        onboarding: {
            premiumDomains: boolean;
        };
    };
};
export declare type Configuration<T = {}> = typeof config & T;
export declare type PartialConfiguration<T = {}> = PartialDeep<Configuration<T>>;
