import { Header as ADHeader, Content, Footer } from "antd/lib/layout/layout";
import { Layout as AntdLayout, Button, Col, Dropdown, Menu, Row } from "antd";
import { AuthWidget } from "../Pages/AuthWidget";
import { IOView, NLView } from "../types";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useActions, useAppState } from "../overmind";
import React, { ReactElement, useEffect, useMemo, useState } from "react";

import { ActivityStream } from "../Components/ActivityStream";
import { Burger } from "../Components/Icons/Burger";
import { DAO } from "../Components/Icons/DAO";
import { LargeArrowBack } from "../Components/Icons/LargeArrowBack";
import { SearchWidget } from "../Pages/Search/SearchWidget";
import { Searchicon } from "../Components/Icons/Searchicon";
import { Spin } from "../Components/Spin";
import { ThreeDots } from "../Components/Icons/ThreeDots";
import { WalletWidget } from "../Components/Wallet";
import Explore from "../Components/Icons/Explore";
import Logo from "../Components/Icons/Logo";
import NavbarUpload from "../Components/Icons/NavbarUpload";
import Notifications from "../Components/Icons/Notifications";
import Paragraph from "antd/lib/typography/Paragraph";
import Search from "../Components/Icons/Search";

const WHITE_BORDER = "0px white solid";

const DEBUG = false;
const ifDebug = (v: string) => (DEBUG ? v : "");

const ThreeBody: NLView<{
  left?: ReactElement | string;
  mid?: ReactElement | string;
  right?: ReactElement | string;
  allBorders?: boolean;
}> = ({ left, mid, right }) => {
  const centerWidth = "min(60vw,935px)";
  const colWidth = "auto";
  const mix = {
    paddingLeft: 6,
    paddingRight: 6,
  };

  return (
    <Row justify="start">
      <Col
        style={{
          width: `${colWidth}%`,
        }}
      >
        <div style={{ ...mix }}>{left || ifDebug("left")}</div>
      </Col>
      {mid && (
        <Col
          style={{
            width: `${centerWidth}%`,
            borderLeft: WHITE_BORDER,
            borderRight: WHITE_BORDER,
          }}
        >
          {mid || ifDebug("mid")}
        </Col>
      )}
      <Col
        style={{
          width: `${mid ? colWidth : "90%"}%`,
        }}
      >
        {right || ifDebug("right")}
      </Col>
    </Row>
  );
};

export const Header: IOView = () => {
  const state = useAppState();
  if (!state.ux.layout.headerShown) return <></>;

  return (
    <ADHeader key="h" className="logo" style={{ padding: 0 }}>
      <Row justify="space-around" gutter={0}>
        <div className="header" style={{ width: "100%", padding: "0 20px" }}>
          <state.config.components.layout.TopMenu />
        </div>
      </Row>
    </ADHeader>
  );
};

export const XTopMenu = () => {
  const state = useAppState();
  const [search, setSearch] = useState<boolean>(false);
  return (
    <Menu
      mode="horizontal"
      style={{
        padding: 0,
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
      }}
    >
      <Menu.Item key="2" style={{ position: "absolute", left: 0 }}>
        <Link to={"/explore"} className="nav-item nav-item-logo-left-top">
          <div className="logo-left-top-text">Newlife.IO</div>
          <div className="logo-left-top">
            <Logo />
          </div>
        </Link>
      </Menu.Item>
      {/* <Menu.Item>
        <Link to="/search-creative" className="nav-item">
          <Search />
        </Link>
      </Menu.Item> */}
      <Menu.Item key="3" style={{ width: "50vw" }}>
        {state.api.auth.authorized ? <SearchWidget /> : ""}
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/explore" className="nav-item">
          <Explore />
          {/* <PlusCircleOutlined /> */}
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/post-create" className="nav-item">
          <NavbarUpload />
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="4">
        <Link to="/my/moods" className="nav-item">
          My moods
        </Link>
      </Menu.Item> */}

      {/* <Menu.Item key="5">
        <Link to="/mood-create" className="nav-item">
          <PlusCircleOutlined />M
        </Link>
      </Menu.Item> */}

      <Menu.Item key="6">
        <Dropdown overlayStyle={{}} overlay={<ActivityStream limit={5} />}>
          <div>
            <Link to="/my/profile">
              <Notifications />
            </Link>
          </div>
        </Dropdown>
      </Menu.Item>

      <AuthWidget />
    </Menu>
    // </div>
  );
};

export const TopMenu: NLView = () => {
  const state = useAppState();

  // const [search, setSearch] = useState<boolean>(false);
  const actions = useActions();
  const isAuthorized = state.api.auth.authorized;

  const setVisible = (v: boolean) =>
    actions.flows.userJourney.setFlag({
      flag: "walletShown",
      value: v ? "true" : "",
    });
  const walletShown = !!state.flows.userJourney.flags.walletShown;

  const routes = state.config.routes.noBackButton;
  const isAllowedPath = !routes.find((r) => state.routing.location.includes(r));

  return (
    <Menu overflowedIndicator={<Burger />} mode="horizontal">
      <Menu.Item key="tm">
        <Link to={state.api.auth.admitted ? "/explore" : "/"} className="nav-item nav-item-logo-left-top">
          <div className="logo-left-top-text">Newlife.IO</div>
          <div className="logo-left-top">
            <state.config.components.icons.Logo />
          </div>
        </Link>
        <div className="large-arrow-back-mobile">{isAllowedPath && isAuthorized && <LargeArrowBack />}</div>
      </Menu.Item>
      {/* <Menu.Itemß
        <Link to="/search-creative" className="nav-item">
          <Search />
        </Link>
      </Menu.Item> */}
      {/* <Menu.Item key="6" style={{ top: "5px", right: "-3px" }}>
				<div onClick={() => setSearch(!search)}>
					<Searchicon />
				</div>
			</Menu.Item> */}
      {/* <Menu.Item key="6" style={{ width: "41px", textAlign: "left" }}>
				<div onClick={() => setSearch(!search)}>
					<Searchicon />
				</div>
			</Menu.Item> */}
      {isAuthorized ? (
        <>
          <Menu.Item className="searchbar-properties" style={!isAuthorized ? { width: "92%" } : { width: "75%" }}>
            <SearchWidget searchUsers searchTags />

            <span className="large-arrow-back-wide-screen">{isAllowedPath && <LargeArrowBack />}</span>
          </Menu.Item>

          <Menu.Item key="4" hidden={!isAuthorized}>
            <Link to="/explore" className="nav-item">
              <Explore />
              <span className="paragraph-1r navbar-mobile-text">Explore</span>
              {/* <PlusCircleOutlined /> */}
            </Link>
          </Menu.Item>
          <Menu.Item key="5" className="make-order-zero">
            <Link to="/post-create" className="nav-item">
              <NavbarUpload />
              <span className="paragraph-1r navbar-mobile-text">Upload</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to={`/dao/${state.config.settings.newcoin.daoDomain}/proposals`} className="nav-item">
              <DAO />
              <span className="paragraph-1r navbar-mobile-text">DAO</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="8" onBlur={() => setVisible(false)}>
            <WalletWidget walletShown={walletShown} setVisible={setVisible} />
            <span className="paragraph-1r navbar-mobile-text">Wallet</span>
          </Menu.Item>
          <Menu.Item>
            <div>
              <Button onClick={() => actions.routing.historyPush({ location: "/user/invite" })} className="stroke-btn-green">
                <p className="paragraph-2b" style={{ lineHeight: 0, margin: 0 }}>
                  Invite a friend
                </p>
              </Button>
            </div>
          </Menu.Item>
          {/* <Menu.Item>
						<Link to="/notifications">
							<Notifications />
						</Link>
					</Menu.Item> */}
        </>
      ) : (
        <></>
      )}
      <AuthWidget />

      {/* <Menu.Item key="4">
				<Link to="/my/moods" className="nav-item">
				My moods
				</Link>
			</Menu.Item> */}
    </Menu>
    // </div>
  );
};

const Main: NLView = ({ children }) => {
  const state = useAppState();

  return (
    <div className="app-middle-full-height overflow-hidden">
      {state.auth.initialized && state.routing.isAllowed ? <>{children}</> : <Spin />}
    </div>
  );
};

export const Layout: NLView = ({ children }) => {
  const state = useAppState();

  return (
    <AntdLayout style={state.ux.layout.headerShown ? { minHeight: "100vh" } : { minHeight: "100vh", margin: "0px" }}>
      <div id="search-dropdown-position" />
      <Content>
        {/* !{JSON.stringify(state.api.auth.user?.status)} */}
        <Main>{children}</Main>
      </Content>
      <Footer className="footer">
        <Row gutter={124} className="u-margin-top-mega" style={{ justifyContent: "center" }}>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#272626",
                borderRadius: "50px",
                height: "100px",
                width: "200px",
                border: "white 1px solid",
              }}
            >
              {" "}
              <a href="https://forms.gle/izdem2cpHfYavU3a7" target="_blank" rel="noreferrer">
                Buy $GNCO
              </a>
            </button>
            <Col>
              <Row justify="space-around" align={"middle"} style={{ flexDirection: "column" }}>
                <p className="u-margin-bottom-xs">
                  <Link to="/terms_of_service" className="paragraph-2u">
                    Terms and Conditions
                  </Link>
                </p>
                <p className="u-margin-bottom-xs">
                  <Link to="/privacy_policy" className="paragraph-2u">
                    Privacy Policy
                  </Link>
                </p>
                <p style={{ fontSize: "14px" }}> &copy; Newlife.io All Rights Reserved</p>
              </Row>
            </Col>
          </Col>
          <Col style={{ display: "flex", flex: 1 }}>
            <Row style={{ justifyContent: "space-between", flex: 1 }}>
              <Col
                style={{
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ marginBottom: "10px" }}>Q&A</p>
                <p className="paragraph-2u">
                  <a target="_blank" href="https://newforum.community/" rel="noreferrer">
                    New forum
                  </a>
                </p>
                <p className="paragraph-2u">
                  <a href="https://newlife.io/" target="_blank" rel="noreferrer">
                    Newlife I/O
                  </a>
                </p>
                <p className="paragraph-2u">
                  <a href="https://t.me/joinchat/RhLwbuYJoHKJrDAZ" target="_blank" rel="noreferrer">
                    Newgraph
                  </a>
                </p>
                <p className="paragraph-2u">
                  <a href="https://merch.newlife.ai/" target="_blank" rel="noreferrer">
                    Merch
                  </a>
                </p>
              </Col>
              <Col
                style={{
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ marginBottom: "10px" }}>Social Media</p>
                <p className="paragraph-2u">
                  <a target="_blank" href="https://twitter.com/newlifeio" rel="noreferrer">
                    Newlife Twitter
                  </a>
                </p>
                <p className="paragraph-2u">
                  <a target="_blank" href="https://instagram.com/newcoin.nco" rel="noreferrer">
                    Newlife Instagram
                  </a>
                </p>
                <p className="paragraph-2u">
                  <a href="https://t.me/newcoinprotocol" target="_blank" rel="noreferrer">
                    Newlife Telegram
                  </a>
                </p>
                <p className="paragraph-2u">
                  <a target="_blank" href="https://medium.com/@newlife.ai" rel="noreferrer">
                    Newlife Medium
                  </a>
                </p>
              </Col>
              <Col
                style={{
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ marginBottom: "10px" }}>Resources</p>
                <p className="paragraph-2u">
                  <a href="https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ" target="_blank" rel="noreferrer">
                    Support
                  </a>
                </p>
                <p className="paragraph-2u">
                  <a target="_blank">Info Centre</a>
                </p>
                <p className="paragraph-2u">
                  <Link to="/terms_of_service">Services Policy</Link>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Footer>
    </AntdLayout>
  );
};
