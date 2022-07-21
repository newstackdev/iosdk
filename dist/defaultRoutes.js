import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { About } from "./Pages/About";
import { Auth } from "./Pages/Auth/Auth";
import { useEffect } from "react";
import { DomainPresale } from "./Pages/DomainPresale/DomainPresale";
import { JoinDao } from "./Pages/JoinDao";
import { LegacyImport } from "./Pages/User/LegacyImport";
import { Mood } from "./Pages/Mood/Mood";
import { MoodCreate } from "./Pages/Mood/MoodCreate";
import { OnboardingCreate, OnboardingDomain, OnboardingLink, OnboardingNft, OnboardingPowerup, OnboardingSubscribe, OnboardingVerifyLink, OnboardingVerifyNft, } from "./Pages/OnboardingV2";
import { Post, PostInTags } from "./Pages/Post/Post";
import { PostCreate } from "./Pages/Post/PostCreate";
import { Privacy } from "./Pages/Privacy";
import { Product } from "./Pages/Store/Product";
import { Route } from "react-router-dom";
import { SearchCreativePost } from "./Pages/SearchCreativePost";
import { SelectMoodForm } from "./Components/SelectMood";
import { TOS } from "./Pages/TOS";
import { User } from "./Pages/User/User";
import { UserCreate } from "./Pages/User/UserCreate";
import { UserInvite } from "./Pages/User/UserInvite";
import { UserStake } from "./Components/UserWidget";
import { UserUpdate } from "./Pages/User/UserUpdate";
import { ViewWhitelistProposalPage } from "./Pages/Dao/Views/WhitelistProposalView/ViewWhitelistProposal";
import { useActions, useAppState } from "./overmind";
import Creators, { TopCreators } from "./Components/Creators";
import DaoCreate from "./Pages/Dao/Views/DaoCreate/DaoCreate";
import Explore from "./Pages/Explore/Explore";
import MyMoods from "./Pages/Mood/MyMoods";
import NewProposal from "./Pages/Dao/Views/NewProposal/NewProposal";
import Notifications from "./Components/Icons/Notifications";
import { ProposalsPage } from "./Pages/Dao/Views/Proposals/ProposalList";
import SearchCreative from "./Pages/SearchCreative";
import SearchTag from "./Pages/Tag/TagSearch";
import Spotlights from "./Components/Spotlights";
import TopFolders from "./Components/TopFolders";
import TopHashtags from "./Components/TopHashtags";
import UserTop from "./Pages/User/Top";
import { ViewProposalPage } from "./Pages/Dao/Views/ProposalView/ViewProposal";
import Whitelist from "./Pages/Dao/Components/Previews/Member/MemberRow";
const UnknownHost = {
    hosts: [],
    components: {
        Root: () => _jsx(_Fragment, { children: "UnknownHost" }),
        Explore: () => _jsx(_Fragment, {}),
    },
};
const testDomain = window.location.host;
const HostToDomain = [
    {
        hosts: ["newlink.page"],
        components: {
            Root: DomainPresale,
            Explore: UserTop,
        },
    },
    {
        hosts: ["localhost", "www.newlife.io", "web.newlife.io", "web-dev.newlife.io", "share.newlife.io", "test.newlife.io"],
        components: {
            Root: DomainPresale,
            Explore: Explore,
        },
    },
    {
        hosts: ["unsid.org", "web-dev.unsid.org"],
        components: {
            Root: DomainPresale,
            Explore: () => (_jsxs(_Fragment, { children: ["You are good to go.", _jsx("br", {}), "Use your UNSID to access the apps in the Newcoin ecosystem:", _jsx("br", {}), _jsx("br", {}), _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", { href: "https://web.newlife.io", children: "newlife.IO" }) }), _jsx("li", { children: _jsx("a", { href: "https://web.newlife.io", children: "newthis.IO" }) }), _jsx("li", { children: _jsx("a", { href: "https://web.newlife.io", children: "newthat.OI" }) })] })] })),
        },
    },
    {
        hosts: ["dao.newmoon.ac"],
        components: {
            Root: DomainPresale,
            Explore: () => {
                const actions = useActions();
                useEffect(() => {
                    actions.routing.historyPush({ location: "/dao/newmoon.io" });
                }, []);
                return _jsx(_Fragment, {});
            },
        },
    },
];
// const isNewlink = /newlink.page/.test(window.location.host)
const currentHost = window.location.host.replace(/:\d+/, "");
const HostBasedComponents = HostToDomain.find((htd) => htd.hosts.find((h) => h === currentHost))?.components || UnknownHost.components;
const View = (props) => _jsx("div", { ...props, children: props.children });
const Topics = () => _jsx("h3", { children: "Topics" });
const OverridableRoute = (props) => {
    const state = useAppState();
    const component = state.config.routes.overrides[props.path];
    const _props = component ? { ...props, component } : props;
    return _jsx(Route, { ..._props });
};
export const DEFAULT_ROUTES = [
    _jsx(OverridableRoute, { exact: true, path: "/auth", component: Auth }, "a"),
    _jsx(OverridableRoute, { exact: true, path: "/", component: HostBasedComponents.Root }, "h"),
    _jsx(OverridableRoute, { exact: true, path: "/dao/join", component: JoinDao }, "dj"),
    _jsx(OverridableRoute, { exact: true, path: "/top/creators", component: TopCreators }, "tc"),
    _jsx(OverridableRoute, { exact: true, path: "/top/folders", component: TopFolders }, "tf"),
    _jsx(OverridableRoute, { exact: true, path: "/top/posts", component: Creators }, "tp"),
    _jsx(OverridableRoute, { exact: true, path: "/top/hashtags", component: TopHashtags }, "th"),
    _jsx(OverridableRoute, { exact: true, path: "/newlink.page", component: UserTop }, "np"),
    _jsx(OverridableRoute, { exact: true, path: "/user-create", component: UserCreate }, "c"),
    _jsx(OverridableRoute, { exact: true, path: "/my/profile", component: User }, "u"),
    _jsx(OverridableRoute, { exact: true, path: "/my/profile/update", component: UserUpdate }, "u"),
    _jsx(OverridableRoute, { exact: true, path: "/my/profile/notifications", component: Notifications }, "d"),
    // <OverridableRoute key="d" exact path="/notifications" component={Notifications} />,
    _jsx(OverridableRoute, { path: "/explore", component: HostBasedComponents.Explore }, "e"),
    _jsx(OverridableRoute, { path: "/my/folders", component: MyMoods }, "mm"),
    _jsx(OverridableRoute, { path: "/topics", component: Topics }, "t"),
    _jsx(OverridableRoute, { path: "/about", component: About }, "b"),
    _jsx(OverridableRoute, { path: "/post/:id", component: Post }, "p"),
    _jsx(OverridableRoute, { path: "/post-create", component: PostCreate }, "pc"),
    _jsx(OverridableRoute, { path: "/mood-create", component: MoodCreate }, "mc"),
    _jsx(OverridableRoute, { exact: true, path: "/search-creative", component: SearchCreative }, "sc"),
    _jsx(OverridableRoute, { exact: true, path: "/search-creative/vote", component: SearchCreativePost }, "scv"),
    _jsx(OverridableRoute, { exact: true, path: "/mood/:moodId/:postId", component: Post }, "mpo"),
    _jsx(OverridableRoute, { exact: true, path: "/mood/:moodId", component: Mood }, "mo"),
    _jsx(OverridableRoute, { exact: true, path: "/folder/:moodId/:postId", component: Post }, "mp"),
    _jsx(OverridableRoute, { exact: true, path: "/folder/:moodId", component: Mood }, "m"),
    _jsx(OverridableRoute, { path: "/user/stake/:id", component: UserStake }, "us"),
    _jsx(OverridableRoute, { exact: true, path: "/user/:username", component: User }, "v"),
    _jsx(OverridableRoute, { exact: true, path: "/user/invite", component: UserInvite }, "ui"),
    _jsx(OverridableRoute, { exact: true, path: "/payment/subscription", component: Product }, "s"),
    _jsx(OverridableRoute, { exact: true, path: "/auth/newlife-members", component: LegacyImport }, "ue"),
    _jsx(OverridableRoute, { exact: true, path: "/spotlights", component: Spotlights }, "sp"),
    _jsx(OverridableRoute, { exact: true, path: "/save-folder", component: SelectMoodForm }, "sf"),
    _jsx(OverridableRoute, { exact: true, path: "/terms_of_service", component: TOS }, "ts"),
    _jsx(OverridableRoute, { exact: true, path: "/privacy_policy", component: Privacy }, "pp"),
    _jsx(OverridableRoute, { exact: true, path: "/search", component: SearchTag }, "st"),
    _jsx(OverridableRoute, { exact: true, path: "/tags/:tags/:postId", component: PostInTags }, "st"),
    // DAO
    _jsx(OverridableRoute, { exact: true, path: "/dao/:daoOwner/proposal/:id", component: ViewProposalPage }, "dvp"),
    _jsx(OverridableRoute, { exact: true, path: "/dao/:daoOwner/whitelist-proposal/:id", component: ViewWhitelistProposalPage }, "dssac"),
    // <OverridableRoute key="ds" exact path="/dao/:daoOwner" component={ProposalsPage} />,
    _jsx(OverridableRoute, { exact: true, path: "/dao/:daoOwner/proposals/:type?", component: ProposalsPage }, "ds"),
    _jsx(OverridableRoute, { exact: true, path: "/dao/:daoOwner/new-proposal", component: NewProposal }, "dg"),
    // <OverridableRoute key="drp" exact path="/dao/proposal/:id" component={ViewProposal} />,
    _jsx(OverridableRoute, { exact: true, path: "/dao/:daoOwner/proposal-create", component: NewProposal }, "dcp"),
    _jsx(OverridableRoute, { exact: true, path: "/dao/create", component: DaoCreate }, "dc"),
    _jsx(OverridableRoute, { exact: true, path: "/dao/:daoOwner", component: ProposalsPage }, "dpl"),
    _jsx(OverridableRoute, { exact: true, path: "/dao/:daoOwner/whitelist/members", component: Whitelist }, "dsae"),
    // Onboarding v2
    _jsx(OverridableRoute, { exact: true, path: "/signup", component: OnboardingLink }, "su"),
    _jsx(OverridableRoute, { exact: true, path: "/signup/link", component: OnboardingLink }, "sul"),
    _jsx(OverridableRoute, { exact: true, path: "/signup/nft", component: OnboardingNft }, "sun"),
    _jsx(OverridableRoute, { exact: true, path: "/signup/link-verify", component: OnboardingVerifyLink }, "sulv"),
    _jsx(OverridableRoute, { exact: true, path: "/signup/nft-verify", component: OnboardingVerifyNft }, "sunv"),
    _jsx(OverridableRoute, { exact: true, path: "/signup/domain", component: OnboardingDomain }, "sud"),
    _jsx(OverridableRoute, { exact: true, path: "/signup/subscribe", component: OnboardingSubscribe }, "sus"),
    _jsx(OverridableRoute, { exact: true, path: "/signup/create", component: OnboardingCreate }, "suc"),
    _jsx(OverridableRoute, { exact: true, path: "/signup/powerup", component: OnboardingPowerup }, "sup"),
];
//# sourceMappingURL=defaultRoutes.js.map