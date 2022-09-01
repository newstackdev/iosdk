import { Avatar, Button, Col, Menu, Row } from "antd";
import { ContentImage } from "../Components/Image";
import { Link } from "react-router-dom";
import { LogOut } from "../Components/Icons/LogOut";
import { NLView } from "../types";
import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { useActions, useAppState } from "../overmind";
import { useCachedUser } from "../hooks/useCached";

export const AuthWidget: NLView = () => {
  const state = useAppState();
  const actions = useActions();
  const isAuthorized = state.api.auth.authorized;

  const user: UserReadPrivateResponse | null = state.api.auth.user;
  const u = useCachedUser({ id: user?.id }, true);

  const profileLink = () =>
    state.auth.authenticated ? (
      !state.api.auth.authorized ? (
        <Button className="secondary-button" onClick={() => actions.auth.logout()}>
          <span className="paragraph-2b">Sign out</span>
        </Button>
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
        </Row>
      )
    ) : (
      <div className="navbar-signin-wrapper">
        <Button
          onClick={() => {
            actions.routing.historyPush({ location: "/auth" });
            actions.flows.user.create.stopMetamaskFlow();
          }}
          className="secondary-button"
        >
          <span className="paragraph-2b">Sign In</span>
        </Button>
        <Button className="secondary-button" onClick={() => actions.routing.historyPush({ location: "/signup/metamask" })}>
          <span className="paragraph-2b">Metamask</span>
        </Button>
      </div>
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
