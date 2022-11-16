import { useActions, useAppState } from "../../overmind/overmind";
import { NLView } from "@newstackdev/iosdk/dist/types";
import { NewsafeAuth } from "@newstackdev/iosdk/dist/Components/NewsafeAuth";

import { Layout, Row, Col, Spin, Drawer } from "antd";
import { useOvermindRouting } from "../hooks/useOvermindRouting";
import { MainMenu } from "../../Components/MainMenu";
import useMediaQuery from "@newstackdev/iosdk/dist/hooks/useMediaQuery";
import { Hamburger } from "../../Icons/Hamburger";

import { CloseIcon } from "../../Icons/CloseIcon";

import { useEffect, useState } from "react";
import LogoIcon from "../../Icons/LogoIcon";
import { Link } from "react-router-dom";
// import { authorize } from "@newstackdev/iosdk/dist/overmind/api/actions/auth";

const { Header, Footer, Sider, Content } = Layout;

export const AppLayout: NLView = ({ children }) => {
	const state = useAppState();
	const actions = useActions();
	useOvermindRouting();

	const isLoggedIn = state.api.auth.user?.username;
	const isAllowed = state.routing.isAllowed;

	const isMobile = useMediaQuery("(max-width: 768px)");

	return (
		<Layout>
			<Header>
				<Row justify="space-between" style={{ alignItems: "center" }}>
					<Row align="middle">
						<Col className="logo header-padding">
							<Link to="/">
								<LogoIcon />
							</Link>
						</Col>
						<Col className="text-huge text-left">
							{state.config.settings.app.name}
						</Col>
					</Row>
					<Row align="middle">
						<Row className="text-right ns-user-header-outline" align="top">
							<span>{isLoggedIn || "not authenticated"}</span>
						</Row>
						{isMobile && isLoggedIn && (
							<Col className="text-right header-padding">
								<MobileDrawer />
							</Col>
						)}
					</Row>
				</Row>
			</Header>
			<Layout className="main-layout">
				{isLoggedIn && !isMobile && (
					<Sider>
						<MainMenu />
					</Sider>
				)}
				<Content className="main-content">
					{state.indicators.specific[
						"newgraphApplication.authWithUnsid"
					] ? (
						<Spin />
					) : isLoggedIn || isAllowed ? (
						children
					) : (
						<NewsafeAuth />
					)}
				</Content>
			</Layout>
			<Footer>
				This application is based on{" "}
				<a href="https://github.com/newstackdev/iosdk" target="_blank">
					iosdk
				</a>
				.
			</Footer>
		</Layout>
	);
};

const MobileDrawer = () => {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Hamburger onClick={showDrawer} />
			{/* @ts-ignore */}
			<Drawer
				placement="left"
				onClose={onClose}
				visible={open}

				closable
				destroyOnClose
				closeIcon={<CloseIcon />}
				extra={<LogoIcon />}
			>
				<Sider>
					<MainMenu />
				</Sider>
			</Drawer>
		</>
	);
};
