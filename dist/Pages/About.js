import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useActions } from "../overmind";
export const About = () => {
    const actions = useActions();
    useEffect(() => {
        actions.routing.setBreadcrumbs([{ text: "About" }]);
    }, []);
    return _jsxs(_Fragment, { children: [_jsx("h3", { children: "About" }), "This is newweb"] });
};
//# sourceMappingURL=About.js.map