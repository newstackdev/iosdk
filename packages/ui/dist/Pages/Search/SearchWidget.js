"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.SearchWidget = exports.SearchResultsWidget = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var react_outside_click_handler_1 = __importDefault(require("react-outside-click-handler"));
var UserWidget_1 = require("../../Components/UserWidget");
var Searchicon_1 = require("../../Components/Icons/Searchicon");
var state_1 = require("@newcoin-foundation/state");
var SearchResultsWidget = function (_a) {
    var _b, _c;
    var query = _a.query;
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var res = state.lists.search.users.results;
    (0, react_1.useEffect)(function () {
        actions.lists.searchUsers({ query: query });
    }, [query]);
    return ((0, jsx_runtime_1.jsx)("ul", __assign({ style: { padding: 24 }, className: "nl-white-box app-box-shadow paragraph-1r" }, { children: res && ((_b = res === null || res === void 0 ? void 0 : res.value) === null || _b === void 0 ? void 0 : _b.length) ? ((0, jsx_runtime_1.jsx)(UserWidget_1.UsersList, { users: res.value, powerUp: false })) : res && !((_c = res === null || res === void 0 ? void 0 : res.value) === null || _c === void 0 ? void 0 : _c.length) ? ("No results") : ("") })));
};
exports.SearchResultsWidget = SearchResultsWidget;
var SearchWidget = function (_a) {
    var user = _a.user, search = _a.search, setSearch = _a.setSearch;
    var _b = (0, react_1.useState)(""), query = _b[0], setQuery = _b[1];
    var _c = (0, react_1.useState)(false), resultsVisible = _c[0], setResultsVisible = _c[1];
    (0, react_1.useEffect)(function () {
        setResultsVisible(!!query);
    }, [query]);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: {
            height: "100%",
            alignItems: "center",
            width: "100%"
        } }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ onClick: function () { return setSearch(!search); } }, { children: (0, jsx_runtime_1.jsx)(Searchicon_1.Searchicon, {}) })), (0, jsx_runtime_1.jsx)("div", __assign({ style: { flex: "1" } }, { children: (0, jsx_runtime_1.jsx)(react_outside_click_handler_1["default"], __assign({ onOutsideClick: function () {
                        setResultsVisible(false);
                    } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 20, className: "app-main-full-width-only" }, { children: search && ((0, jsx_runtime_1.jsx)(antd_1.Dropdown, __assign({ visible: resultsVisible, placement: "topCenter", overlay: (0, jsx_runtime_1.jsx)(exports.SearchResultsWidget, { query: query }), 
                            //@ts-ignore
                            getPopupContainer: function () {
                                return document.getElementById("search-dropdown-position");
                            } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ className: "app-main-full-width-only search-row" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "Search", onChange: function (e) { return setQuery(e.target.value); }, style: query === "" ? { opacity: "80%" } : { opacity: "100%" }, value: query }), query !== "" && ((0, jsx_runtime_1.jsx)("div", __assign({ onClick: function () { return setQuery(""); }, style: {
                                            position: "absolute",
                                            right: 0,
                                            color: "white",
                                            top: "20px",
                                            fontSize: "15px"
                                        } }, { children: "Cancel" })))] })) }))) })) })) }))] })));
};
exports.SearchWidget = SearchWidget;
