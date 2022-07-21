import { useActions } from "../overmind";
import { useEffect } from "react";
export const useSetTitle = (title) => {
    const actions = useActions();
    useEffect(() => {
        actions.routing.setTitle(title);
    }, [title]);
};
export default useSetTitle;
//# sourceMappingURL=useSetTitle.js.map