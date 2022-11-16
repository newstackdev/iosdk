import { useActions } from "../overmind";
import { useEffect } from "react";

export const useSetTitle = (title?: string) => {
  const actions = useActions();
  useEffect(() => {
    actions.routing.setTitle(title);
  }, [title]);
};

export default useSetTitle;
