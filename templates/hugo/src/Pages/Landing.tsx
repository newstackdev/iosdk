import app from "src/overmind/app";
import Logo from "../Icons/LogoIcon";
import { useAppState } from "../overmind/overmind";
import { Link } from "react-router-dom";
// import { AUTH_ FLOW_STATUS } from "@newstackdev/iosdk/dist/overmind/auth/state"; // refer to AUTH_FLOW_STATUS for more details

export const Landing = () => {
    const state = useAppState();
    const loggedIn = state.api.auth.user?.username;

    return <div className="text-center">
        <div className="wobble"><Logo /></div>
        <div className="vertical-space" />
        <h2>Welcome to {state.config.settings.app.name}.</h2>
        <div className="vertical-space" />
        <div className="vertical-space" />
        {loggedIn ? <></> : <Link to="/SignIn">Sign in</Link>}
        <p>This is a demo landing page</p>
    </div>;
};