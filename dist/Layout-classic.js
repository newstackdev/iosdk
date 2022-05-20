import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Header, Content } from "antd/lib/layout/layout";
import { Breadcrumb, Layout as AntdLayout, Menu, } from "antd";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { AuthWidget } from "./Pages/AuthWidget";
import { useActions, useAppState } from "./overmind";
import { useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { AUTH_FLOW_STATUS } from "./overmind/auth/state";
export const Layout = ({ children }) => {
    const state = useAppState();
    const actions = useActions();
    const history = useHistory();
    const match = useRouteMatch();
    useEffect(() => {
        // setTimeout(() => {
        history.listen((location) => actions.routing.onRouteChange({ location }));
        // })
    }, []);
    // useEffect(() => {
    // 	state.routing.location && history.push(state.routing.location);
    // }, [state.routing.location]);
    return (_jsxs(AntdLayout, { children: [_jsx(Header, { className: "header logo", children: _jsxs(Menu, { theme: "dark", mode: "horizontal", defaultSelectedKeys: ["2"], children: [_jsx(Menu.Item, { children: _jsx(Link, { to: "/explore", 
                                /*underlayColor="#f0f4f7"*/ className: "nav-item", children: _jsx("div", { className: `logo-image` }) }) }, "1"), _jsx(Menu.Item, { children: _jsx(Link, { to: "/payment/subscription", 
                                /*underlayColor="#f0f4f7"*/ className: "nav-item", children: _jsx("div", { children: "Subscribe" }) }) }, "0"), _jsx(Menu.Item, { children: _jsx(Link, { to: "/about", 
                                /*underlayColor="#f0f4f7"*/ className: "nav-item", children: "About" }) }, "2"), _jsx(Menu.Item, { children: _jsx(Link, { to: "/search-creative", className: "nav-item", children: "Creative Search" }) }, "3"), _jsx(Menu.Item, { children: _jsx(Link, { to: "/explore", className: "nav-item", children: "Explore" }) }, "4"), _jsx(Menu.Item, { children: _jsx(Link, { to: "/post-create", className: "nav-item", children: _jsx(PlusCircleOutlined, {}) }) }, "5"), _jsx(AuthWidget, {})] }) }, "h"), _jsx(AntdLayout, { children: _jsx(AntdLayout, { style: { padding: "0 0 24px" }, children: _jsx(Content, { className: "site-layout-background", style: {
                            padding: 24,
                            margin: "auto",
                            minHeight: 280,
                            maxWidth: "90vw",
                            minWidth: "80vw",
                        }, children: state.auth.status <
                            AUTH_FLOW_STATUS.AUTHENTICATED ? (
                        // || NONPOSTAUTHLOCATIONS.includes(state.routing.location)
                        _jsxs(_Fragment, { children: [_jsxs(Breadcrumb, { style: { margin: "16px 0" }, children: [
                                        //@ts-ignore
                                        state.routing.breadcrumbs.map((b, i, a) => (_jsx(_Fragment, { children: b.url ? (_jsx(Breadcrumb.Item, { children: b.url ? (_jsx(Link, { to: b.url, children: b.text })) : (b.text) })) : (_jsx(Breadcrumb.Item, { children: b.text })) }))), state.routing.breadcrumbs.length ? (_jsx(Breadcrumb.Item, { children: ">" })) : ("")] }), _jsx("div", { children: children })] })) : ("Checking authorization...") }, "mc") }, "m") }, "c")] }));
};
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