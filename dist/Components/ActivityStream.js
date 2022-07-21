import { jsx as _jsx } from "react/jsx-runtime";
import { List } from "antd";
import { Link } from "react-router-dom";
import { json } from "overmind";
import { useAppState } from "../overmind";
import Logo from "./Icons/Logo";
export const ActivityStream = (props) => {
    const state = useAppState();
    const _src = json(state.websockets.messages.activityStream);
    const src = props.limit ? _src.slice(0, props.limit) : _src;
    return (_jsx(List, { header: "Activity Stream", style: {
            minWidth: 300,
            background: "black",
            padding: 9,
            position: "relative",
        }, itemLayout: "horizontal", dataSource: src, className: "app-main-full-width", renderItem: (item) => {
            return (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx("span", { style: { fontSize: 42 }, children: _jsx(Logo, {}) }), title: _jsx(Link, { to: item.link, className: "paragraph-1r", children: item.title }), description: item.description, 
                    //  + " " + JSON.stringify(item.original)}
                    style: { maxWidth: props.limit ? 300 : "100%" } }) }));
        } }));
};
//# sourceMappingURL=ActivityStream.js.map