import { useAppState } from "../overmind/overmind";
// import { AUTH_FLOW_STATUS } from "@newcoin-foundation/iosdk/dist/overmind/auth/state"; // refer to AUTH_FLOW_STATUS for more details

export const Home = () => {
    const state = useAppState();
    return <>
        {state.api?.auth?.user?.id ?
            <>
                Authenticated as {state.api?.auth?.user?.username || state.firebase.user?.phoneNumber}<br />

            </>
            : "please sign in"}

    </>;
};