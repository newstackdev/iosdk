import { Action } from "../../types";
declare const _default: {
    actions: {
        showNotification: Action<{
            message: string;
            duration?: number | undefined;
        }, void>;
    };
    effects: {
        notification: import("antd/lib/notification").NotificationApi;
        message: import("antd/lib/message").MessageApi;
    };
};
export default _default;
