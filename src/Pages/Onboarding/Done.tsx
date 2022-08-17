import { IOView } from "../../types";
import { useActions, useAppState } from "../../overmind";
import { useEffect } from "react";

export const Done: IOView = () => {
  const state = useAppState();
  const actions = useActions();

  useEffect(() => {
    if (state.api.auth.authorized) {
      sessionStorage.removeItem("cachedOnboarding");
      actions.routing.historyPush({ location: "/explore" });
    }
  }, [state.api.auth.authorized]);

  return <></>;
};
