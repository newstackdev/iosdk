import { Action } from "../../types";
declare const _default: {
    actions: {
        showNotification: Action<{
            message: string;
            duration?: number | undefined;
        }, void>;
        setLayout: Action<{
            headerShown: boolean;
        }, void>;
    };
    effects: {
        notification: import("antd/lib/notification").NotificationApi;
        message: import("antd/lib/message").MessageApi;
    };
    state: {
        layout: {
            headerShown: boolean;
        };
    };
};
export default _default;
