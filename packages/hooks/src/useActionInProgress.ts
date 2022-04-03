import { useEffect, useState } from "react";
import { useActions, useAppState } from "@newcoin-foundation/state";
import { debounce } from "lodash";

export const useActionInProgress = (
  overmindActionName: string,
  debounceMs: number = 100
) => {
  const state = useAppState();
  const [inProgress, setInProgress] = useState<boolean>(
    state.indicators.specific[overmindActionName]
  );
  useEffect(() => {
    debounce(
      () => setInProgress(state.indicators.specific[overmindActionName]),
      debounceMs
    );
  }, [state.indicators.specific[overmindActionName]]);

  return inProgress;
};
