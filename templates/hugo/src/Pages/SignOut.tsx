import { IOView } from "@newstackdev/iosdk/dist/types";
import { useEffect } from "react";
import { useActions } from "../overmind/overmind";

export const SignOut: IOView = () => {
    const actions = useActions();

    useEffect(() => {
        setTimeout(() => {
            actions.app.signOut();
        }, 1000);
    }, []);

    return <h1 className="text-center">See you later!</h1>
}