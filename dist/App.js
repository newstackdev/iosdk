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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Auth_1 = require("./Pages/Auth");
var DomainPresale_1 = require("./Pages/DomainPresale/DomainPresale");
var UserCreate_1 = require("./Pages/User/UserCreate");
var About_1 = require("./Pages/About");
var Explore_1 = require("./Pages/Explore/Explore");
var overmind_react_1 = require("overmind-react");
var overmind_1 = require("./overmind");
var Post_1 = require("./Pages/Post/Post");
var Mood_1 = require("./Pages/Mood/Mood");
var User_1 = require("./Pages/User/User");
var PostCreate_1 = require("./Pages/Post/PostCreate");
var SearchCreative_1 = __importDefault(require("./Pages/SearchCreative"));
var Product_1 = require("./Pages/Store/Product");
var UserStake_1 = require("./Pages/User/UserStake");
var MyMoods_1 = __importDefault(require("./Pages/Mood/MyMoods"));
var MoodCreate_1 = require("./Pages/Mood/MoodCreate");
var UserUpdate_1 = require("./Pages/User/UserUpdate");
var Top_1 = require("./Pages/User/Top");
var UserInvite_1 = require("./Pages/User/UserInvite");
var JoinDao_1 = require("./Pages/JoinDao");
var Creators_1 = __importDefault(require("./Components/Creators"));
var TopFolders_1 = __importDefault(require("./Components/TopFolders"));
var LegacyImport_1 = require("./Pages/User/LegacyImport");
var Spotlights_1 = __importDefault(require("./Components/Spotlights"));
var SearchCreativePost_1 = require("./Pages/SearchCreativePost");
var CommunityHistory_1 = __importDefault(require("./Pages/NewlifeDao/CommunityHistory"));
var Notifications_1 = require("./Pages/Notifications/Notifications");
var SelectMood_1 = require("./Components/SelectMood");
var layout_1 = require("antd/lib/layout/layout");
var antd_1 = require("antd");
var TOS_1 = require("./Pages/TOS");
var Privacy_1 = require("./Pages/Privacy");
var react_1 = require("react");
// history.js
var View = function (props) { return (0, jsx_runtime_1.jsx)("div", __assign({}, props, { children: props.children })); };
var Topics = function () { return (0, jsx_runtime_1.jsx)("h3", { children: "Topics" }); };
var Home = function () {
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Welcome to Newlife Web" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/login" }, { children: "Login" })), " to get in"] });
};
var UnknownHost = {
    hosts: [],
    components: {
        Root: function () { return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "UnknownHost" }); },
        Explore: function () { return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}); }
    }
};
var testDomain = window.location.host;
var HostToDomain = [
    {
        hosts: [
            "newlink.page"
        ],
        components: {
            Root: DomainPresale_1.DomainPresale,
            Explore: Top_1.UserTop
        }
    },
    {
        hosts: [
            "localhost",
            "www.newlife.io",
            "web.newlife.io",
            "web-dev.newlife.io",
            "share.newlife.io"
        ],
        components: {
            Root: DomainPresale_1.DomainPresale,
            Explore: Explore_1.Explore
        }
    },
    {
        hosts: [
            "unsid.org",
            "web-dev.unsid.org"
        ],
        components: {
            Root: DomainPresale_1.DomainPresale,
            Explore: function () { return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["You are good to go.", (0, jsx_runtime_1.jsx)("br", {}), "Use your UNSID to access the apps in the Newcoin ecosystem:", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://web.newlife.io" }, { children: "newlife.IO" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://web.newlife.io" }, { children: "newthis.IO" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://web.newlife.io" }, { children: "newthat.OI" })) })] })] }); }
        }
    }
];
// const isNewlink = /newlink.page/.test(window.location.host)
var currentHost = window.location.host.replace(/:\d+/, "");
var HostBasedComponents = ((_a = HostToDomain.find(function (htd) { return htd.hosts.find(function (h) { return h === currentHost; }); })) === null || _a === void 0 ? void 0 : _a.components) || UnknownHost.components;
// const DomainBasedExplore = //isNewlink ? UserTop : Explore;
var DEFAULT_ROUTES = [
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/auth", component: Auth_1.Auth }, "a"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/", component: HostBasedComponents.Root }, "h"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/dao/join", component: JoinDao_1.JoinDao }, "dj"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/top/creators", component: Creators_1.default }, "tc"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/top/folders", component: TopFolders_1.default }, "tf"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/top/posts", component: Creators_1.default }, "tp"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/newlink.page", component: Top_1.UserTop }, "np"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/user-create", component: UserCreate_1.UserCreate }, "c"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/my/profile", component: User_1.User }, "u"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/my/profile/update", component: UserUpdate_1.UserUpdate }, "u"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/my/profile/notifications", component: Notifications_1.Notifications }, "d"),
    // <Route key="d" exact path="/notifications" component={Notifications} />,
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/explore", component: HostBasedComponents.Explore }, "e"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/my/folders", component: MyMoods_1.default }, "mm"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/topics", component: Topics }, "t"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/about", component: About_1.About }, "b"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/post/:id", component: Post_1.Post }, "p"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/post-create", component: PostCreate_1.PostCreate }, "pc"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/mood-create", component: MoodCreate_1.MoodCreate }, "mc"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/search-creative", component: SearchCreative_1.default }, "sc"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/search-creative/vote", component: SearchCreativePost_1.SearchCreativePost }, "scv"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/mood/:moodId/:postId", component: Post_1.Post }, "mpo"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/mood/:moodId", component: Mood_1.Mood }, "mo"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/folder/:moodId/:postId", component: Post_1.Post }, "mp"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/folder/:moodId", component: Mood_1.Mood }, "m"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/user/stake/:id", component: UserStake_1.UserStake }, "us"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/user/:username", component: User_1.User }, "v"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/user/invite", component: UserInvite_1.UserInvite }, "ui"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/payment/subscription", component: Product_1.Product }, "s"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/auth/legacy", component: LegacyImport_1.LegacyImport }, "ue"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/spotlights", component: Spotlights_1.default }, "sp"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/save-folder", component: SelectMood_1.SelectMoodForm }, "sa"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/terms_of_service", component: TOS_1.TOS }, "sa"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/privacy_policy", component: Privacy_1.Privacy }, "sa"),
    (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/newlife-dao", component: CommunityHistory_1.default }, "ds")
];
/* <Route key="sp" exact path="/dao/proposal/:id" component={DaoProposal} /> */
// const HelloIO: NLView = () => <>Hello IO!</>
// const helloRoute = <Route key="hello" exact path="/hello" component={HelloIO} />;
var AppShell = function (_a) {
    var children = _a.children;
    var state = (0, overmind_1.useAppState)();
    var history = (0, react_router_dom_1.useHistory)();
    var actions = (0, overmind_1.useActions)();
    (0, react_1.useEffect)(function () {
        // setTimeout(() => {
        var cancel = history.listen(function (location) {
            return actions.routing.onRouteChange({ location: location });
        });
        actions.routing.onRouteChange({ location: window.location });
        actions.routing.setHistory({ history: history });
        // })
        return cancel;
    }, []);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(layout_1.Header, __assign({ className: "logo", style: { padding: 0 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, __assign({ justify: "space-around", gutter: 0 }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "header", style: { width: "100%", padding: "0 20px" } }, { children: (0, jsx_runtime_1.jsx)(state.config.components.layout.TopMenu, {}) })) })) }), "h"), (0, jsx_runtime_1.jsx)("div", __assign({ className: "App app-layout-wrapper" }, { children: (0, jsx_runtime_1.jsx)(state.config.components.layout.Layout, { children: children }) }))] });
};
var overmindSampleCustomConfig = {
    components: {
        icons: {
            Logo: function () { return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "THIS IS THE LOGO DUDE" }); }
        },
        layout: {
            TopMenu: function () { return (0, jsx_runtime_1.jsx)("div", { children: "Custom top menu!" }); },
            Layout: function () { return (0, jsx_runtime_1.jsx)("div", { children: "Custom layout" }); }
        }
    }
};
var App = function (_a) {
    var cfg = _a.config, children = _a.children, custom = _a.custom;
    return ((0, jsx_runtime_1.jsx)(overmind_react_1.Provider, __assign({ value: (0, overmind_1.overmind)(cfg) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(AppShell, { children: [DEFAULT_ROUTES, (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children || [] })] }) }) })));
};
exports.App = App;
exports.default = exports.App;
//# sourceMappingURL=App.js.map