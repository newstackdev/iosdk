import { Avatar, Button, Col, Dropdown, Input, Row, Select } from "antd";
import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";

import { Callback, IOView, NLView } from "../../types";
import { ContentImage } from "../../Components/Image";
import { Searchicon } from "../../Components/Icons/Searchicon";
import { Tag } from "antd-latest";
import { UsersList } from "../../Components/UserWidget";
import { VerifiedIcon } from "../..//Components/Icons/VerifiedIcon";
import { VerifiedIconLight } from "../../Components/Icons/VerifiedIconLight";
import { json } from "overmind";
import { map, uniqBy, values } from "lodash";
import { useActions, useAppState } from "../../overmind";
import { useEffect, useMemo, useState } from "react";
import { useVerified } from "../../hooks/useVerified";

export const UserSearchResultsWidget: NLView<{ query: string }> = ({ query }) => {
  const state = useAppState();
  const actions = useActions();
  const res = state.lists.search.users.results;

  useEffect(() => {
    actions.lists.searchUsers({ query });
  }, [query]);

  return (
    <Select.Option className="nl-white-box app-box-shadow paragraph-1r user-search-results-widget">
      {res && res?.value?.length ? (
        <UsersList users={res.value} powerUp={false} />
      ) : res && !res?.value?.length ? (
        "No results"
      ) : (
        ""
      )}
    </Select.Option>
  );
};

export const TagsAutosuggestWidget: NLView<{ query: string }> = ({ query }) => {
  const state = useAppState();
  const actions = useActions();
  const res = uniqBy(json(state.lists.search.tags.results)?.value || [], (t: any) => t.tag);

  useEffect(() => {
    actions.lists.searchTags({ query });
  }, [query]);

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 700,
        marginTop: 5,
        marginLeft: 150,
      }}
      className="nl-white-box app-box-shadow paragraph-1r user-search-results-widget"
    >
      {res.length
        ? res.map((t: any) => (
            <div
              style={{ width: "100%", cursor: "pointer" }}
              key={t.tag}
              onClick={() =>
                actions.routing.historyPush({
                  location: `/search?tags=${t.tag}`,
                })
              }
            >
              {t.tag}
            </div>
          ))
        : res && !res?.length
        ? "No results"
        : ""}
    </div>
  );
};

type SearchResultsWidget = typeof UserSearchResultsWidget;

const SearchResultsByMode = {
  "@": UserSearchResultsWidget,
  "#": TagsAutosuggestWidget,
};

export const SearchWidget: NLView<{
  user?: UserReadPrivateResponse;
  searchUsers?: boolean;
  searchTags?: boolean;
  noNavigation?: boolean;
  onChange?: Callback;
  showSearch?: boolean;
  setSelection?: React.Dispatch<React.SetStateAction<string>>;
  selection?: string;
  // search: boolean;
  // setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ user, searchUsers, searchTags, noNavigation, onChange, showSearch, setSelection, selection }) => {
  const state = useAppState();
  const actions = useActions();
  const [query, setQuery] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [mouseVisible, setMouseVisible] = useState(false);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterState, setFilterState] = useState<"Member" | "Tag" | undefined>(undefined);

  const foundUsers = state.lists.search.users?.results?.value || [];
  const foundTags = Array.from(new Set((state.lists.search.tags?.results?.value || []).map((t) => t.tag))) || [];

  const { verifiedUsers } = useVerified(map(foundUsers, "username"));

  const [currVal, setCurrVal] = useState<string>("");

  useEffect(() => {
    const searchForResults = async () => {
      if (query.length < 3) return;

      setLoading(true);

      const queryUsers = searchUsers && actions.lists.searchUsers({ query });
      const queryTags = searchTags && actions.lists.searchTags({ query });

      await Promise.all([queryUsers, queryTags]);

      setLoading(false);
    };

    searchForResults();
  }, [query]);

  const _setSelection = (v: string = "") => {
    setSelection && setSelection(v);
    onChange && onChange(v);
    setCurrVal(v);
  };

  const setInitialState = () => {
    setQuery("");
    // _setSelection && _setSelection("");
  };

  const onSearch = (query: string) => {
    setQuery(query);
    setOpen(true);
  };

  const onSelect = (value: string) => {
    setOpen(false);
    const mode = /^[@#]/.test(value[0]) ? value[0] : "#";
    const v = value.replace(/^[@#]/, "");
    const path = mode === "#" ? `/search?tags=${v}` : `/user/${v}`;

    if (v === selection?.toString()) {
      return;
    }

    if (!noNavigation)
      actions.routing.historyPush({
        location: path,
      });
    setVisible(false);

    _setSelection(v);

    setQuery("");
  };

  // const onDeselect = (value: string) => {
  //   const v = value.replace(/^[@#]/, "");

  //   setSelection && setSelection((p) => [...p.filter((pVal) => pVal !== v)]);
  // };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={() => {
          _setSelection();
          onClose();
        }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Row
      align="bottom"
      style={{ width: "100%", height: "48px" }}
      onMouseOut={() => setMouseVisible(false)}
      onMouseOver={() => setMouseVisible(true)}
    >
      {/* {currVal} */}
      <div style={{ width: 30, margin: "16px 5px 0 5px" }} onClick={() => setVisible(!visible)}>
        <Searchicon />
      </div>

      <div style={{ width: 300, height: "100%" }}>
        {mouseVisible || visible ? (
          <Select
            className="search-widget"
            mode={noNavigation ? "multiple" : undefined}
            allowClear
            showSearch
            clearIcon={
              !loading ? (
                <div
                  style={{
                    position: "absolute",
                    right: -10,
                    color: "white",
                  }}
                  className="paragraph-2b"
                  onClick={() => setInitialState()}
                >
                  Cancel
                </div>
              ) : (
                <></>
              )
            }
            // value={selection ? undefined : []}
            // tagRender={tagRender}
            searchValue={query}
            loading={loading}
            autoFocus
            open={open}
            style={{ marginTop: 12, width: "min(350px,80vw)" }}
            placeholder="Search..."
            onSearch={(query) => onSearch(query)}
            onBlur={() => setInitialState()}
            onSelect={(value: string) => onSelect(value)}
            // onDeselect={onDeselect}
            dropdownRender={(menu) => (
              <>
                <Row
                  style={{
                    backgroundColor: "#A5A1A1",
                    padding: 10,
                  }}
                >
                  {foundUsers.length > 0 && foundTags.length > 0 && searchTags && searchUsers ? (
                    <>
                      <Col
                        className={filterState === "Member" ? "filter-tag filter-tag__active" : "filter-tag"}
                        onClick={() => {
                          setFilterState("Member");
                          setVisible(true);
                        }}
                      >
                        <p className="paragraph-2b">Member</p>
                      </Col>
                      <Col
                        className={filterState === "Tag" ? "filter-tag filter-tag__active" : "filter-tag"}
                        onClick={() => {
                          setFilterState("Tag");
                          setVisible(true);
                        }}
                      >
                        <p className="paragraph-2b">Hashtag</p>
                      </Col>
                    </>
                  ) : (
                    <></>
                  )}
                </Row>
                {menu}
              </>
            )}
          >
            {foundUsers?.map((u) => {
              const isUserVerified = verifiedUsers && u.username && verifiedUsers.includes(u.username);
              if (filterState === "Tag") return;
              return (
                <Select.Option value={`@${u.username}`}>
                  <Row gutter={18} className="app-main-full-width-only" wrap={true} style={{ alignItems: "center" }}>
                    <Col>
                      <Avatar src={<ContentImage {...u} />} />
                    </Col>
                    <Col>
                      <p className="paragraph-2b">{u.username}</p>
                      {isUserVerified && <VerifiedIcon />}
                    </Col>
                  </Row>
                </Select.Option>
              );
            })}

            {foundTags.map((t) => {
              if (filterState === "Member") return;
              return (
                <Select.Option value={`#${t}`}>
                  <Row align="middle" gutter={18} className="app-main-full-width-only" justify="start" wrap={true}>
                    <Col span={5}>
                      <Avatar
                        src={
                          <div
                            style={{
                              background: "lightgrey",
                              color: "grey",
                              paddingTop: 10,
                              paddingBottom: 10,
                            }}
                          >
                            #
                          </div>
                        }
                      />
                    </Col>
                    <Col span={13}>
                      <p className="paragraph-2b">{t}</p>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                </Select.Option>
              );
            })}
          </Select>
        ) : (
          <div style={{ width: "auto", height: "100%" }}>&nbsp;</div>
        )}
      </div>
    </Row>
  );
};
