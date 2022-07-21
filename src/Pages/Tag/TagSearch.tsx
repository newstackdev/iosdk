import { BannerHashtag } from "../../Components/TopHashtags";
import { Button, Col, Form, Input, List, Row, Space, Tag } from "antd";
import { ContentImage } from "../../Components/Image";
import { ItemGrid } from "../../Components/ItemGrid";
import { Link } from "react-router-dom";
import { NLView } from "../../types";
import { PostReadResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { SearchItemWidget } from "../../Components/SearchItemWidget";
import { fischerYates } from "../../utils/random";
import { useActions, useAppState } from "../../overmind";
import { useQuery } from "../../hooks/useQuery";
import React, { useEffect, useRef, useState } from "react";

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

  const [tagNames, setTagNames] = useState([] as string[]);
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
  const suggestedTagsSources = fischerYates(items, 8) || [];

  useEffect(() => {
    if (!listState.query) setTagNames([]);

    form.setFieldsValue({ q: listState.lastQueried.tags });

    const tagsInSources = suggestedTagsSources
      .filter(Boolean)
      .map((p) => (p.tags || [])?.map((t) => t.value))
      .reduce((r, c) => [...r, ...c], []);
    const ts = fischerYates(tagsInSources, 12);
    setTagNames(ts);

    const tagsWithPics = suggestedTagsSources
      .filter(Boolean)
      .filter((p) => !!p.tags?.length)
      .map((p) => ({
        value: fischerYates(p.tags, 1).values,
        contentUrl: p.contentUrl,
      }));
  }, [items]);

  // if(true)
  //   return <>hello search</>

  return (
    <div>
      {items?.length ? (
        <>
          {/* <div
						style={{
							marginBottom: 40,
							maxWidth: "100vw",
							overflow: "auto",
							scrollbarWidth: "thin",
						}}
					>
						Searching for:&nbsp;
						<Space>
							{listState.lastQueried.tags
								.split(/,/)
								.map((aesthetic) => (
									<Tag
										onClick={() => search(tags, aesthetic)}
										style={{ cursor: "pointer" }}
									>
										{aesthetic}
									</Tag>
								))}
						</Space>
					</div> */}

          <Row style={{ width: "100%" }}>
            <p className="header-2 u-margin-bottom-medium">
              #
              {listState.lastQueried.tags.split(/,/).map((aesthetic) => (
                <span className="u-margin-left-small">{aesthetic}</span>
              ))}
            </p>
          </Row>

          <div>
            <BannerHashtag items={suggestedTagsSources} tagNames={tagNames} gridRow={3} limit={3} />
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
              // </Form>
            }
          </div>
        </>
      ) : (
        <></>
      )}

      <ItemGrid
        items={items}
        render={(m: PostReadResponse, index) => (
          <div>
            {/* <SearchItemWidget item={m} index={index} /> */}
            <Link to={`/tags/${tags}/${m.id}`}>
              <ContentImage {...m} style={{ aspectRatio: "1/1" }} />
            </Link>
          </div>
        )}
        loadMore={maybeLoadMore}
        noEmptyResults={true}
      />

      {state.indicators.isWorking || items.length || !lastQueried ? (
        <BannerHashtag items={suggestedTagsSources} tagNames={tagNames} gridRow={3} limit={3} />
      ) : !items.length && lastQueried ? (
        <List
          size="large"
          dataSource={[]}
          loading={state.indicators.isWorking}
          locale={{
            emptyText: lastQueried.tags === "" ? "Search for something!" : `No results for '${lastQueried.tags}'`,
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default SearchTag;
