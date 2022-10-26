import { useAppState } from "../overmind/overmind";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { IOView } from "@newstackdev/iosdk/dist/types";

export const MainMenu: IOView = () => {
    const state = useAppState();

    const loggedIn = state.api.auth.user?.username;

    return <Menu>
        <Menu.Item>
            <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/explore">Explore</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/counter">Counter</Link>
        </Menu.Item>

        {loggedIn && <Menu.Item
            style={{
                display: "flex",
                flex: 1,
                alignItems: "end",
            }}
            className="text-modest">
            <Link to="/signout">Sign Out</Link>
        </Menu.Item>}
    </Menu>
}
