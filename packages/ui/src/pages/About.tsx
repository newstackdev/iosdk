import { useEffect } from "react";
import { useActions } from "../overmind";

export const About = () => {
    const actions = useActions();

    useEffect(() => {
        actions.routing.setBreadcrumbs([{ text: "About" }])
    }, []);

    return <>
        <h3>About</h3>
        This is newweb
    </>
}
