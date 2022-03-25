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
import { Spin } from "../Components/Spin";
import React, { useEffect } from "react";
import { NLView } from "../types";
import { useActions, useAppState } from "../overmind";
import { useLocation } from "react-router-dom";
import { SearchItemWidget } from "../Components/SearchItemWidget";
import { ItemGrid } from "../Components/ItemGrid";

// TODO: Maybe move to utils or something
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const useCreativeSearchQuery = () => {
  const query = useQuery();
  const tags = query.get("tags") ?? "";
  const index: number = Number(query.get("index") ?? 0);
  const aesthetics = query.get("aesthetics") ?? "";
  return { tags, aesthetics, index };
}

export const SearchCreative: NLView = () => {
  const state = useAppState();
  const actions = useActions();
  const { tags, aesthetics } = useCreativeSearchQuery();

  useEffect(() => {
    actions.routing.setBreadcrumbs([{ text: "Creative Search" }]);
    actions.lists.creativeSearch({ tags, aesthetics });
  }, []);

  const search = (tags: string, aesthetics: string) => {
    if (tags === "") {
      return;
    }
    if (aesthetics === "") {
      actions.routing.historyPush({
        location: `/search-creative?tags=${tags}`,
      });
    } else {
      actions.routing.historyPush({
        location: `/search-creative?tags=${tags}&aesthetics=${aesthetics}`,
      });
    }
    actions.lists.creativeSearch({ tags, aesthetics });
  };

  const maybeLoadMore = () => {
    actions.lists.creativeSearch({ tags, aesthetics });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ q: state.lists.creativeSearch.lastQueried.tags });
  }, [state.lists.creativeSearch.lastQueried]);

  const lastQueried = state.lists.creativeSearch.lastQueried;
  const items = state.lists.creativeSearch.results.items;

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        {
          <Form
            form={form}
            style={{ width: "100%" }}
            name="basic"
            initialValues={{ q: lastQueried || "fashion" }}
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
                    style={{
                      fontSize: "clamp(20px, 120px, 9.8vw)",
                      textAlign: "center",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col md={3}></Col>
              <Col md={3}>
                <Form.Item name="aestetics"></Form.Item>
                <Form.Item wrapperCol={{}}>
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
          {state.lists.creativeSearch.tags.items.map((aesthetic) => (
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
        render={(m, index) => <SearchItemWidget item={m} index={index} />}
        loadMore={maybeLoadMore}
      />
      
      {state.indicators.isWorking ? (
        <Spin />
      ) : !items.length && lastQueried ? (
        <List
          size="large"
          dataSource={[]}
          loading={state.indicators.isWorking}
          locale={{
            emptyText:
              lastQueried.tags === ""
                ? "Search something!"
                : `No results for '${lastQueried.tags}'`,
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default SearchCreative;
