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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ROUTES = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const DomainPresale_1 = require("./Pages/DomainPresale/DomainPresale");
const react_router_dom_1 = require("react-router-dom");
const Creators_1 = __importStar(require("./Components/Creators"));
const Notifications_1 = __importDefault(require("./Components/Icons/Notifications"));
const SelectMood_1 = require("./Components/SelectMood");
const Spotlights_1 = __importDefault(require("./Components/Spotlights"));
const TopFolders_1 = __importDefault(require("./Components/TopFolders"));
const UserWidget_1 = require("./Components/UserWidget");
const About_1 = require("./Pages/About");
const JoinDao_1 = require("./Pages/JoinDao");
const Mood_1 = require("./Pages/Mood/Mood");
const MoodCreate_1 = require("./Pages/Mood/MoodCreate");
const MyMoods_1 = __importDefault(require("./Pages/Mood/MyMoods"));
const CommunityHistory_1 = __importDefault(require("./Pages/NewlifeDao/CommunityHistory"));
const Post_1 = require("./Pages/Post/Post");
const PostCreate_1 = require("./Pages/Post/PostCreate");
const Privacy_1 = require("./Pages/Privacy");
const SearchCreative_1 = __importDefault(require("./Pages/SearchCreative"));
const SearchCreativePost_1 = require("./Pages/SearchCreativePost");
const Product_1 = require("./Pages/Store/Product");
const TOS_1 = require("./Pages/TOS");
const LegacyImport_1 = require("./Pages/User/LegacyImport");
const Top_1 = __importDefault(require("./Pages/User/Top"));
const User_1 = require("./Pages/User/User");
const UserCreate_1 = require("./Pages/User/UserCreate");
const UserInvite_1 = require("./Pages/User/UserInvite");
const UserUpdate_1 = require("./Pages/User/UserUpdate");
const Explore_1 = __importDefault(require("./Pages/Explore/Explore"));
const overmind_1 = require("./overmind");
const Auth_1 = require("./Pages/Auth/Auth");
const TagSearch_1 = __importDefault(require("./Pages/Tag/TagSearch"));
const UnknownHost = {
    hosts: [],
    components: {
        Root: () => (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "UnknownHost" }),
        Explore: () => (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})
    }
};
const testDomain = window.location.host;
const HostToDomain = [
    {
        hosts: [
            "newlink.page"
        ],
        components: {
            Root: DomainPresale_1.DomainPresale,
            Explore: Top_1.default
        }
    },
    {
        hosts: [
            "localhost",
            "www.newlife.io",
            "web.newlife.io",
            "web-dev.newlife.io",
            "share.newlife.io",
            "test.newlife.io"
        ],
        components: {
            Root: DomainPresale_1.DomainPresale,
            Explore: Explore_1.default
        }
    },
    {
        hosts: [
            "unsid.org",
            "web-dev.unsid.org"
        ],
        components: {
            Root: DomainPresale_1.DomainPresale,
            Explore: () => (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["You are good to go.", (0, jsx_runtime_1.jsx)("br", {}), "Use your UNSID to access the apps in the Newcoin ecosystem:", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "https://web.newlife.io", children: "newlife.IO" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "https://web.newlife.io", children: "newthis.IO" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "https://web.newlife.io", children: "newthat.OI" }) })] })] })
        }
    }
];
// const isNewlink = /newlink.page/.test(window.location.host)
const currentHost = window.location.host.replace(/:\d+/, "");
const HostBasedComponents = HostToDomain.find(htd => htd.hosts.find(h => h === currentHost))?.components || UnknownHost.components;
const View = (props) => (0, jsx_runtime_1.jsx)("div", { ...props, children: props.children });
const Topics = () => (0, jsx_runtime_1.jsx)("h3", { children: "Topics" });
const OverridableRoute = (props) => {
    const state = (0, overmind_1.useAppState)();
    const component = state.config.routes.overrides[props.path];
    const _props = component ? { ...props, component } : props;
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { ..._props });
};
exports.DEFAULT_ROUTES = [
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/auth", component: Auth_1.Auth }, "a"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/", component: HostBasedComponents.Root }, "h"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/dao/join", component: JoinDao_1.JoinDao }, "dj"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/top/creators", component: Creators_1.TopCreators }, "tc"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/top/folders", component: TopFolders_1.default }, "tf"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/top/posts", component: Creators_1.default }, "tp"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/newlink.page", component: Top_1.default }, "np"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/user-create", component: UserCreate_1.UserCreate }, "c"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/my/profile", component: User_1.User }, "u"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/my/profile/update", component: UserUpdate_1.UserUpdate }, "u"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/my/profile/notifications", component: Notifications_1.default }, "d"),
    // <OverridableRoute key="d" exact path="/notifications" component={Notifications} />,
    (0, jsx_runtime_1.jsx)(OverridableRoute, { path: "/explore", component: HostBasedComponents.Explore }, "e"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { path: "/my/folders", component: MyMoods_1.default }, "mm"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { path: "/topics", component: Topics }, "t"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { path: "/about", component: About_1.About }, "b"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { path: "/post/:id", component: Post_1.Post }, "p"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { path: "/post-create", component: PostCreate_1.PostCreate }, "pc"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { path: "/mood-create", component: MoodCreate_1.MoodCreate }, "mc"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/search-creative", component: SearchCreative_1.default }, "sc"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/search-creative/vote", component: SearchCreativePost_1.SearchCreativePost }, "scv"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/mood/:moodId/:postId", component: Post_1.Post }, "mpo"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/mood/:moodId", component: Mood_1.Mood }, "mo"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/folder/:moodId/:postId", component: Post_1.Post }, "mp"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/folder/:moodId", component: Mood_1.Mood }, "m"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { path: "/user/stake/:id", component: UserWidget_1.UserStake }, "us"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/user/:username", component: User_1.User }, "v"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/user/invite", component: UserInvite_1.UserInvite }, "ui"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/payment/subscription", component: Product_1.Product }, "s"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/auth/newlife-members", component: LegacyImport_1.LegacyImport }, "ue"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/spotlights", component: Spotlights_1.default }, "sp"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/save-folder", component: SelectMood_1.SelectMoodForm }, "sf"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/terms_of_service", component: TOS_1.TOS }, "ts"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/privacy_policy", component: Privacy_1.Privacy }, "pp"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/newlife-dao", component: CommunityHistory_1.default }, "ds"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/search", component: TagSearch_1.default }, "st"),
    (0, jsx_runtime_1.jsx)(OverridableRoute, { exact: true, path: "/tags/:tags/:postId", component: Post_1.PostInTags }, "st")
];
//# sourceMappingURL=defaultRoutes.js.map