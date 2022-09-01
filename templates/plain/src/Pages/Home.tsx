import app from "src/overmind/app";
import { useAppState } from "../overmind/overmind";
// import { AUTH_FLOW_STATUS } from "@newstackdev/iosdk/dist/overmind/auth/state"; // refer to AUTH_FLOW_STATUS for more details

export const Home = () => {
    const state = useAppState();
    return <>
        {state.api?.auth?.user?.id ?
            <>
                <h1>Hello, {state.api.auth.user.username}</h1>
                Welcome to {state.config.settings.app.name}.<br />We hope you enjoy this service.
            </>
            : "please sign in"}
        
    </>;
};