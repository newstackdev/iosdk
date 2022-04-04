"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const layout_1 = require("antd/lib/layout/layout");
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
const AuthWidget_1 = require("./Pages/AuthWidget");
const overmind_1 = require("./overmind");
const react_1 = require("react");
const icons_1 = require("@ant-design/icons");
const state_1 = require("./overmind/auth/state");
const Layout = ({ children }) => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const history = (0, react_router_dom_1.useHistory)();
    const match = (0, react_router_dom_1.useRouteMatch)();
    (0, react_1.useEffect)(() => {
        // setTimeout(() => {
        history.listen((location) => actions.routing.onRouteChange({ location }));
        // })
    }, []);
    // useEffect(() => {
    // 	state.routing.location && history.push(state.routing.location);
    // }, [state.routing.location]);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Layout, { children: [(0, jsx_runtime_1.jsx)(layout_1.Header, { className: "header logo", children: (0, jsx_runtime_1.jsxs)(antd_1.Menu, { theme: "dark", mode: "horizontal", defaultSelectedKeys: ["2"], children: [(0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/explore", 
                                /*underlayColor="#f0f4f7"*/ className: "nav-item", children: (0, jsx_runtime_1.jsx)("div", { className: `logo-image` }) }) }, "1"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/payment/subscription", 
                                /*underlayColor="#f0f4f7"*/ className: "nav-item", children: (0, jsx_runtime_1.jsx)("div", { children: "Subscribe" }) }) }, "0"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/about", 
                                /*underlayColor="#f0f4f7"*/ className: "nav-item", children: "About" }) }, "2"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/search-creative", className: "nav-item", children: "Creative Search" }) }, "3"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/explore", className: "nav-item", children: "Explore" }) }, "4"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/post-create", className: "nav-item", children: (0, jsx_runtime_1.jsx)(icons_1.PlusCircleOutlined, {}) }) }, "5"), (0, jsx_runtime_1.jsx)(AuthWidget_1.AuthWidget, {})] }) }, "h"), (0, jsx_runtime_1.jsx)(antd_1.Layout, { children: (0, jsx_runtime_1.jsx)(antd_1.Layout, { style: { padding: "0 0 24px" }, children: (0, jsx_runtime_1.jsx)(layout_1.Content, { className: "site-layout-background", style: {
                            padding: 24,
                            margin: "auto",
                            minHeight: 280,
                            maxWidth: "90vw",
                            minWidth: "80vw",
                        }, children: state.auth.status <
                            state_1.AUTH_FLOW_STATUS.AUTHENTICATED ? (
                        // || NONPOSTAUTHLOCATIONS.includes(state.routing.location)
                        (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Breadcrumb, { style: { margin: "16px 0" }, children: [
                                        //@ts-ignore
                                        state.routing.breadcrumbs.map((b, i, a) => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: b.url ? ((0, jsx_runtime_1.jsx)(antd_1.Breadcrumb.Item, { children: b.url ? ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: b.url, children: b.text })) : (b.text) })) : ((0, jsx_runtime_1.jsx)(antd_1.Breadcrumb.Item, { children: b.text })) }))), state.routing.breadcrumbs.length ? ((0, jsx_runtime_1.jsx)(antd_1.Breadcrumb.Item, { children: ">" })) : ("")] }), (0, jsx_runtime_1.jsx)("div", { children: children })] })) : ("Checking authorization...") }, "mc") }, "m") }, "c")] }));
};
exports.Layout = Layout;
{ /* <Sider width={200} style={{ position: 'absolute' }} defaultCollapsed={true} collapsible={true} className="site-layout-background">
<Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    style={{ height: '100%', borderRight: 0 }}
    >
    <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
        <Menu.Item key="1">why</Menu.Item>
        <Menu.Item key="2">what</Menu.Item>
        <Menu.Item key="3">who</Menu.Item>
    </SubMenu>
    <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
        <Menu.Item key="5">option5</Menu.Item>
        <Menu.Item key="6">option6</Menu.Item>
        <Menu.Item key="7">option7</Menu.Item>
        <Menu.Item key="8">option8</Menu.Item>
    </SubMenu>
    <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
        <Menu.Item key="9">option9</Menu.Item>
        <Menu.Item key="10">option10</Menu.Item>
        <Menu.Item key="11">option11</Menu.Item>
        <Menu.Item key="12">option12</Menu.Item>
    </SubMenu>
    </Menu>
</Sider> */
}
//# sourceMappingURL=Layout-classic.js.map