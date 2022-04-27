import { NLView } from "../../types"
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Tag,
  List,
} from "antd";
import React, { useEffect, useRef } from "react";
import { useActions, useAppState } from "../../overmind";
import { SearchItemWidget } from "../../Components/SearchItemWidget";
import { ItemGrid } from "../../Components/ItemGrid";
import { useQuery } from "../../hooks/useQuery";
import { ContentImage } from "../../Components/Image";
import { Link } from "react-router-dom";
import { PostReadResponse } from "@newlife/newlife-creator-client-api";

export const useCreativeSearchQuery = () => {
  const query = useQuery();
  const tags = query.get("tags") ?? "";
  const index: number = Number(query.get("index") ?? 0);
  const aesthetics = query.get("aesthetics") ?? "";
  return { tags, aesthetics, index };
}

export const SearchTag: NLView = () => {
  const state = useAppState();
  const actions = useActions();
  const { tags, aesthetics } = useCreativeSearchQuery();
  const ref = useRef<any>();
  
  const listState = state.lists.search.posts;
  const doSearch = actions.lists.searchPosts;

  useEffect(() => {
    actions.routing.setBreadcrumbs([{ text: "Creative Search" }]);
    doSearch({ tags });
  }, []);

  useEffect(() => {
    ref?.current.focus();
  }, [ref])

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

  const maybeLoadMore = () => {
    actions.lists.searchPosts({ tags });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ q: listState.lastQueried.tags });
  }, [listState.lastQueried]);

  const lastQueried = listState.lastQueried;
  const items = state.lists.search.posts.results?.value || [];


  // if(true)
  //   return <>hello search</>

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        {
          <Form
            form={form}
            style={{ width: "100%" }}
            name="basic"
            initialValues={{ q: lastQueried.tags || "fashion" }}
            onFinish={(e) => {
              search(e.q, "");
            }}
            autoComplete="off"
          >
            <Row align="middle">
              <Col md={12}>
                <Form.Item
                  label=""
                  name="q"
                  rules={[
                    {
                      required: true,
                      message: "Enter something unique to search for",
                    },
                  ]}
                >
                  <Input
                    ref={ref}
                    defaultValue={tags || ""}
                    style={{
                      fontSize: "clamp(20px, 60px, 9.8vw)",
                      textAlign: "center"
                    }}
                  />
                </Form.Item>
              </Col>
              <Col md={3}></Col>
              <Col md={9}>
                <Form.Item name="aestetics"></Form.Item>
                <Form.Item wrapperCol={{}} style={{position:"relative", bottom:25}}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        }
      </div>
      <div
        style={{
          marginBottom: 40,
          maxWidth: "100vw",
          overflow: "auto",
          scrollbarWidth: "thin",
        }}
      >
        <Space>
          {listState.tags.items.map((aesthetic) => (
            <Tag
              onClick={() => search(tags, aesthetic)}
              style={{ cursor: "pointer" }}
            >
              {aesthetic}
            </Tag>
          ))}
        </Space>
      </div>

      <ItemGrid
        items={items}
        render={(m: PostReadResponse, index) => <div>
          {/* <SearchItemWidget item={m} index={index} /> */}
          <Link to={`/tags/${tags}/${m.id}`}>
            <ContentImage {...m} />
          </Link>
        </div>}
        loadMore={maybeLoadMore}
        noEmptyResults={true}
      />

      {state.indicators.isWorking || items.length  || !lastQueried ? (
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
