export const state = {
    settings: {
        firebaseConfig: {},
        newlifeBaseUrl: "",
        newlifeMediaBucket: "",
        newlifeWebsocketsServer: "",
    },
    components: {
        layout: {
            Layout: null,
            TopMenu: null,
        },
        auth: {
            AuthWidget: null,
        },
        icons: {
            Logo: null,
        },
    },
};
// indicators: {
//     _inProgressCounter: 0,
//     inProgress: derived<{ _inProgressCounter: number }, {}, boolean>((state) => state._inProgressCounter > 0)
// },
// flows
//# sourceMappingURL=state.js.map