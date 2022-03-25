import { Header, Content, Footer } from "antd/lib/layout/layout";
import { Row, Col, Layout as AntdLayout, Menu, Dropdown } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { NLView } from "./types";
import { AuthWidget } from "./Pages/AuthWidget";
import { useActions, useAppState } from "./overmind";
import React, { ReactElement, useEffect, useState } from "react";

import { ActivityStream } from "./Components/ActivityStream";
import { Spin } from "./Components/Spin";
import Explore from "./Components/Icons/Explore";
import NavbarUpload from "./Components/Icons/NavbarUpload";
import Notifications from "./Components/Icons/Notifications";
import Logo from "./Components/Icons/Logo";
import Search from "./Components/Icons/Search";
import { SearchWidget } from "./Pages/Search/SearchWidget";
import Paragraph from "antd/lib/typography/Paragraph";
import { Searchicon } from "./Components/Icons/Searchicon";
import { ThreeDots } from "./Components/Icons/ThreeDots";
import { Burger } from "./Components/Icons/Burger";

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
			<Menu.Item key="x" style={{ position: "absolute", left: 0 }}>
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
			<Menu.Item style={{ width: "50vw" }}>
				{state.api.auth.authorized ? (
					<SearchWidget search={search} setSearch={setSearch} />
				) : (
					""
				)}
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
				<Dropdown
					overlayStyle={{}}
					overlay={<ActivityStream limit={5} />}
				>
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
	const [search, setSearch] = useState<boolean>(false);

	const isAuthorized = state.api.auth.authorized;

	return (
		<Menu overflowedIndicator={<Burger />} mode="horizontal">
			<Menu.Item key="tm">
				<Link
					to={state.api.auth.admitted ? "/explore" : "/"}
					className="nav-item nav-item-logo-left-top"
				>
					<div className="logo-left-top-text">Newlife.IO</div>
					<div className="logo-left-top">
						<state.config.components.icons.Logo />
					</div>
				</Link>
			</Menu.Item>
			{/* <Menu.Item>
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
			{isAuthorized ?
				<>
					<Menu.Item
						className="searchbar-properties"
						style={!isAuthorized ? { width: "92%" } : { width: "85%" }}

					>
						<SearchWidget search={search} setSearch={setSearch} />
					</Menu.Item>

					<Menu.Item key="4" hidden={!isAuthorized}>
						<Link to="/explore" className="nav-item">
							<Explore />
							<span className="paragraph-1r navbar-mobile-text">
								Explore
							</span>
							{/* <PlusCircleOutlined /> */}
						</Link>
					</Menu.Item>
					<Menu.Item
						key="5"
						className="make-order-zero"
					>
						<Link to="/post-create" className="nav-item">
							<NavbarUpload />
							<span className="paragraph-1r navbar-mobile-text">
								Upload
							</span>
						</Link>
					</Menu.Item>
					{/* <Menu.Item>
						<Link to="/notifications">
							<Notifications />
						</Link>
					</Menu.Item> */}

				</> :
				<></>
			}
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
			{state.auth.initialized && state.routing.isAllowed ? (
				<>{children}</>
			) : (
				<Spin />
			)}
		</div>
	);
};

export const Layout: NLView = ({ children }) => {

	return (
		<AntdLayout style={{ minHeight: "100vh" }}>
			<div id="search-dropdown-position" />
			<Header key="h" className="logo" style={{ padding: 0 }}>
				<Row
					justify="space-around"
					gutter={0}
				>
					{/* <div className="header" style={{ width: "100%", padding: "0 20px" }}>
						<TopMenu />
					</div> */}
				</Row>
			</Header>
			<Content>
				<Main>{children}</Main>
			</Content>
			<Footer style={{
				backgroundColor: "gray",
				display: "flex",
				flexDirection: "column",
				marginTop: "10%",
				padding: "5% 10% 10% 10%",
			}}>
				<Row justify="space-around" align={"middle"} style={{
					width: "70%",
					height: "20%",
				}}>
					<p>
						<Link
							to="/terms_of_service"
							className="paragraph-2u"
						>
							Terms and Conditions
						</Link>
					</p>
					<p>
						<Link
							to="/privacy_policy"
							className="paragraph-2u"
						>
							Privacy Policy
						</Link>
					</p>
					<p style={{ fontSize: "14px" }}> &copy; Newlife.io All Rights Reserved</p>
				</Row>
				<Row style={{
					marginTop: "10%",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "flex-start"
				}}>
					<Col style={{
						height: "200px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						marginRight: "20px"
					}}>
						<button style={{
							backgroundColor: "gray",
							borderRadius: "50px",
							height: "100px",
							width: "175%",
							border: "white 1px solid",
						}}> <a href="https://forms.gle/izdem2cpHfYavU3a7" target="_blank">Buy $NCO</a>
						</button>
					</Col>
					<Col style={{
						height: "200px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around"
					}}>
						<p style={{ marginBottom: "10px" }}>Q&A</p>
						<p style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}><a target="_blank" href="https://newforum.community/">New forum</a></p>
						<p style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}><a href="https://newlife.io/" target="_blank" >Newlife I/O</a></p>
						<p style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}><a href="https://t.me/joinchat/RhLwbuYJoHKJrDAZ" target="_blank" >Newgraph</a></p>
						<p style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}><a href="https://merch.newlife.ai/" target="_blank">Merch</a></p>
					</Col>
					<Col style={{
						height: "200px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around"
					}}>
						<p style={{ marginBottom: "10px" }}>Social Media</p>
						<p style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}><a target="_blank" href="https://twitter.com/newlifeio">Newlife Twitter</a></p>
						<p style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}><a target="_blank" href="https://instagram.com/newcoin.nco">Newlife Instagram</a></p>
						<p style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}><a href="https://t.me/newcoinprotocol" target="_blank" >Newlife Telegram</a></p>
						<p style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}><a target="_blank" href="https://medium.com/@newlife.ai">Newlife Medium</a></p>
					</Col>
					<Col style={{
						height: "200px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around"
					}}>
						<p style={{ marginBottom: "10px" }}>Resources</p>
						<p style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}><a href="https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ" target="_blank" >Support</a></p>
						<p style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}><a target="_blank" >Info Centre</a></p>
						<p style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>
							<Link
								to="/terms_of_service"
							>
								Services Policy
							</Link>
						</p>
					</Col>
				</Row>
			</Footer>
		</AntdLayout>
	);
};