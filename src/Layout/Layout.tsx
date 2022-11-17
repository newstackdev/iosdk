import { ActivityStream } from "../Components/ActivityStream";
import { AuthWidget } from "../Pages/AuthWidget";
import { Burger } from "../Components/Icons/Burger";

import { Header as ADHeader, Content } from "antd/lib/layout/layout";
import { Layout as AntdLayout, Col, Dropdown, Menu, Row } from "antd";
import { IOView, NLView } from "../types";
import { Link } from "react-router-dom";
import { ReactElement, useState } from "react";
import { useActions, useAppState } from "../overmind";

import { DAO } from "../Components/Icons/DAO";
import { LargeArrowBack } from "../Components/Icons/LargeArrowBack";
import { NLFooter } from "./NLFooter";
import { SearchWidget } from "../Pages/Search/SearchWidget";
import { Spin } from "../Components/Spin";
import { showPopUp } from "../utils/popup";

import { Searchicon } from "src/Components/Icons/Searchicon";
import Explore from "../Components/Icons/Explore";
import Logo from "../Components/Icons/Logo";
import NavbarUpload from "../Components/Icons/NavbarUpload";
import NewsafeLogo from "../Components/Icons/NewsafeLogo";
import Notifications from "../Components/Icons/Notifications";

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
        <Link to="/post-create" className="nav-item nav-item-upload">
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
  const [selection, setSelection] = useState<string>("");

  // const [search, setSearch] = useState<boolean>(false);
  const actions = useActions();
  const isAuthorized = state.api.auth.authorized;

  // const setVisible = (v: boolean) =>
  //   actions.flows.userJourney.setFlag({
  //     flag: "walletShown",
  //     value: v ? "true" : "",
  //   });
  // const walletShown = !!state.flows.userJourney.flags.walletShown;

  const routes = state.flows.user.create.isLegacyUpdateOngoing
    ? [...state.config.routes.noBackButton, "/signup/create"]
    : state.config.routes.noBackButton;
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
        <span className="large-arrow-back-wide-screen">{isAllowedPath && <LargeArrowBack />}</span>
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
          <Menu.Item className="searchbar-properties" style={!isAuthorized ? { width: "92%" } : { width: "70%" }}>
            <SearchWidget searchUsers searchTags setSelection={setSelection} suffixIcon={<Searchicon fillColor="black" />} />
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
          <Menu.Item key="8">
            <a
              href="javascript:null"
              onClick={() =>
                showPopUp(`https://auth${state.config.env.env == "dev" ? "-dev" : ""}.newsafe.org/wallet`, "__NEWSAFE__")
              }
            >
              <NewsafeLogo />
            </a>
            {/* <WalletWidget />
            <span className="paragraph-1r navbar-mobile-text">Wallet</span> */}
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
      {state.ux.layout.footerShown && <NLFooter />}
    </AntdLayout>
  );
};
