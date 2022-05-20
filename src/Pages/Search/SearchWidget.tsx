import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { Button, Col, Dropdown, Input, Row, Select } from "antd";

import { useEffect, useState } from "react";
import { NLView } from "../../types";
import OutsideClickHandler from "react-outside-click-handler";
import { useActions, useAppState } from "../../overmind";
import { UsersList } from "../../Components/UserWidget";
import { Searchicon } from "../../Components/Icons/Searchicon";
import { json } from "overmind";
import { Link } from "react-router-dom";
import { uniqBy } from "lodash"

export const UserSearchResultsWidget: NLView<{ query: string }> = ({ query }) => {
	const state = useAppState();
	const actions = useActions();
	const res = state.lists.search.users.results;

	useEffect(() => {
		actions.lists.searchUsers({ query });
	}, [query]);

	return (
		<ul
			style={{ padding: 24, maxWidth: 700, marginTop: 5, marginLeft: 150 }}
			className="nl-white-box app-box-shadow paragraph-1r user-search-results-widget"
		>
			{res && res?.value?.length ? (
				<UsersList users={res.value} powerUp={false} />
			) : res && !res?.value?.length ? (
				"No results"
			) : (
				""
			)}
		</ul>
	);
};

export const TagsAutosuggestWidget: NLView<{ query: string }> = ({ query }) => {
	const state = useAppState();
	const actions = useActions();
	const res = uniqBy(json(state.lists.search.tags.results)?.value || [], t => t.tag);

	useEffect(() => {
		actions.lists.searchTags({ query });
	}, [query]);

	return (
		<div
			style={{ padding: 24, maxWidth: 700, marginTop: 5, marginLeft: 150 }}
			className="nl-white-box app-box-shadow paragraph-1r user-search-results-widget"
		>
			{res.length ? (
				res.map(t => <div
					style={{ width: "100%", cursor: "pointer" }}
					key={t.tag}
					onClick={() => actions.routing.historyPush({ location: `/search?tags=${t.tag}` })}>
					{t.tag}
				</div>
				)
			) : res && !res?.length ? (
				"No results"
			) : (
				""
			)}
		</div>
	);
};

type SearchResultsWidget = typeof UserSearchResultsWidget;


const SearchResultsByMode = {
	"@": UserSearchResultsWidget,
	"#": TagsAutosuggestWidget
};

export const SearchWidget: NLView<{
	user?: UserReadPrivateResponse;
	// search: boolean;
	// setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ user }) => {
	const state = useAppState();

	const [query, setQuery] = useState<string>("");
	const [mode, setMode] = useState<string>("#");
	const [resultsVisible, setResultsVisible] = useState<boolean>(false);
	const [SearchResultsWidget, setSearchResultsWidget] = useState<{ component: SearchResultsWidget }>({ component: TagsAutosuggestWidget })
	const actions = useActions();
	const currQuery = mode == "#" ? state.lists.search.posts.query : state.lists.search.users.query
	// const setQuery = mode == "#" ? actions.lists.searchTags : actions.lists.searchUsers;
	const [search, setSearch] = useState(false);

	useEffect(() => {

		if (/^[\@\#]$/.test(query)) {
			setMode(query);
			setSearchResultsWidget({ component: SearchResultsByMode[query] });
			setQuery("");
			return;
		}
		// if(query.startsWith("#") && query.length > 3)
		// 	actions.lists.searchTags({ query });
	}, [query]);

	useEffect(() => {
		if (currQuery == query)
			return;

		setQuery(currQuery);
		setResultsVisible(false);


	}, [currQuery])

	return (
		<Row
			style={{
				height: "100%",
				alignItems: "center",
				width: "100%",
			}}
		>
			<div onClick={() => setSearch(!search)}>

				<Searchicon />
			</div>
			<div style={{ flex: "1" }}>
				<OutsideClickHandler
					onOutsideClick={() => {
						setResultsVisible(false);
					}}
				>
					<Col span={20} className="app-main-full-width-only">
						{search && (
							<Dropdown
								visible={resultsVisible}
								placement="bottomCenter"
								overlay={
									<SearchResultsWidget.component query={query || ""} />
								}
							>
								<Row className="app-main-full-width-only search-row">
									<Input
										prefix={mode || ""}
										placeholder="Search"
										onPressEnter={() => {
											const q = query;
											// setQuery("");
											
											// actions.lists.searchPosts({ tags: q, force: true });
											if(mode == "#") {
												setTimeout(() => actions.routing.historyPush({ location: `/search?tags=${q}` }), 100);
												setResultsVisible(false);
											}
										}}
										suffix={search && (
											<div
												onClick={() => setSearch(false)}
												style={{
													position: "absolute",
													right: 0,
													color: "white",
													// top: "20px",
													fontSize: "15px",
												}}
											>
												Cancel
											</div>
										)}
										onFocus={() => setResultsVisible(true)}
										onChange={(e) => {
											setQuery(e.target.value);
											setResultsVisible(!!e.target.value);
										}}
										style={
											query === ""
												? {
													opacity: "80%",
													width: "100%",
												}
												: {
													opacity: "100%",
													width: "100%",
												}
										}
										value={query}
									/>
								</Row>
							</Dropdown>
						)}
					</Col>
				</OutsideClickHandler>
			</div>
		</Row>
	);
};
