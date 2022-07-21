import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useActions } from "../overmind";
import { useEffect } from "react";
export const About = () => {
    const actions = useActions();
    useEffect(() => {
        actions.routing.setBreadcrumbs([{ text: "About" }]);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("h3", { children: "About" }), "This is newweb"] }));
};
//# sourceMappingURL=About.js.map