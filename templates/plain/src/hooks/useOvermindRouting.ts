import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useActions } from "../overmind/overmind";

export const useOvermindRouting = () => {
    const history = useHistory();
    const actions = useActions();

    useEffect(() => {
        const cancel = history.listen((location) =>
            actions.routing.onRouteChange({ location: location })
        );
        actions.routing.onRouteChange({ location: window.location });
        actions.routing.setHistory({ history });

        return cancel;
    }, []);
};
