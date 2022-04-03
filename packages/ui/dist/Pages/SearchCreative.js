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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.SearchCreative = exports.useCreativeSearchQuery = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var Spin_1 = require("../Components/Spin");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var SearchItemWidget_1 = require("../Components/SearchItemWidget");
var ItemGrid_1 = require("../Components/ItemGrid");
var state_1 = require("@newcoin-foundation/state");
// TODO: Maybe move to utils or something
function useQuery() {
    var search = (0, react_router_dom_1.useLocation)().search;
    return react_1["default"].useMemo(function () { return new URLSearchParams(search); }, [search]);
}
var useCreativeSearchQuery = function () {
    var _a, _b, _c;
    var query = useQuery();
    var tags = (_a = query.get("tags")) !== null && _a !== void 0 ? _a : "";
    var index = Number((_b = query.get("index")) !== null && _b !== void 0 ? _b : 0);
    var aesthetics = (_c = query.get("aesthetics")) !== null && _c !== void 0 ? _c : "";
    return { tags: tags, aesthetics: aesthetics, index: index };
};
exports.useCreativeSearchQuery = useCreativeSearchQuery;
var SearchCreative = function () {
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var _a = (0, exports.useCreativeSearchQuery)(), tags = _a.tags, aesthetics = _a.aesthetics;
    (0, react_1.useEffect)(function () {
        actions.routing.setBreadcrumbs([{ text: "Creative Search" }]);
        actions.lists.creativeSearch({ tags: tags, aesthetics: aesthetics });
    }, []);
    var search = function (tags, aesthetics) {
        if (tags === "") {
            return;
        }
        if (aesthetics === "") {
            actions.routing.historyPush({
                location: "/search-creative?tags=".concat(tags)
            });
        }
        else {
            actions.routing.historyPush({
                location: "/search-creative?tags=".concat(tags, "&aesthetics=").concat(aesthetics)
            });
        }
        actions.lists.creativeSearch({ tags: tags, aesthetics: aesthetics });
    };
    var maybeLoadMore = function () {
        actions.lists.creativeSearch({ tags: tags, aesthetics: aesthetics });
    };
    var form = antd_1.Form.useForm()[0];
    (0, react_1.useEffect)(function () {
        form.setFieldsValue({ q: state.lists.creativeSearch.lastQueried.tags });
    }, [state.lists.creativeSearch.lastQueried]);
    var lastQueried = state.lists.creativeSearch.lastQueried;
    var items = state.lists.creativeSearch.results.items;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", __assign({ style: { marginBottom: 40 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, __assign({ form: form, style: { width: "100%" }, name: "basic", initialValues: { q: lastQueried || "fashion" }, onFinish: function (e) {
                        search(e.q, "");
                    }, autoComplete: "off" }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ align: "middle" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ md: 12 }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ label: "", name: "q", rules: [
                                        {
                                            required: true,
                                            message: "Enter something unique to search for"
                                        },
                                    ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { style: {
                                            fontSize: "clamp(20px, 120px, 9.8vw)",
                                            textAlign: "center"
                                        } }) })) })), (0, jsx_runtime_1.jsx)(antd_1.Col, { md: 3 }), (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ md: 3 }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "aestetics" }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ wrapperCol: {} }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ type: "primary", htmlType: "submit", size: "large" }, { children: "Submit" })) }))] }))] })) })) })), (0, jsx_runtime_1.jsx)("div", __assign({ style: {
                    marginBottom: 40,
                    maxWidth: "100vw",
                    overflow: "auto",
                    scrollbarWidth: "thin"
                } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: state.lists.creativeSearch.tags.items.map(function (aesthetic) { return ((0, jsx_runtime_1.jsx)(antd_1.Tag, __assign({ onClick: function () { return search(tags, aesthetic); }, style: { cursor: "pointer" } }, { children: aesthetic }))); }) }) })), (0, jsx_runtime_1.jsx)(ItemGrid_1.ItemGrid, { items: items, render: function (m, index) { return (0, jsx_runtime_1.jsx)(SearchItemWidget_1.SearchItemWidget, { item: m, index: index }); }, loadMore: maybeLoadMore }), state.indicators.isWorking ? ((0, jsx_runtime_1.jsx)(Spin_1.Spin, {})) : !items.length && lastQueried ? ((0, jsx_runtime_1.jsx)(antd_1.List, { size: "large", dataSource: [], loading: state.indicators.isWorking, locale: {
                    emptyText: lastQueried.tags === ""
                        ? "Search something!"
                        : "No results for '".concat(lastQueried.tags, "'")
                } })) : ("")] }));
};
exports.SearchCreative = SearchCreative;
exports["default"] = exports.SearchCreative;
