import { Avatar, Button, Col, Dropdown, Input, Row, Select } from "antd";
import { UserReadPrivateResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";

import { Callback, IOView, NLView } from "../../types";
import { ContentImage } from "../../Components/Image";
import { Searchicon } from "../../Components/Icons/Searchicon";
import { UsersList } from "../../Components/UserWidget";
import { VerifiedIcon } from "../../Components/Icons/VerifiedIcon";
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
  // search: boolean;
  // setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ user, searchUsers, searchTags, noNavigation, onChange, showSearch }) => {
  const state = useAppState();
  const actions = useActions();
  const [query, setQuery] = useState<string>("");
  const [selection, setSelection] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(true);
  const [mouseVisible, setMouseVisible] = useState(false);
  const [justNavigated, setJustNavigated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterState, setFilterState] = useState<"Member" | "Tag" | undefined>(undefined);

  const foundUsers = state.lists.search.users?.results?.value || [];
  const foundTags = Array.from(new Set((state.lists.search.tags?.results?.value || []).map((t) => t.tag))) || [];

  const { verifiedUsers } = useVerified(map(foundUsers, "username"));

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

  return (
    <Row align="bottom">
      <div
        style={{ width: 30, margin: "16px 5px 0 5px" }}
        onClick={() => setVisible(!visible)}
        onMouseOver={() => setMouseVisible(true)}
        onMouseOut={() => setMouseVisible(false)}
      >
        <Searchicon />
      </div>
      <div>
        {!(showSearch || visible) && !mouseVisible ? (
          <></>
        ) : (
          <Select
            className="search-widget"
            showSearch
            allowClear
            open={open && query.length >= 3}
            clearIcon={
              !loading ? (
                <div
                  style={{
                    position: "absolute",
                    right: -10,
                    color: "white",
                  }}
                  className="paragraph-2b"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </div>
              ) : (
                <></>
              )
            }
            value={selection || []}
            loading={loading}
            defaultActiveFirstOption
            filterOption={false}
            autoFocus
            style={{ marginTop: 12, width: "min(350px,80vw)" }}
            placeholder="Search..."
            onSearch={(v) => {
              setQuery(v);
              setOpen(true);
              setJustNavigated(false);
            }}
            onBlur={() => setSelection("")}
            onSelect={(val: string) => {
              if (justNavigated) return;

              const mode = /^[@#]/.test(val[0]) ? val[0] : "#";
              const v = val.replace(/^[@#]/, "");
              const path = mode === "#" ? `/search?tags=${v}` : `/user/${v}`;
              setQuery("");

              if (!noNavigation)
                actions.routing.historyPush({
                  location: path,
                });

              setSelection(v);
              onChange && onChange(v);

              setJustNavigated(true);
              // if(mode === "@")
            }}
            dropdownRender={(menu) => (
              <div>
                <Row
                  style={{
                    backgroundColor: "#A5A1A1",
                    padding: 10,
                  }}
                >
                  {foundUsers.length > 0 && foundTags.length > 0 ? (
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
                    <Col className={"filter-tag"}>
                      <p className="paragraph-2b">No filters available.</p>
                    </Col>
                  )}
                </Row>
                {menu}
              </div>
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
        )}
      </div>
    </Row>
  );
};
