import { useEffect } from "react";
import { useActions } from "../overmind";
export const useSetTitle = (title) => {
    const actions = useActions();
    useEffect(() => {
        actions.routing.setTitle(title);
    }, [title]);
};
export default useSetTitle;
//# sourceMappingURL=useSetTitle.js.map