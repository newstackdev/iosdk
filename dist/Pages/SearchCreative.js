import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Col, Form, Input, Row, Space, Tag, List, } from "antd";
import { Spin } from "../Components/Spin";
import React, { useEffect } from "react";
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
    const index = Number(query.get("index") ?? 0);
    const aesthetics = query.get("aesthetics") ?? "";
    return { tags, aesthetics, index };
};
export const SearchCreative = () => {
    const state = useAppState();
    const actions = useActions();
    const { tags, aesthetics } = useCreativeSearchQuery();
    useEffect(() => {
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
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ q: state.lists.creativeSearch.lastQueried.tags });
    }, [state.lists.creativeSearch.lastQueried]);
    const lastQueried = state.lists.creativeSearch.lastQueried;
    const items = state.lists.creativeSearch.results.items;
    return (_jsxs("div", { children: [_jsx("div", { style: { marginBottom: 40 }, children: _jsx(Form, { form: form, style: { width: "100%" }, name: "basic", initialValues: { q: lastQueried || "fashion" }, onFinish: (e) => {
                        search(e.q, "");
                    }, autoComplete: "off", children: _jsxs(Row, { align: "middle", children: [_jsx(Col, { md: 12, children: _jsx(Form.Item, { label: "", name: "q", rules: [
                                        {
                                            required: true,
                                            message: "Enter something unique to search for",
                                        },
                                    ], children: _jsx(Input, { style: {
                                            fontSize: "clamp(20px, 120px, 9.8vw)",
                                            textAlign: "center",
                                        } }) }) }), _jsx(Col, { sm: 3, lg: 3 }), _jsxs(Col, { lg: 9, children: [_jsx(Form.Item, { name: "aestetics" }), _jsx(Form.Item, { wrapperCol: {}, children: _jsx(Button, { type: "primary", htmlType: "submit", size: "large", children: "Submit" }) })] })] }) }) }), _jsx("div", { style: {
                    marginBottom: 40,
                    maxWidth: "100vw",
                    overflow: "auto",
                    scrollbarWidth: "thin",
                }, children: _jsx(Space, { children: state.lists.creativeSearch.tags.items.map((aesthetic) => (_jsx(Tag, { onClick: () => search(tags, aesthetic), style: { cursor: "pointer" }, children: aesthetic }))) }) }), _jsx(ItemGrid, { items: items, render: (m, index) => _jsx(SearchItemWidget, { item: m, index: index }), loadMore: maybeLoadMore }), state.indicators.isWorking ? (_jsx(Spin, {})) : !items.length && lastQueried ? (_jsx(List, { size: "large", dataSource: [], loading: state.indicators.isWorking, locale: {
                    emptyText: lastQueried.tags === ""
                        ? "Search something!"
                        : `No results for '${lastQueried.tags}'`,
                } })) : ("")] }));
};
export default SearchCreative;
//# sourceMappingURL=SearchCreative.js.map