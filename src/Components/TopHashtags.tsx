import { Col } from "antd";
import { ContentImage } from "./Image";
import { ItemGrid } from "./ItemGrid";
import { Link } from "react-router-dom";
import { NLView } from "../types";
import { PostReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { Row } from "antd-latest";
import { SpotlightGrid } from "./Spotlights";
import { fischerYates } from "../utils/random";
import { useActions, useAppState } from "../overmind";
import { useEffect, useState } from "react";
import Title from "../Pages/Explore/Title";

const TopHashtags: NLView<{
  maxItems?: number;
  maxPostsToShow?: number;
  skipItems?: number;
  title?: string;
  posts?: string;
}> = ({ maxItems, title, posts, skipItems, maxPostsToShow }) => {
  const state = useAppState();
  const actions = useActions();
  const [tagNames, setTagNames] = useState([] as string[]);
  const [tagImages, setTagImages] = useState([] as string[]);

  const items = state.lists.search.posts.results?.value || [];

  maxItems = maxItems || 100;

  useEffect(() => {
    actions.lists.searchPosts({
      tags: "fashion, art, architecture, hat",
    });
  }, []);

  const suggestedTagsSources = fischerYates(items, 8) || [];

  useEffect(() => {
    const tagsInSources = items
      .filter(Boolean)
      .map((p) => (p.tags || [])?.map((t) => t.value))
      .reduce((r, c) => [...r, ...c], []);
    const ts = fischerYates(tagsInSources);
    setTagNames(ts);

    const tagsWithPics = suggestedTagsSources
      .filter(Boolean)
      .filter((p) => !!p.tags?.length)
      .map((p) => ({
        value: fischerYates(p.tags, 1).values,
        contentUrl: p.contentUrl,
      }));

    const tp = fischerYates(tagsWithPics, 6);
    setTagImages(tp);
  }, [items]);

  const maybeLoadMore = () => {
    actions.lists.searchPosts({
      tags: "fashion, art, architecture, hat",
    });
  };

  return (
    <div>
      {title === undefined ? (
        <Row style={{ width: "100%" }}>
          <p className="header-2 u-margin-bottom-medium">Explore top hashtags</p>
        </Row>
      ) : (
        <Title title={title} href="/top/hashtags" />
      )}
      <BannerHashtag
        items={items}
        tagNames={tagNames}
        gridRow={3}
        limit={state.routing.location !== "/top/hashtags" ? 6 : undefined}
      />
    </div>
  );
};

export const BannerHashtag: NLView<{
  items?: any[];
  tagNames: string[];
  limit?: number;
  gridRow?: number;
}> = ({ items, tagNames, limit, gridRow }) => (
  <ItemGrid
    items={items}
    tagPreview={true}
    limit={limit}
    gridRow={gridRow}
    render={(m: PostReadResponse, index) => (
      <div
        style={{
          height: "130%",
          width: "100%",
          marginBottom: 30,
        }}
      >
        <Link to={`/search?tags=${encodeURIComponent(tagNames[index])}`} style={{ cursor: "pointer" }}>
          <p
            className="header-3"
            style={{
              position: "absolute",
              zIndex: 9999,
              color: "#fff",
              width: "100%",
              top: "40%",
            }}
          >
            {tagNames ? tagNames[index] : ""}
          </p>
          <ContentImage
            {...m}
            style={{
              aspectRatio: "1/1",
              position: "relative",
              opacity: 0.4,
            }}
          />
        </Link>
      </div>
    )}
    noEmptyResults={true}
  />
);

export default TopHashtags;
