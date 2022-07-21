import { debounce } from "lodash";
import { useAppState } from "../overmind";
import { useEffect, useState } from "react";
export const useActionInProgress = (overmindActionName, debounceMs = 100) => {
    const state = useAppState();
    const [inProgress, setInProgress] = useState(state.indicators.specific[overmindActionName]);
    useEffect(() => {
        debounce(() => setInProgress(state.indicators.specific[overmindActionName]), debounceMs);
    }, [state.indicators.specific[overmindActionName]]);
    return inProgress;
};
//# sourceMappingURL=useActionInProgress.js.map