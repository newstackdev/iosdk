import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Col, Row, Select } from "antd";
import { ContentImage } from "../../Components/Image";
import { Searchicon } from "../../Components/Icons/Searchicon";
import { Tag } from "antd-latest";
import { UsersList } from "../../Components/UserWidget";
import { VerifiedIcon } from "../..//Components/Icons/VerifiedIcon";
import { json } from "overmind";
import { map, uniqBy } from "lodash";
import { useActions, useAppState } from "../../overmind";
import { useEffect, useState } from "react";
import { useVerified } from "../../hooks/useVerified";
export const UserSearchResultsWidget = ({ query }) => {
    const state = useAppState();
    const actions = useActions();
    const res = state.lists.search.users.results;
    useEffect(() => {
        actions.lists.searchUsers({ query });
    }, [query]);
    return (_jsx(Select.Option, { className: "nl-white-box app-box-shadow paragraph-1r user-search-results-widget", children: res && res?.value?.length ? (_jsx(UsersList, { users: res.value, powerUp: false })) : res && !res?.value?.length ? ("No results") : ("") }));
};
export const TagsAutosuggestWidget = ({ query }) => {
    const state = useAppState();
    const actions = useActions();
    const res = uniqBy(json(state.lists.search.tags.results)?.value || [], (t) => t.tag);
    useEffect(() => {
        actions.lists.searchTags({ query });
    }, [query]);
    return (_jsx("div", { style: {
            padding: 24,
            maxWidth: 700,
            marginTop: 5,
            marginLeft: 150,
        }, className: "nl-white-box app-box-shadow paragraph-1r user-search-results-widget", children: res.length
            ? res.map((t) => (_jsx("div", { style: { width: "100%", cursor: "pointer" }, onClick: () => actions.routing.historyPush({
                    location: `/search?tags=${t.tag}`,
                }), children: t.tag }, t.tag)))
            : res && !res?.length
                ? "No results"
                : "" }));
};
const SearchResultsByMode = {
    "@": UserSearchResultsWidget,
    "#": TagsAutosuggestWidget,
};
export const SearchWidget = ({ user, searchUsers, searchTags, noNavigation, onChange, showSearch, setSelection, selection }) => {
    const state = useAppState();
    const actions = useActions();
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(false);
    const [mouseVisible, setMouseVisible] = useState(false);
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filterState, setFilterState] = useState(undefined);
    const foundUsers = state.lists.search.users?.results?.value || [];
    const foundTags = Array.from(new Set((state.lists.search.tags?.results?.value || []).map((t) => t.tag))) || [];
    const { verifiedUsers } = useVerified(map(foundUsers, "username"));
    const [currVal, setCurrVal] = useState("");
    useEffect(() => {
        const searchForResults = async () => {
            if (query.length < 3)
                return;
            setLoading(true);
            const queryUsers = searchUsers && actions.lists.searchUsers({ query });
            const queryTags = searchTags && actions.lists.searchTags({ query });
            await Promise.all([queryUsers, queryTags]);
            setLoading(false);
        };
        searchForResults();
    }, [query]);
    const _setSelection = (v = "") => {
        setSelection && setSelection(v);
        onChange && onChange(v);
        setCurrVal(v);
    };
    const setInitialState = () => {
        setQuery("");
        // _setSelection && _setSelection("");
    };
    const onSearch = (query) => {
        setQuery(query);
        setOpen(true);
    };
    const onSelect = (value) => {
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
        return (_jsx(Tag, { color: value, onMouseDown: onPreventMouseDown, closable: closable, onClose: () => {
                _setSelection();
                onClose();
            }, children: label }));
    };
    return (_jsxs(Row, { align: "bottom", style: { width: "100%", height: "48px" }, onMouseOut: () => setMouseVisible(false), onMouseOver: () => setMouseVisible(true), onFocus: () => setVisible(true), onBlur: () => setVisible(false), children: [_jsx("div", { style: { width: 30, margin: "16px 5px 0 5px" }, onClick: () => setVisible(!visible), children: _jsx(Searchicon, {}) }), _jsx("div", { style: { width: 300, height: "100%" }, children: mouseVisible || visible ? (_jsxs(Select, { className: "search-widget", mode: noNavigation ? "multiple" : undefined, allowClear: true, showSearch: true, clearIcon: !loading ? (_jsx("div", { style: {
                            position: "absolute",
                            right: -10,
                            color: "white",
                        }, className: "paragraph-2b", onClick: () => setInitialState(), children: "Cancel" })) : (_jsx(_Fragment, {})), 
                    // value={selection ? undefined : []}
                    // tagRender={tagRender}
                    searchValue: query, loading: loading, open: open, style: { marginTop: 12, width: "min(350px,80vw)" }, placeholder: "Search...", onSearch: (query) => onSearch(query), onBlur: () => setInitialState(), onSelect: (value) => onSelect(value), 
                    // onDeselect={onDeselect}
                    dropdownRender: (menu) => (_jsxs(_Fragment, { children: [_jsx(Row, { style: {
                                    backgroundColor: "#A5A1A1",
                                    padding: 10,
                                }, children: foundUsers.length > 0 && foundTags.length > 0 && searchTags && searchUsers ? (_jsxs(_Fragment, { children: [_jsx(Col, { className: filterState === "Member" ? "filter-tag filter-tag__active" : "filter-tag", onClick: () => {
                                                setFilterState("Member");
                                                setVisible(true);
                                            }, children: _jsx("p", { className: "paragraph-2b", children: "Member" }) }), _jsx(Col, { className: filterState === "Tag" ? "filter-tag filter-tag__active" : "filter-tag", onClick: () => {
                                                setFilterState("Tag");
                                                setVisible(true);
                                            }, children: _jsx("p", { className: "paragraph-2b", children: "Hashtag" }) })] })) : (_jsx(_Fragment, {})) }), menu] })), children: [foundUsers?.map((u) => {
                            const isUserVerified = verifiedUsers && u.username && verifiedUsers.includes(u.username);
                            if (filterState === "Tag")
                                return;
                            return (_jsx(Select.Option, { value: `@${u.username}`, children: _jsxs(Row, { gutter: 18, className: "app-main-full-width-only", wrap: true, style: { alignItems: "center" }, children: [_jsx(Col, { children: _jsx(Avatar, { src: _jsx(ContentImage, { ...u }) }) }), _jsxs(Col, { children: [_jsx("p", { className: "paragraph-2b", children: u.username }), isUserVerified && _jsx(VerifiedIcon, {})] })] }) }));
                        }), foundTags.map((t) => {
                            if (filterState === "Member")
                                return;
                            return (_jsx(Select.Option, { value: `#${t}`, children: _jsxs(Row, { align: "middle", gutter: 18, className: "app-main-full-width-only", justify: "start", wrap: true, children: [_jsx(Col, { span: 5, children: _jsx(Avatar, { src: _jsx("div", { style: {
                                                        background: "lightgrey",
                                                        color: "grey",
                                                        paddingTop: 10,
                                                        paddingBottom: 10,
                                                    }, children: "#" }) }) }), _jsx(Col, { span: 13, children: _jsx("p", { className: "paragraph-2b", children: t }) }), _jsx(Col, { span: 6 })] }) }));
                        })] })) : (_jsx("div", { style: { width: "auto", height: "100%" }, children: "\u00A0" })) })] }));
};
//# sourceMappingURL=SearchWidget.js.map