// import React from 'react';
// import logo from './logo.svg';
// import './App.less';
import { PartialConfiguration } from "./config";
import {
	BrowserRouter as Router,
	Route,
	Link,
	useHistory,
	Switch
} from "react-router-dom";
import { DomainPresale } from "./Pages/DomainPresale/DomainPresale";
import { NLView } from "./types";
import { UserCreate } from "./Pages/User/UserCreate";
import { About } from "./Pages/About";
import { Explore } from "./Pages/Explore/Explore";
import { Provider } from "overmind-react";
import { overmind as _overmind, useActions, useAppState } from "./overmind";
import { Post } from "./Pages/Post/Post";
import { Mood } from "./Pages/Mood/Mood";
import { User } from "./Pages/User/User";
import { PostCreate } from "./Pages/Post/PostCreate";
import SearchCreative from "./Pages/SearchCreative";
import { Product } from "./Pages/Store/Product";
import { UserStake } from "./Pages/User/UserStake";
import MyMoods from "./Pages/Mood/MyMoods";
import { MoodCreate } from "./Pages/Mood/MoodCreate";
import { UserUpdate } from "./Pages/User/UserUpdate";
import { UserTop } from "./Pages/User/Top";
import { UserInvite } from "./Pages/User/UserInvite";
import { JoinDao } from "./Pages/JoinDao";
import Creators from "./Components/Creators";
import TopFolders from "./Components/TopFolders";
import { LegacyImport } from "./Pages/User/LegacyImport";
import Spotlights from "./Components/Spotlights";
import { SearchCreativePost } from "./Pages/SearchCreativePost";
import CommunityHistory from "./Pages/NewlifeDao/CommunityHistory";
import { Notifications } from "./Pages/Notifications/Notifications";
import { SelectMoodForm } from "./Components/SelectMood";
import { Header } from "antd/lib/layout/layout";
import { Button, Row } from "antd";
import { CrossCircle } from "./Components/Icons/CrossCircle";
import { TOS } from "./Pages/TOS";
import { Privacy } from "./Pages/Privacy";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_ROUTES } from "./defaultRoutes";

// history.js


const AppShell: NLView = ({ children }) => {
	const state = useAppState();
	const history = useHistory();
	const actions = useActions();

	const flags = state.flows.userJourney.flags;

	useEffect(() => {
		// setTimeout(() => {

		const cancel = history.listen((location) =>
			actions.routing.onRouteChange({ location: location })
		);
		actions.routing.onRouteChange({ location: window.location });
		actions.routing.setHistory({ history });
		// })
		return cancel;
	}, []);

	return (
		<>
			<div style={{ position: "sticky", top: "10px", zIndex: 999 }}>
				{!flags["bannerDisabled"] && (
					<div id="rssBlock">
						<div
							className={
								flags["banner"]
									? "banner banner-expand"
									: "banner"
							}
						>
							<div className="banner-text-box">
								{!flags["banner"] ? (
									<p style={{ overflow: "hidden" }}>
										<span className="paragraph-1r marqueeStyle">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Any
											voting actions and proposals you
											hand in will only be beta tests on
											the Newcoin Testnet. Go to our
											Telegram group to hear more about
											the next steps and the Newcoin
											Testnet. Your username on testnet is
											however your username on mainnet.
											Pick your name and reserve it now!
										</span>
										<span className="paragraph-1r marqueeStyle2">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Any
											voting actions and proposals you
											hand in will only be beta tests on
											the Newcoin Testnet. Go to our
											Telegram group to hear more about
											the next steps and the Newcoin
											Testnet. Your username on testnet is
											however your username on mainnet.
											Pick your name and reserve it now!
										</span>
									</p>
								) : (
									<p
										className="paragraph-1r"
										style={{ margin: "10px" }}
									>
										Any voting actions and proposals you
										hand in will only be beta tests on the
										Newcoin Testnet. Go to our Telegram
										group to hear more about the next steps
										and the Newcoin Testnet. Your username
										on testnet is however your username on
										mainnet. Pick your name and reserve it
										now!
									</p>
								)}
								<span
									style={{
										marginLeft: "20px",
										display: "flex",
										cursor: "pointer",
									}}
									onClick={() =>
										actions.flows.userJourney.setFlag({
											flag: "banner",
											value: "true",
										})
									}
								>
									{!flags["banner"] ? (
										<CrossCircle />
									) : (
										<Button
											className="secondary-button"
											onClick={() =>
												actions.flows.userJourney.setFlag(
													{
														flag: "bannerDisabled",
														value: "true",
													}
												)
											}
										>
											<span className="paragraph-2b">
												I understand
											</span>
										</Button>
									)}
								</span>
							</div>
						</div>
					</div>
				)}

				<Header key="h" className="logo" style={{ padding: 0 }}>
					<Row justify="space-around" gutter={0}>
						<div
							className="header"
							style={{ width: "100%", padding: "0 20px" }}
		>
							<state.config.components.layout.TopMenu />
						</div>
					</Row>
				</Header>
			</div>

			<div className="App app-layout-wrapper">
				{/* [AUTH]
					<pre>
						state.auth.status: {state.auth.status} <br />
						state.api.auth.user.id: {state.api.auth.user?.id} <br />
						state.api.auth.status: {state.api.auth.status} <br />
						state.api.auth.user.status: {state.api.auth.user?.status} <br />
					</pre> */}
				<state.config.components.layout.Layout>
				{state.config.routes.useDefaultRoutes ? DEFAULT_ROUTES : <></>}
				{children}
			</state.config.components.layout.Layout>
		</div>
	</>
	);
};

const overmindSampleCustomConfig = {
	components: {
		icons: {
			Logo: () => <>THIS IS THE LOGO DUDE</>
		},
		layout: {
			TopMenu: () => <div>Custom top menu!</div>,
			Layout: () => <div>Custom layout</div>
		}
	}
};

export const App: NLView<{ overmind: ReturnType<typeof _overmind>, config?: PartialConfiguration; }> = ({
	children,
	overmind
}) => {
	return (
		<Provider value={overmind}>
			<Router>
				<AppShell>
					<Switch>
						<>{children || []}
						<Route key="ds" exact path="/newlife-dao" component={CommunityHistory} />
						</>
					</Switch>
				</AppShell>
			</Router>
		</Provider>
	);
};
export default App;
