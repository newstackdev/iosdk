import { Avatar, Button, Col, Menu, Row } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";

import { Link } from "react-router-dom";

import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { LogOut } from "../Components/Icons/LogOut";
import { NLView } from "@newcoin-foundation/core";
import { useCachedUser } from "@newcoin-foundation/hooks";
import { useAppState, useActions } from "@newcoin-foundation/state";
import { MediaComponent } from "src/Components/MediaComponents";

export const AuthWidget: NLView = (props) => {
  const state = useAppState();
  const actions = useActions();

  const user: UserReadPrivateResponse | null = state.api.auth.user;
  const u = useCachedUser({ id: user?.id }, true);

  const profileLink = (title = state.api.auth.userDisplayHandler) =>
    state.auth.authenticated ? (
      !state.api.auth.authorized ? (
        <Avatar
          src={<MediaComponent {...u} />}
          className="avatar-image-header"
        />
      ) : (
        <Row
          style={{
            justifyContent: "space-between",
            background: "transparent",
          }}
        >
          <Col>
            <Link to={`/user/${state.api.auth.user?.username}`}>
              <Avatar
                src={<MediaComponent {...u} />}
                className="avatar-image-header"
              />
              <span className="paragraph-1r navbar-mobile-text">Profile</span>
            </Link>
          </Col>
          <Col className="mobile-menu-show">
            {/* <span
							hidden={!state.auth.authenticated}
							onClick={() => actions.auth.logout()}
							style={{ marginRight: "10px" }}
						>
							metamask
						</span> */}
            <span
              hidden={!state.auth.authenticated}
              onClick={() => actions.auth.logout()}
            >
              <LogOut />
            </span>
          </Col>
        </Row>
      )
    ) : (
      <Button
        onClick={() => actions.routing.historyPush({ location: "/auth" })}
        hidden={state.routing.location === "/auth"}
        style={{
          borderWidth: "2px",
          fontWeight: "bold",
          height: "33px",
          lineHeight: "0",
          width: "140px",
        }}
      >
        Sign In
      </Button>
    );

  return (
    <>
      <SubMenu
        key="sub1"
        className="sub-menu-show"
        title={profileLink()}
        style={{
          opacity: 1,
          position: "relative",
          pointerEvents: "all",
          overflowY: "inherit",
        }}
      >
        {state.auth.authenticated ? (
          <>
            <Menu.Item hidden={state.api.auth.authorized} key="sub3">
              {state.api.auth.authorized ? (
                ""
              ) : (
                <>{state.api.auth.userDisplayHandler}</>
              )}
            </Menu.Item>
            {!/^(www\.)?newlife\.io$/.test(window.location.host) ? (
              <Menu.Item
                hidden={!state.auth.authenticated}
                key="sub31"
                // onClick={() => actions.evm.connect()}
                className="logout"
              >
                metamask
              </Menu.Item>
            ) : (
              <></>
            )}
            <Menu.Item
              key="sub4"
              onClick={() => actions.auth.logout()}
              className="logout"
            >
              Sign out&nbsp;
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
      <Menu.Item
        key="pl"
        className="mobile-menu-show"
        style={{ width: "100%" }}
      >
        {profileLink()}
      </Menu.Item>
    </>
  );
};
