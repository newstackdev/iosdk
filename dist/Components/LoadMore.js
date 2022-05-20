import { jsx as _jsx } from "react/jsx-runtime";
import { Spin } from "../Components/Spin";
import { useEffect } from "react";
import useVisibility from "../hooks/useVisibility";
export const LoadMore = ({ loadMore }) => {
    const [isVisible, currentElement] = useVisibility(200);
    useEffect(() => {
        isVisible && loadMore && loadMore();
    }, [isVisible]);
    return _jsx("div", { ref: currentElement, children: _jsx(Spin, {}) });
};
//# sourceMappingURL=LoadMore.js.map