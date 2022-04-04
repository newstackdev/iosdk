import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { Button, Col, Dropdown, Input, Row } from "antd";

import { useEffect, useState } from "react";
import { NLView } from "../../types";
import OutsideClickHandler from "react-outside-click-handler";
import { useActions, useAppState } from "../../overmind";
import { UsersList } from "../../Components/UserWidget";
import { divide } from "lodash";
import { Searchicon } from "../../Components/Icons/Searchicon";

export const SearchResultsWidget: NLView<{ query: string }> = ({ query }) => {
	const state = useAppState();
	const actions = useActions();
	const res = state.lists.search.users.results;

	useEffect(() => {
		actions.lists.searchUsers({ query });
	}, [query]);

	return (
		<ul
			style={{ padding: 24 }}
			className="nl-white-box app-box-shadow paragraph-1r"
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

export const SearchWidget: NLView<{
	user?: UserReadPrivateResponse;
	search: boolean;
	setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ user, search, setSearch }) => {
	const [query, setQuery] = useState<string>("");
	const [resultsVisible, setResultsVisible] = useState<boolean>(false);

	useEffect(() => {
		setResultsVisible(!!query);
	}, [query]);

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
								placement="topCenter"
								overlay={<SearchResultsWidget query={query} />}
								//@ts-ignore
								getPopupContainer={() =>
									document.getElementById(
										"search-dropdown-position"
									)
								}
							>
								<Row className="app-main-full-width-only search-row">
									<Input
										placeholder="Search"
										onChange={(e) =>
											setQuery(e.target.value)
										}
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
									{query !== "" && (
										<div
											onClick={() => setQuery("")}
											style={{
												position: "absolute",
												right: 0,
												color: "white",
												top: "20px",
												fontSize: "15px",
											}}
										>
											Cancel
										</div>
									)}
									{/* <Col span={12}>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Select defaultValue="user" disabled={true}>
                        <Select.Option value="user">Users</Select.Option>
                    </Select>
						</Col> */}
								</Row>
							</Dropdown>
						)}
					</Col>
				</OutsideClickHandler>
			</div>
		</Row>
	);
};
