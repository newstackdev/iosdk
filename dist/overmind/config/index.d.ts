/// <reference types="react" />
declare const _default: {
    state: {
        settings: {
            firebaseConfig: import("../../types").FirebaseConfig;
            newlifeBaseUrl: string;
            newlifeMediaBucket: string;
            newlifeWebsocketsServer: string;
        };
        components: {
            layout: {
                Layout: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null;
                TopMenu: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null;
            };
            auth: {
                AuthWidget: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null;
            };
            icons: {
                Logo: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null;
            };
        };
    };
};
export default _default;
