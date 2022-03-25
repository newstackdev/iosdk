import {
	UserOutlined,
	LaptopOutlined,
	NotificationOutlined,
} from "@ant-design/icons";
import { Header, Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import {
	Row,
	Col,
	Breadcrumb,
	Layout as AntdLayout,
	Menu,
	notification,
} from "antd";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { NLView } from "./types";
import { get } from "lodash";
import { AuthWidget } from "./Pages/AuthWidget";
import { useActions, useAppState } from "./overmind";
import { useEffect } from "react";

import { PlusCircleOutlined } from "@ant-design/icons";
import { AUTH_FLOW_STATUS } from "./overmind/auth/state";

export const Layout: NLView = ({ children }) => {
	const state = useAppState();
	const actions = useActions();
	const history = useHistory();
	const match = useRouteMatch();

	useEffect(() => {
		// setTimeout(() => {
		history.listen((location) =>
			actions.routing.onRouteChange({ location })
		);
		// })
	}, []);
	// useEffect(() => {
	// 	state.routing.location && history.push(state.routing.location);
	// }, [state.routing.location]);

	return (
		<AntdLayout>
			<Header key="h" className="header logo">
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={["2"]}
				>
					{/* <Menu.Item key="1">
                    <Link
                        to="/about"
                        // underlayColor="#f0f4f7"
                        className="nav-item">
                        <div className="logo" />
                    </Link>
                </Menu.Item> */}

					<Menu.Item key="1">
						<Link
							to="/explore"
							/*underlayColor="#f0f4f7"*/ className="nav-item"
						>
							{/* ${state.indicators.inProgress ? "rotating" : ""} */}
							<div className={`logo-image`}></div>
						</Link>
					</Menu.Item>
					<Menu.Item key="0">
						<Link
							to="/payment/subscription"
							/*underlayColor="#f0f4f7"*/ className="nav-item"
						>
							<div>Subscribe</div>
						</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link
							to="/about"
							/*underlayColor="#f0f4f7"*/ className="nav-item"
						>
							About
						</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="/search-creative" className="nav-item">
							Creative Search
						</Link>
					</Menu.Item>
					<Menu.Item key="4">
						<Link to="/explore" className="nav-item">
							Explore
						</Link>
					</Menu.Item>
					<Menu.Item key="5">
						<Link to="/post-create" className="nav-item">
							<PlusCircleOutlined />
						</Link>
					</Menu.Item>
					{/* <Menu.Item key="3">What</Menu.Item> */}
					{/* <Menu.Item key="4" style={{ marginLeft: "auto" }}> */}
					<AuthWidget />
					{/* </Menu.Item> */}
				</Menu>
			</Header>
			<AntdLayout key="c">
				<AntdLayout key="m" style={{ padding: "0 0 24px" }}>
					<Content
						key="mc"
						className="site-layout-background"
						style={{
							padding: 24,
							margin: "auto",
							minHeight: 280,
							maxWidth: "90vw",
							minWidth: "80vw",
						}}
					>
						{
							state.auth.status <
								AUTH_FLOW_STATUS.AUTHENTICATED ? (
								// || NONPOSTAUTHLOCATIONS.includes(state.routing.location)
								<>
									<Breadcrumb style={{ margin: "16px 0" }}>
										{
											//@ts-ignore
											state.routing.breadcrumbs.map(
												(b, i, a) => (
													<>
														{b.url ? (
															<Breadcrumb.Item>
																{b.url ? (
																	<Link
																		to={
																			b.url
																		}
																	>
																		{b.text}
																	</Link>
																) : (
																	b.text
																)}
															</Breadcrumb.Item>
														) : (
															<Breadcrumb.Item>
																{b.text}
															</Breadcrumb.Item>
														)}
													</>
												)
											)
										}
										{state.routing.breadcrumbs.length ? (
											<Breadcrumb.Item>
												&gt;
											</Breadcrumb.Item>
										) : (
											""
										)}
									</Breadcrumb>

									<div>{children}</div>
								</>
							) : (
								"Checking authorization..."
							)
							// <div>{JSON.stringify(state.auth.status)} {state.routing.location} {window.location.pathname} {!!NONPOSTAUTHLOCATIONS.includes(window.location.pathname)}</div>
						}
					</Content>
				</AntdLayout>
			</AntdLayout>
		</AntdLayout>
	);
};


{/* <Sider width={200} style={{ position: 'absolute' }} defaultCollapsed={true} collapsible={true} className="site-layout-background">
<Menu
	mode="inline"
	defaultSelectedKeys={['1']}
	defaultOpenKeys={['sub1']}
	style={{ height: '100%', borderRight: 0 }}
	>
	<SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
		<Menu.Item key="1">why</Menu.Item>
		<Menu.Item key="2">what</Menu.Item>
		<Menu.Item key="3">who</Menu.Item>
	</SubMenu>
	<SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
		<Menu.Item key="5">option5</Menu.Item>
		<Menu.Item key="6">option6</Menu.Item>
		<Menu.Item key="7">option7</Menu.Item>
		<Menu.Item key="8">option8</Menu.Item>
	</SubMenu>
	<SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
		<Menu.Item key="9">option9</Menu.Item>
		<Menu.Item key="10">option10</Menu.Item>
		<Menu.Item key="11">option11</Menu.Item>
		<Menu.Item key="12">option12</Menu.Item>
	</SubMenu>
	</Menu>
</Sider> */}