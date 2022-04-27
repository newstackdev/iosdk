"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchWidget = exports.SearchResultsWidget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_1 = require("react");
const react_outside_click_handler_1 = __importDefault(require("react-outside-click-handler"));
const overmind_1 = require("../../overmind");
const UserWidget_1 = require("../../Components/UserWidget");
const Searchicon_1 = require("../../Components/Icons/Searchicon");
const SearchResultsWidget = ({ query }) => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const res = state.lists.search.users.results;
    (0, react_1.useEffect)(() => {
        actions.lists.searchUsers({ query });
    }, [query]);
    return ((0, jsx_runtime_1.jsx)("ul", { style: { padding: 24, maxWidth: 700, marginTop: 5, marginLeft: 150 }, className: "nl-white-box app-box-shadow paragraph-1r user-search-results-widget", children: res && res?.value?.length ? ((0, jsx_runtime_1.jsx)(UserWidget_1.UsersList, { users: res.value, powerUp: false })) : res && !res?.value?.length ? ("No results") : ("") }));
};
exports.SearchResultsWidget = SearchResultsWidget;
const SearchWidget = ({ user, search, setSearch }) => {
    const [query, setQuery] = (0, react_1.useState)("");
    const [resultsVisible, setResultsVisible] = (0, react_1.useState)(false);
    const actions = (0, overmind_1.useActions)();
    (0, react_1.useEffect)(() => {
        setResultsVisible(!!query);
    }, [query]);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { style: {
            height: "100%",
            alignItems: "center",
            width: "100%",
        }, children: [(0, jsx_runtime_1.jsx)("div", { onClick: () => setSearch(!search), children: (0, jsx_runtime_1.jsx)(Searchicon_1.Searchicon, {}) }), (0, jsx_runtime_1.jsx)("div", { style: { flex: "1" }, children: (0, jsx_runtime_1.jsx)(react_outside_click_handler_1.default, { onOutsideClick: () => {
                        setResultsVisible(false);
                    }, children: (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 20, className: "app-main-full-width-only", children: search && ((0, jsx_runtime_1.jsx)(antd_1.Dropdown, { visible: resultsVisible, placement: "bottomCenter", overlay: (0, jsx_runtime_1.jsx)(exports.SearchResultsWidget, { query: query }), children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "app-main-full-width-only search-row", children: [(0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "Search", onChange: (e) => {
                                            if (e.target.value == "#") {
                                                actions.routing.historyPush({ location: "/search" });
                                                setSearch(false);
                                            }
                                            else
                                                setQuery(e.target.value);
                                        }, style: query === ""
                                            ? {
                                                opacity: "80%",
                                                width: "100%",
                                            }
                                            : {
                                                opacity: "100%",
                                                width: "100%",
                                            }, value: query }), search && ((0, jsx_runtime_1.jsx)("div", { onClick: () => setSearch(false), style: {
                                            position: "absolute",
                                            right: 0,
                                            color: "white",
                                            top: "20px",
                                            fontSize: "15px",
                                        }, children: "Cancel" }))] }) })) }) }) })] }));
};
exports.SearchWidget = SearchWidget;
//# sourceMappingURL=SearchWidget.js.map