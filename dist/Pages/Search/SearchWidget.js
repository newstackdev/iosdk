import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Dropdown, Input, Row } from "antd";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useActions, useAppState } from "../../overmind";
import { UsersList } from "../../Components/UserWidget";
import { Searchicon } from "../../Components/Icons/Searchicon";
import { json } from "overmind";
import { uniqBy } from "lodash";
export const UserSearchResultsWidget = ({ query }) => {
    const state = useAppState();
    const actions = useActions();
    const res = state.lists.search.users.results;
    useEffect(() => {
        actions.lists.searchUsers({ query });
    }, [query]);
    return (_jsx("ul", { style: { padding: 24, maxWidth: 700, marginTop: 5, marginLeft: 150 }, className: "nl-white-box app-box-shadow paragraph-1r user-search-results-widget", children: res && res?.value?.length ? (_jsx(UsersList, { users: res.value, powerUp: false })) : res && !res?.value?.length ? ("No results") : ("") }));
};
export const TagsAutosuggestWidget = ({ query }) => {
    const state = useAppState();
    const actions = useActions();
    const res = uniqBy(json(state.lists.search.tags.results)?.value || [], t => t.tag);
    useEffect(() => {
        actions.lists.searchTags({ query });
    }, [query]);
    return (_jsx("div", { style: { padding: 24, maxWidth: 700, marginTop: 5, marginLeft: 150 }, className: "nl-white-box app-box-shadow paragraph-1r user-search-results-widget", children: res.length ? (res.map(t => _jsx("div", { style: { width: "100%", cursor: "pointer" }, onClick: () => actions.routing.historyPush({ location: `/search?tags=${t.tag}` }), children: t.tag }, t.tag))) : res && !res?.length ? ("No results") : ("") }));
};
const SearchResultsByMode = {
    "@": UserSearchResultsWidget,
    "#": TagsAutosuggestWidget
};
export const SearchWidget = ({ user }) => {
    const state = useAppState();
    const [query, setQuery] = useState("");
    const [mode, setMode] = useState("#");
    const [resultsVisible, setResultsVisible] = useState(false);
    const [SearchResultsWidget, setSearchResultsWidget] = useState({ component: TagsAutosuggestWidget });
    const actions = useActions();
    const currQuery = mode == "#" ? state.lists.search.posts.query : state.lists.search.users.query;
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
    }, [currQuery]);
    return (_jsxs(Row, { style: {
            height: "100%",
            alignItems: "center",
            width: "100%",
        }, children: [_jsx("div", { onClick: () => setSearch(!search), children: _jsx(Searchicon, {}) }), _jsx("div", { style: { flex: "1" }, children: _jsx(OutsideClickHandler, { onOutsideClick: () => {
                        setResultsVisible(false);
                    }, children: _jsx(Col, { span: 20, className: "app-main-full-width-only", children: search && (_jsx(Dropdown, { visible: resultsVisible, placement: "bottomCenter", overlay: _jsx(SearchResultsWidget.component, { query: query || "" }), children: _jsx(Row, { className: "app-main-full-width-only search-row", children: _jsx(Input, { prefix: mode || "", placeholder: "Search", onPressEnter: () => {
                                        const q = query;
                                        // setQuery("");
                                        // actions.lists.searchPosts({ tags: q, force: true });
                                        if (mode == "#") {
                                            setTimeout(() => actions.routing.historyPush({ location: `/search?tags=${q}` }), 100);
                                            setResultsVisible(false);
                                        }
                                    }, suffix: search && (_jsx("div", { onClick: () => setSearch(false), style: {
                                            position: "absolute",
                                            right: 0,
                                            color: "white",
                                            // top: "20px",
                                            fontSize: "15px",
                                        }, children: "Cancel" })), onFocus: () => setResultsVisible(true), onChange: (e) => {
                                        setQuery(e.target.value);
                                        setResultsVisible(!!e.target.value);
                                    }, style: query === ""
                                        ? {
                                            opacity: "80%",
                                            width: "100%",
                                        }
                                        : {
                                            opacity: "100%",
                                            width: "100%",
                                        }, value: query }) }) })) }) }) })] }));
};
//# sourceMappingURL=SearchWidget.js.map