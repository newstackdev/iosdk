import { NLView } from "../../types";
import { Button, Col, Form, Input, Row, Space, Tag, List } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useActions, useAppState } from "../../overmind";
import { SearchItemWidget } from "../../Components/SearchItemWidget";
import { ItemGrid } from "../../Components/ItemGrid";
import { useQuery } from "../../hooks/useQuery";
import { ContentImage } from "../../Components/Image";
import { Link } from "react-router-dom";
import { PostReadResponse } from "@newlife/newlife-creator-client-api";
import { fischerYates } from "../../utils/random";

export const useCreativeSearchQuery = () => {
	const query = useQuery();
	const tags = query.get("tags") ?? "";
	const index: number = Number(query.get("index") ?? 0);
	const aesthetics = query.get("aesthetics") ?? "";
	return { tags, aesthetics, index };
};

export const SearchTag: NLView = () => {
	const state = useAppState();
	const actions = useActions();
	const { tags, aesthetics } = useCreativeSearchQuery();
	const ref = useRef<any>();

	const listState = state.lists.search.posts;
	const doSearch = actions.lists.searchPosts;

	const [suggestedTags, setSuggestedTags] = useState([] as string[]);
	// const [_tags, _setTags] = useState([]);

	useEffect(() => {
		actions.routing.setBreadcrumbs([{ text: "Creative Search" }]);
		doSearch({ tags });
	}, [tags]);

	const search = (tags: string, aesthetics: string) => {
		if (tags === "") {
			return;
		}
		if (aesthetics === "") {
			actions.routing.historyPush({
				location: `/search?tags=${tags}`,
			});
		} else {
			actions.routing.historyPush({
				location: `/search?tags=${tags}&aesthetics=${aesthetics}`,
			});
		}
		actions.lists.searchPosts({ tags });
	};
	useEffect(() => {
		ref?.current?.focus();
	}, [ref?.current]);

	const maybeLoadMore = () => {
		actions.lists.searchPosts({ tags });
	};

	const [form] = Form.useForm();
	const lastQueried = listState.lastQueried;
	const items = state.lists.search.posts.results?.value || [];

	useEffect(() => {
		if (!listState.query)
			setSuggestedTags([]);

		form.setFieldsValue({ q: listState.lastQueried.tags });

		const suggestedTagsSources = fischerYates(items, 8) || [];
		const tagsInSources = suggestedTagsSources.filter(Boolean).map(p => (p.tags || [])?.map(t => t.value)).reduce((r, c) => [...r, ...c], []);
		const ts = fischerYates(tagsInSources, 16);
		setSuggestedTags(ts);
	}, [items]);

	// if(true)
	//   return <>hello search</>

	return (
		<div>
			{
				items?.length ?
					<>
						<div
							style={{
								marginBottom: 40,
								maxWidth: "100vw",
								overflow: "auto",
								scrollbarWidth: "thin",
							}}
						>
							Searching for:&nbsp;
							<Space>
								{listState.lastQueried.tags.split(/,/).map((aesthetic) => (
									<Tag
										onClick={() => search(tags, aesthetic)}
										style={{ cursor: "pointer" }}
									>
										{aesthetic}
									</Tag>
								))}
							</Space>
						</div>

						<div>
							{
								// <Form
								// 	form={form}
								// 	style={{ width: "100%" }}
								// 	name="basic"
								// 	initialValues={{ q: lastQueried.tags || "fashion" }}
								// 	onFinish={(e) => {
								// 		search(e.q, "");
								// 	}}
								// 	autoComplete="off"
								// >
								<Row align="middle">
									<Col md={24}>
										<Row gutter={24}>
											{
												suggestedTags.map(t => (
													<Col xs={12} md={6}>
														<div style={{ marginBottom: 20 }}>
															<Link
																to={`/search?tags=${t}`}
																style={{
																	fontSize: "0.9em",
																	padding: 12,
																	height: "100%",
																	display: "inline-block",
																	border: "1px solid white",
																	borderRadius: 32
																}}
															>
																<div>
																	{t}
																</div>
															</Link>
														</div><p></p>
													</Col>)
												)
											}
										</Row>
									</Col>
								</Row>
								// </Form>
							}
						</div>
					</>
					: <></>}

			<ItemGrid
				items={items}
				render={(m: PostReadResponse, index) => (
					<div>
						{/* <SearchItemWidget item={m} index={index} /> */}
						<Link to={`/tags/${tags}/${m.id}`}>
							<ContentImage
								{...m}
								style={{
									aspectRatio: "1/1",
								}}
							/>
						</Link>
					</div>
				)}
				loadMore={maybeLoadMore}
				noEmptyResults={true}
			/>

			{state.indicators.isWorking || items.length || !lastQueried ? (
				<></>
			) : !items.length && lastQueried ? (
				<List
					size="large"
					dataSource={[]}
					loading={state.indicators.isWorking}
					locale={{
						emptyText:
							lastQueried.tags === ""
								? "Search for something!"
								: `No results for '${lastQueried.tags}'`,
					}}
				/>
			) : (
				""
			)}
		</div>
	);
};
export default SearchTag;
