declare const _default: {
    state: import("overmind/lib/internalTypes").SubType<{
        create: import("./onboarding/state").IOnboarding;
    }, object>;
    effects: import("overmind/lib/internalTypes").SubType<{
        create: {};
    }, object>;
    actions: import("overmind/lib/internalTypes").SubType<{
        create: typeof import("./onboarding/actions");
    }, object>;
};
export default _default;
