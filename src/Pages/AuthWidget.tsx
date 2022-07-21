import { Avatar, Button, Col, Menu, Row } from "antd";
import { ContentImage } from "../Components/Image";
import { Link } from "react-router-dom";
import { LogOut } from "../Components/Icons/LogOut";
import { NLView } from "../types";
import { UserReadPrivateResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { useActions, useAppState } from "../overmind";
import { useCachedUser } from "../hooks/useCached";
import SubMenu from "antd/lib/menu/SubMenu";

export const AuthWidget: NLView = () => {
  const state = useAppState();
  const actions = useActions();

  const user: UserReadPrivateResponse | null = state.api.auth.user;
  const u = useCachedUser({ id: user?.id }, true);

  const profileLink = (title = state.api.auth.userDisplayHandler) =>
    state.auth.authenticated ? (
      !state.api.auth.authorized ? (
        <Avatar src={<ContentImage {...u} />} className="avatar-image-header" />
      ) : (
        <Row
          style={{
            justifyContent: "space-between",
            background: "transparent",
            padding: 0,
            flex: 1,
          }}
        >
          <Col>
            <Link to={`/user/${state.api.auth.user?.username}`}>
              <Avatar src={<ContentImage {...u} />} className="avatar-image-header" />
              <span className="paragraph-1r navbar-mobile-text">Profile</span>
            </Link>
          </Col>
          <Col className="mobile-menu-show text-right">
            {/* <span
							hidden={!state.auth.authenticated}
							onClick={() => actions.auth.logout()}
							style={{ marginRight: "10px" }}
						>
							metamask
						</span> */}
            <span hidden={!state.auth.authenticated} onClick={() => actions.auth.logout()}>
              <LogOut />
            </span>
          </Col>
        </Row>
      )
    ) : (
      <Button
        onClick={() => actions.routing.historyPush({ location: "/auth" })}
        hidden={state.routing.location === "/auth"}
        className="secondary-button"
      >
        <span className="paragraph-2b">Sign In</span>
      </Button>
    );

  return (
    <Menu.Item style={{ padding: 0 }} className="app-full-width-mobile">
      <SubMenu
        key="sub1"
        className="sub-menu-show"
        title={profileLink()}
        style={{
          opacity: 1,
          position: "relative",
          pointerEvents: "all",
          overflowY: "inherit",
          padding: 0,
        }}
      >
        {state.auth.authenticated ? (
          <>
            <Menu.Item hidden={state.api.auth.authorized} key="sub3" style={{ padding: 0 }}>
              {state.api.auth.authorized ? "" : <>{state.api.auth.userDisplayHandler}</>}
            </Menu.Item>
            {!/^(www\.)?newlife\.io$/.test(window.location.host) ? (
              <Menu.Item
                hidden={!state.auth.authenticated}
                key="sub31"
                style={{ padding: 0 }}
                // onClick={() => actions.evm.connect()}
                className="submenu-text submenu-text-disabled"
              >
                Metamask
              </Menu.Item>
            ) : (
              <></>
            )}
            <Menu.Item key="sub4" onClick={() => actions.auth.logout()} className="submenu-text" style={{ padding: 0 }}>
              <span className="u-margin-right-small">Sign out</span>
              <LogOut />
            </Menu.Item>
            {/* <Menu.Item hidden={!state.auth.status} key="sub3">
							{profileLink("priv

							ate profile", true)}
						</Menu.Item> */}
          </>
        ) : (
          <></>
        )}
      </SubMenu>
      <Menu.Item key="pl" className="mobile-menu-show" style={{ width: "100%", order: 1, padding: 0 }}>
        {profileLink()}
      </Menu.Item>
    </Menu.Item>
  );
};
