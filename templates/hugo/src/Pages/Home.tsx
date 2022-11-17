import app from "src/overmind/app";
import { useAppState } from "../overmind/overmind";
// import { AUTH_FLOW_STATUS } from "@newstackdev/iosdk/dist/overmind/auth/state"; // refer to AUTH_FLOW_STATUS for more details

export const Home = () => {
    const state = useAppState();
    return <div className="text-center">
        {state.api?.auth?.user?.username ?
            <>
                <h2>Hello, {state.api.auth.user.username}</h2>
                <h3>Welcome to {state.config.settings.app.name}.</h3>
                <p>We hope you enjoy this service.</p>
            </>
            : "please sign in"}
        <p>This is a demo user home</p>
    </div>;
};