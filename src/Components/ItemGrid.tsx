import { Col, Result, Row } from "antd";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { MoodCreateModal } from "../Pages/Mood/MoodCreate";
import { NLView } from "../types";
import { ReactElement, useEffect } from "react";
import { Spin } from "./Spin";
import { useAppState } from "../overmind";
import Title from "../Pages/Explore/Title";
import useVisibility from "../hooks/useVisibility";

export type ItemGridParams<T> = {
  title?: string;
  titleLink?: string;
  items?: any[];
  limit?: number;
  render: (item: object, index: number) => ReactElement;
  loadMore?: () => void;
  setSelectedFolder?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFolder?: boolean;
  noEmptyResults?: boolean;
  gridRow?: number;
  wrapAt?: number;
  deeplikeActions?: boolean;
  deepLikeContainer?: React.MutableRefObject<null>;
};

export const ItemGrid: NLView<ItemGridParams<object>> = ({
  items,
  render,
  title,
  titleLink,
  loadMore,
  limit,
  noEmptyResults,
  wrapAt,
  deeplikeActions,
  deepLikeContainer,
  gridRow,
}) => {
  const [isVisible, currentElement] = useVisibility<HTMLDivElement>(200);
  const state = useAppState();
  useEffect(() => {
    loadMore && loadMore();
  }, [isVisible]);

  items = items && limit ? items.slice(0, limit) : items ? items.slice(0, items.length) : [];

  const tagsInSources = items
    .filter(Boolean)
    .map((p) => (p.tags || [])?.map((t) => t.value))
    .reduce((r, c) => [...r, ...c], []);

  if (state.indicators.isWorking === false && !items.length)
    return noEmptyResults ? <></> : <Result icon={<></>}>nothing here</Result>;
  return (
    <>
      {items.length ? (
        <Row wrap={true} className={wrapAt === 3 ? "nl-mood-grid-row-three" : "nl-mood-grid-row-responzive"} align="top">
          {items.map((item, index) => (
            <Col
              key={`item${index}`}
              // className={"share-folder"}
            >
              {render(item, index)}
            </Col>
          ))}
        </Row>
      ) : (
        ""
      )}
      <div ref={currentElement}>{state.indicators.isWorking === true && loadMore ? <Spin /> : ""}</div>
    </>
  );
};

{
  /* <Masonry columnGutter={18} columnWidth={280} items={post.moods || []} render={({ data }) => <MoodWidget mood={data} />} /> */
}
