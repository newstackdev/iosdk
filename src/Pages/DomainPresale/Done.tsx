import { useActions, useAppState } from "../../overmind";

export const Done = () => {
    const state = useAppState();
    const actions = useActions();
    if(state.api.auth.authorized)
        actions.routing.historyPush({ location : "/explore" })
    return <></>;
}