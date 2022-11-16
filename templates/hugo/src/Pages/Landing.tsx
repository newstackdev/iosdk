import app from "src/overmind/app";
import Logo from "../Icons/LogoIcon";
import { useAppState } from "../overmind/overmind";
import { Link } from "react-router-dom";
// import { AUTH_ FLOW_STATUS } from "@newstackdev/iosdk/dist/overmind/auth/state"; // refer to AUTH_FLOW_STATUS for more details

export const Landing = () => {
    const state = useAppState();
    return <div className="text-center">
        <div className="wobble"><Logo /></div>
        <div className="vertical-space" />
        <h2>Welcome to {state.config.settings.app.name}.</h2>
        <h1>We hope you enjoy this service.</h1>
        <div className="vertical-space" />
        <Link to="/SignIn">Sign in</Link>
    </div>;
};