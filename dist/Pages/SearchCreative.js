"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchCreative = exports.useCreativeSearchQuery = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const Spin_1 = require("../Components/Spin");
const react_1 = __importStar(require("react"));
const overmind_1 = require("../overmind");
const react_router_dom_1 = require("react-router-dom");
const SearchItemWidget_1 = require("../Components/SearchItemWidget");
const ItemGrid_1 = require("../Components/ItemGrid");
// TODO: Maybe move to utils or something
function useQuery() {
    const { search } = (0, react_router_dom_1.useLocation)();
    return react_1.default.useMemo(() => new URLSearchParams(search), [search]);
}
const useCreativeSearchQuery = () => {
    const query = useQuery();
    const tags = query.get("tags") ?? "";
    const index = Number(query.get("index") ?? 0);
    const aesthetics = query.get("aesthetics") ?? "";
    return { tags, aesthetics, index };
};
exports.useCreativeSearchQuery = useCreativeSearchQuery;
const SearchCreative = () => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const { tags, aesthetics } = (0, exports.useCreativeSearchQuery)();
    (0, react_1.useEffect)(() => {
        actions.routing.setBreadcrumbs([{ text: "Creative Search" }]);
        actions.lists.creativeSearch({ tags, aesthetics });
    }, []);
    const search = (tags, aesthetics) => {
        if (tags === "") {
            return;
        }
        if (aesthetics === "") {
            actions.routing.historyPush({
                location: `/search-creative?tags=${tags}`,
            });
        }
        else {
            actions.routing.historyPush({
                location: `/search-creative?tags=${tags}&aesthetics=${aesthetics}`,
            });
        }
        actions.lists.creativeSearch({ tags, aesthetics });
    };
    const maybeLoadMore = () => {
        actions.lists.creativeSearch({ tags, aesthetics });
    };
    const [form] = antd_1.Form.useForm();
    (0, react_1.useEffect)(() => {
        form.setFieldsValue({ q: state.lists.creativeSearch.lastQueried.tags });
    }, [state.lists.creativeSearch.lastQueried]);
    const lastQueried = state.lists.creativeSearch.lastQueried;
    const items = state.lists.creativeSearch.results.items;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { marginBottom: 40 }, children: (0, jsx_runtime_1.jsx)(antd_1.Form, { form: form, style: { width: "100%" }, name: "basic", initialValues: { q: lastQueried || "fashion" }, onFinish: (e) => {
                        search(e.q, "");
                    }, autoComplete: "off", children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { align: "middle", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { md: 12, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "", name: "q", rules: [
                                        {
                                            required: true,
                                            message: "Enter something unique to search for",
                                        },
                                    ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { style: {
                                            fontSize: "clamp(20px, 120px, 9.8vw)",
                                            textAlign: "center",
                                        } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { sm: 3, lg: 3 }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { lg: 9, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "aestetics" }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: {}, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", htmlType: "submit", size: "large", children: "Submit" }) })] })] }) }) }), (0, jsx_runtime_1.jsx)("div", { style: {
                    marginBottom: 40,
                    maxWidth: "100vw",
                    overflow: "auto",
                    scrollbarWidth: "thin",
                }, children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: state.lists.creativeSearch.tags.items.map((aesthetic) => ((0, jsx_runtime_1.jsx)(antd_1.Tag, { onClick: () => search(tags, aesthetic), style: { cursor: "pointer" }, children: aesthetic }))) }) }), (0, jsx_runtime_1.jsx)(ItemGrid_1.ItemGrid, { items: items, render: (m, index) => (0, jsx_runtime_1.jsx)(SearchItemWidget_1.SearchItemWidget, { item: m, index: index }), loadMore: maybeLoadMore }), state.indicators.isWorking ? ((0, jsx_runtime_1.jsx)(Spin_1.Spin, {})) : !items.length && lastQueried ? ((0, jsx_runtime_1.jsx)(antd_1.List, { size: "large", dataSource: [], loading: state.indicators.isWorking, locale: {
                    emptyText: lastQueried.tags === ""
                        ? "Search something!"
                        : `No results for '${lastQueried.tags}'`,
                } })) : ("")] }));
};
exports.SearchCreative = SearchCreative;
exports.default = exports.SearchCreative;
//# sourceMappingURL=SearchCreative.js.map