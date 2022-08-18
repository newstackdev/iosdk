import { useAppState } from "../overmind/overmind";
// import { AUTH_FLOW_STATUS } from "@newcoin-foundation/iosdk/dist/overmind/auth/state"; // refer to AUTH_FLOW_STATUS for more details

export const Home = () => {
    const state = useAppState();
    return <>
        {state.api?.auth?.user?.id ?
            <>
                Welcome to {state.config.settings.app.name}
            </>
            : "please sign in"}

    </>;
};