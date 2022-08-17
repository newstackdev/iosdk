import { Avatar, Button, Col, Dropdown, Menu, Row } from "antd";
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
  const isAuthorized = state.api.auth.authorized;

  const user: UserReadPrivateResponse | null = state.api.auth.user;
  const u = useCachedUser({ id: user?.id }, true);

  const profileLink = (mobile?: boolean) =>
    state.auth.authenticated ? (
      !state.api.auth.authorized ? (
        mobile ? (
          <Button key="sub4" onClick={() => actions.auth.logout()} style={{ padding: 0 }}>
            <Row>
              <span className="u-margin-right-small">Sign out</span>
              <LogOut />
            </Row>
          </Button>
        ) : (
          <Dropdown
            overlay={
              <Menu.Item key="sub4" onClick={() => actions.auth.logout()} style={{ padding: 0 }}>
                <Row>
                  <span className="u-margin-right-small">Sign out</span>
                  <LogOut />
                </Row>
              </Menu.Item>
            }
          >
            <Avatar src={<ContentImage {...u} />} className="avatar-image-header" />
          </Dropdown>
        )
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
              <Avatar src={<ContentImage {...u} menuAvatar />} className="avatar-image-header" />
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
    <>
      <Menu.Item className="app-full-width-mobile">
        <Menu.Item className="sub-menu-show">{profileLink()}</Menu.Item>

        <Menu.Item key="pl" className="mobile-menu-show" style={{ width: "100%", order: 1, padding: 0 }}>
          {profileLink()}
        </Menu.Item>
      </Menu.Item>
      {isAuthorized && (
        <Menu.Item>
          <Button onClick={() => actions.routing.historyPush({ location: "/user/invite" })} className="stroke-btn-green">
            <p className="paragraph-2b" style={{ lineHeight: 0, margin: 0, padding: 0 }}>
              Invite a friend
            </p>
          </Button>
        </Menu.Item>
      )}
    </>
  );
};
