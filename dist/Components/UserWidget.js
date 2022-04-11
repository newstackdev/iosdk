"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrivateInfo = exports.UserNewcoinInfo = exports.UserNewcoinPoolsParticipation = exports.PoolInfoDataRow = exports.UserSocialInfoRow = exports.UsersGrid = exports.UsersHorizontalScroller = exports.UsersList = exports.UserSocialInfo = exports.UserWidgetHeading = exports.UserWidgetTopFixed = exports.UserPowerup = exports.UserStake = exports.STAKE_STEPS = exports.UserWidgetVertical = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const Paragraph_1 = __importDefault(require("antd/lib/typography/Paragraph"));
const react_router_dom_1 = require("react-router-dom");
const useCached_1 = require("../hooks/useCached");
const overmind_1 = require("../overmind");
const DataRow_1 = require("./DataRow");
const Image_1 = require("./Image");
const Links_1 = require("./Links");
const react_1 = require("react");
const ItemGrid_1 = require("./ItemGrid");
const react_horizontal_scrolling_menu_1 = require("react-horizontal-scrolling-menu");
const usePreventBodyScroll_1 = __importDefault(require("../hooks/usePreventBodyScroll"));
const CrossCircle_1 = require("./Icons/CrossCircle");
const ProgressButton_1 = require("./ProgressButton");
const IndeterminateProgress_1 = require("./IndeterminateProgress");
const RevealInfo_1 = require("./RevealInfo");
const CryptoEntities_1 = require("./CryptoEntities");
const react_show_more_text_1 = __importDefault(require("react-show-more-text"));
const Instagram_1 = require("./Icons/Instagram");
const Tumblr_1 = require("./Icons/Tumblr");
const Soundcloud_1 = require("./Icons/Soundcloud");
const Twitter_1 = require("./Icons/Twitter");
const Edit_1 = require("./Icons/Edit");
const SocialLink_1 = require("./SocialLink");
const ellipsisStyle = {
    maxWidth: 125,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
};
const UserWidgetVertical = ({ user, }) => {
    const u = (0, useCached_1.useCachedUser)({ id: user?.id || "" });
    if (!u)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    return ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 24 }, children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${u.username}`, children: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { size: "small", width: "100%", src: u.contentUrl }) }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: `/user/stake/${u.username}`, hidden: !u.username, children: ["Stake on ", u.username] })] }));
};
exports.UserWidgetVertical = UserWidgetVertical;
exports.STAKE_STEPS = {
    DISABLED: -1,
    NODAO: 0,
    SELECT: 1,
    CONFIRM: 2,
    DONE: 3,
};
const round = (v) => Math.round(v * 1000) / 1000;
const UserStake = ({ user, mode, value, minValue, hideButton, buttonText, hideSelect, closeOnDone, onDone, onCancel, }) => {
    // const [visible, setVisible] = useState(false);
    const actions = (0, overmind_1.useActions)();
    const poolInfo = (0, useCached_1.useCachedPool)({ owner: user?.username });
    const [preStakeValue, setPrestakeValue] = (0, react_1.useState)(0);
    const [_value, setValue] = (0, react_1.useState)(value || 100);
    const [fee, setFee] = (0, react_1.useState)(0.08 * _value);
    const state = (0, overmind_1.useAppState)();
    const [tx, setTx] = (0, react_1.useState)("");
    const [_mode, setMode] = (0, react_1.useState)(mode ?? exports.STAKE_STEPS.DISABLED);
    const _user = (0, useCached_1.useCachedUser)(user, true);
    const balances = state.newcoin.account?.acc_balances || [];
    const ncoBalance = Number((balances[0] || "").replace(/ NCO$/, ""));
    const membershipValue = state.newcoin.pools[poolInfo.code];
    minValue = minValue || 100;
    const stakeDelta = (membershipValue || 0) - (preStakeValue || 0);
    const hasDao = !!poolInfo.code; // && /\.(io|nco)$/.test(user?.username || "");
    (0, react_1.useEffect)(() => {
        setMode(mode ?? exports.STAKE_STEPS.DISABLED);
    }, [mode]);
    (0, react_1.useEffect)(() => {
        !hasDao && _mode >= 0 && setMode(exports.STAKE_STEPS.NODAO);
    }, [hasDao, _mode]);
    const updateValue = (v) => {
        setValue(v);
        setFee(round(0.08 * v));
    };
    const stake = async () => {
        setPrestakeValue(membershipValue);
        const res = await actions.api.user.stake({
            user: _user,
            amount: _value + ".0000",
        });
        const historyItem = [...state.api.cache.stakeHistory]
            .reverse()
            .find((h) => h.user.username === user?.username);
        const success = historyItem && !historyItem.error;
        // return
        success && setTx(historyItem?.response?.data?.TxID_stakeToPool);
        setMode(success && closeOnDone ? exports.STAKE_STEPS.DISABLED : exports.STAKE_STEPS.DONE);
    };
    const openUrl = (url) => {
        window.open(url, "_new");
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Modal, { closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}), visible: _mode == exports.STAKE_STEPS.NODAO, cancelText: "Ok", 
                // onCancel={() => setMode(STAKE_STEPS.SELECT)}
                onCancel: () => {
                    setMode(exports.STAKE_STEPS.DISABLED);
                    onDone && onDone({});
                }, okButtonProps: { style: { display: "none" } }, className: "nl-white-box-modal", children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { align: "middle", className: "text-center", children: (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 8, className: "nl-avatar", children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: "large", src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { size: "medium", ..._user }) }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(antd_1.Row, { align: "middle", className: "text-center", children: (0, jsx_runtime_1.jsxs)(antd_1.Col, { span: 24, className: "nl-avatar", children: [(0, jsx_runtime_1.jsx)("h2", { children: _user.username }), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), "had not created their DAO yet.", (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), "Please check this profile later."] }) })] }), (0, jsx_runtime_1.jsxs)(antd_1.Modal, { closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}), visible: _mode === exports.STAKE_STEPS.DONE, okText: "Yes", cancelText: "No", onOk: () => stake(), 
                // onCancel={() => setMode(STAKE_STEPS.SELECT)}
                onCancel: () => {
                    onDone &&
                        onDone({
                            preStakeValue,
                            stakeValue: _value,
                            stakeDelta,
                        });
                    setMode(exports.STAKE_STEPS.DISABLED);
                }, cancelButtonProps: { value: "No" }, footer: false, className: "nl-white-box-modal", children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { align: "middle", className: "text-center", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 8, className: "nl-avatar", children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: "large", src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { size: "medium", ..._user }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 4 }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, className: "text-left", children: (0, jsx_runtime_1.jsxs)("div", { children: ["You", " ", preStakeValue
                                            ? "increased your stake in"
                                            : "joined", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("b", { style: { fontSize: "1.3em" }, children: _user?.username }), "'s DAO."] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("h2", { className: "header-2", children: "Congratulations!" }), preStakeValue ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Your stake in ", _user?.username, "'s DAO increased by", " ", stakeDelta, " ", poolInfo.code, "."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["You are now a member of the ", _user?.username, "'s DAO with all the rights and duties associated."] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("p", { className: "text-left", children: [_value, " $NCO", (0, jsx_runtime_1.jsx)("br", {}), "\u2014 ", round((fee * 5) / 8), " $NCO (5%) creator fee", (0, jsx_runtime_1.jsx)("br", {}), "\u2014 ", round((fee * 3) / 8), " $NCO (3%) DAO fee", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), "Total stake:"] }), (0, jsx_runtime_1.jsxs)("h1", { children: [round(_value - fee), " NCO"] }), (0, jsx_runtime_1.jsx)(antd_1.Button, { className: "nl-button-primary", onClick: () => openUrl(Links_1.blockExplorerUrl.newcoin(tx)), children: "View on Newcoin" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { className: "nl-button-primary", onClick: () => openUrl(Links_1.blockExplorerUrl.blocks(tx)), children: "View on Bloks.io" })] })] }), (0, jsx_runtime_1.jsxs)(antd_1.Modal, { visible: _mode === exports.STAKE_STEPS.CONFIRM, title: "Confirm your request", okText: "Yes", cancelText: "No", onOk: () => stake(), closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}), onCancel: () => {
                    setMode(hideButton ? exports.STAKE_STEPS.DISABLED : exports.STAKE_STEPS.SELECT);
                    // mode === STAKE_STEPS. : DONE
                    // 	? onDone && onDone()
                    // 	: onCancel &&  : onCancel();
                    // setMode(STAKE_STEPS.SELECT);
                    // }}
                }, 
                // cancelButtonProps={{ value: "No" }}
                footer: state.indicators.specific["api.user.stake"] ? ((0, jsx_runtime_1.jsx)(IndeterminateProgress_1.IndeterminateProgress, { inProgress: true })) : undefined, className: "nl-white-box-modal primary-buttons-modal", children: ["Are you sure you want to", membershipValue ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", "increase your stake in ", _user?.username || "", "'s DAO by", " ", _value, " $NCO"] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", "stake ", _value, " $NCO to join ", _user?.username || "", "'s DAO?"] })), "?", (0, jsx_runtime_1.jsx)("br", {}), "You will deposit ", _value, " $NCO and pay a ", round(fee), " $NCO fee."] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { visible: _mode >= exports.STAKE_STEPS.SELECT && !hideSelect, okText: "Close", footer: false, onCancel: () => {
                    mode === exports.STAKE_STEPS.DONE
                        ? onDone && onDone()
                        : onCancel && onCancel();
                    setMode(exports.STAKE_STEPS.DISABLED);
                }, className: "nl-white-box-modal", closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}), children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { align: "middle", className: "text-center nl-row-vertical-space", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, className: "nl-avatar", children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: "large", src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { size: "medium", ..._user }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, children: membershipValue > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Your current stake in ", _user?.username || "", "'s DAO is ", poolInfo.code, " ", membershipValue, ". Stake", " ", _value, " NCO more to increase your membership value."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Join ", _user?.username || "", "'s DAO"] })) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => setValue(Number(e.target.value)), value: _value, suffix: "$NCO" }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Slider, { className: "nl-slider", value: _value, tooltipVisible: false, style: { width: "100%" }, onChange: updateValue, marks: {
                                        [minValue]: [minValue],
                                        [ncoBalance]: ncoBalance,
                                    }, min: minValue, max: ncoBalance }) }) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { span: 24, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { className: "nl-button-primary", onClick: () => setMode(exports.STAKE_STEPS.CONFIRM), children: "Stake" }) }), (0, jsx_runtime_1.jsxs)("small", { children: [Math.round(fee * 100) / 100, " $NCO Fee"] })] }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, children: (0, jsx_runtime_1.jsxs)("small", { children: ["Learn more about", " ", (0, jsx_runtime_1.jsx)("a", { href: "https://en.wikipedia.org/wiki/The_DAO_(organization)", target: "_new", children: "DAOs" })] }) })] }) }), hideButton ? ("") : ((0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "api.user.stake", onClick: () => setMode(exports.STAKE_STEPS.SELECT), className: "nl-button-primary", progressText: "Staking...", children: buttonText || "Stake" }))] }));
};
exports.UserStake = UserStake;
const UserPowerup = ({ user, }) => {
    const [visible, setVisible] = (0, react_1.useState)(false);
    const actions = (0, overmind_1.useActions)();
    const state = (0, overmind_1.useAppState)();
    const currentUserPowerups = (0, useCached_1.useCachedPowerups)();
    const poolInfo = (0, useCached_1.useCachedPool)({ owner: user?.username });
    const membershipValue = state.newcoin.pools[poolInfo.code];
    const rating = currentUserPowerups?.out?.value?.find((u) => u.id === user?.id);
    const isPowering = !!rating;
    const timeSince = rating?.rating?.created
        ? Date.now() - new Date(rating?.rating?.created).getDate()
        : -1;
    const [stakeMode, setStakeMode] = (0, react_1.useState)(false);
    const powerup = async () => {
        setVisible(true);
        !isPowering &&
            user &&
            (await actions.api.user.powerup({ user, amount: 1 }));
    };
    const toStakeMode = () => {
        setStakeMode(true);
        setVisible(false);
    };
    // () => actions.routing.historyPush({ location: `/user/stake/${u.id}` })
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Modal, { visible: visible, 
                // title="Multiply your powerup"
                okText: "Close", onOk: () => setVisible(false), onCancel: () => setVisible(false), cancelButtonProps: { hidden: true }, footer: false, className: "nl-white-box-modal", closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}), children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { align: "middle", className: "text-center", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 8, className: "nl-avatar", children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: "large", src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { size: "medium", ...user }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 4, className: "text-left" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, className: "text-left", children: (0, jsx_runtime_1.jsxs)("div", { children: [isPowering && timeSince > 60000
                                                        ? "You powered"
                                                        : state.indicators.specific["api.user.powerup"]
                                                            ? "Powering..."
                                                            : "", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("b", { style: { fontSize: "1.3em" }, children: user?.username })] }) })] }), (0, jsx_runtime_1.jsx)(antd_1.Row, { gutter: 12, className: "text-center", children: (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, children: (0, jsx_runtime_1.jsx)("span", { className: "nl-font-huge", children: "+1" }) }) })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { gutter: 48, children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, { span: 24, children: [(0, jsx_runtime_1.jsx)("br", {}), "Multiply your power up (i)", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Button, { className: "nl-button-primary", onClick: () => { }, children: "8X Power up" })] }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { span: 24, className: "text-bold", children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Button, { className: "nl-button-primary inverse", onClick: toStakeMode, children: membershipValue
                                                ? "Stake more"
                                                : "Join the DAO" })] })] })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: powerup, className: "powerup-btn", children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2b", style: { lineHeight: 0, margin: 0 }, children: "Power up" }) }), (0, jsx_runtime_1.jsx)(exports.UserStake, { onDone: () => setStakeMode(false), hideButton: true, user: user, mode: stakeMode ? exports.STAKE_STEPS.SELECT : exports.STAKE_STEPS.DISABLED })] }));
};
exports.UserPowerup = UserPowerup;
const UserWidgetTopFixed = ({ user, }) => {
    return ((0, jsx_runtime_1.jsx)("div", { style: { position: "fixed", left: 0, top: 54 }, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${user?.username}`, children: (0, jsx_runtime_1.jsx)("div", { style: {
                    wordBreak: "break-all",
                    maxWidth: "100%",
                    minHeight: "1.5em",
                }, children: user?.username }) }) }));
};
exports.UserWidgetTopFixed = UserWidgetTopFixed;
const UserWidgetHeading = ({ user, setActiveKey }) => {
    const u = (0, useCached_1.useCachedUser)({ username: user?.username }, true);
    const state = (0, overmind_1.useAppState)();
    if (!user)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    // return <Card title={""}
    // cover={<ContentImage width="100%" src={user.contentUrl} />}
    // >
    console.log(`https://instagram.com/${user["instagram"]}`);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { wrap: true, 
        // gutter={30}
        style: {
            textAlign: "center",
            minHeight: 250,
            alignItems: "baseline",
            paddingTop: "10px",
        }, className: "app-main-full-width", children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, { xs: 24, xl: 14, className: "nl-avatar", children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "user-widget__first-row", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 20, xl: 20, className: "text-left", children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { ...u }) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { xs: 15, xl: 15, className: "u-margin-left-medium", children: [(0, jsx_runtime_1.jsx)("p", { className: "header-1r", children: u.username }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { className: "user__social-icons-wrapper", children: [(0, jsx_runtime_1.jsx)(SocialLink_1.SocialLink, { platform: "instagram", user: user, children: (0, jsx_runtime_1.jsx)(Instagram_1.Instagram, {}) }), (0, jsx_runtime_1.jsx)(SocialLink_1.SocialLink, { platform: "tumblr", user: user, children: (0, jsx_runtime_1.jsx)(Tumblr_1.Tumblr, {}) }), (0, jsx_runtime_1.jsx)(SocialLink_1.SocialLink, { platform: "soundcloud", user: user, children: (0, jsx_runtime_1.jsx)(Soundcloud_1.Soundcloud, {}) }), (0, jsx_runtime_1.jsx)(SocialLink_1.SocialLink, { platform: "twitter", user: user, children: (0, jsx_runtime_1.jsx)(Twitter_1.Twitter, {}) })] })] })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { children: u.id === state.api.auth.user?.id && ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/my/profile/update", children: (0, jsx_runtime_1.jsx)(Edit_1.Edit, {}) })) })] }), (0, jsx_runtime_1.jsx)(antd_1.Row, { className: "paragraph-2r text-left", style: { marginTop: "20px" }, children: (0, jsx_runtime_1.jsx)(react_show_more_text_1.default, { lines: 3, more: (0, jsx_runtime_1.jsx)("span", { className: "paragraph-2u", children: "Show more" }), less: (0, jsx_runtime_1.jsx)("span", { className: "paragraph-2u", children: "Show less" }), className: "content-css", anchorClass: "my-anchor-css-class", expanded: false, width: 280, truncatedEndingComponent: " ", children: user.description }) })] }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, xl: 10, className: "user-widget-heading", children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "user-widget-heading  user-widget__second-row", style: { width: "100%", textAlign: "left" }, justify: "start", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 12, className: "username", children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "user-widget-heading__powering", children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, { xs: 12, xl: 12, children: [(0, jsx_runtime_1.jsx)("p", { onClick: () => setActiveKey("1"), style: {
                                                    cursor: "pointer",
                                                }, className: "header-1r", children: u.powered || 0 }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: "powered by" })] }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { xs: 12, xl: 12, children: [(0, jsx_runtime_1.jsx)("p", { onClick: () => setActiveKey("2"), style: { cursor: "pointer" }, className: "header-1r", children: u.powering || 0 }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: "powering" })] })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 12, className: "powerup text-right", children: (0, jsx_runtime_1.jsx)(exports.UserPowerup, { user: u }) })] }) })] }));
};
exports.UserWidgetHeading = UserWidgetHeading;
// export const UserSocialInfo: NLView<{ user?: UserReadPrivateResponse }> = ({ user }) => <div>{JSON.stringify</div>
const UserSocialInfo = ({ user, }) => ((0, jsx_runtime_1.jsx)(antd_1.List
// header="Activity Stream"
, { 
    // header="Activity Stream"
    itemLayout: "horizontal", dataSource: "instagram,soundcloud,twitter,facebook,pinterest"
        .split(/,/)
        .filter((k) => user[k]), renderItem: (k) => {
        return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { description: (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: k, value: user[k], link: `https://www.${k}.com/${user[k]}` }) }) }));
    } }));
exports.UserSocialInfo = UserSocialInfo;
const UsersList = ({ users, powerUp, title, layout }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title ? (0, jsx_runtime_1.jsx)("h4", { className: "header-4", children: title }) : "", (0, jsx_runtime_1.jsx)(antd_1.List
        // header="Activity Stream"
        , { 
            // header="Activity Stream"
            itemLayout: layout || "horizontal", dataSource: users || [], renderItem: (u) => {
                return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { ...u }) }), description: (0, jsx_runtime_1.jsx)(antd_1.Row, { align: "middle", gutter: 18, className: "app-main-full-width-only", justify: "start", wrap: true, children: (0, jsx_runtime_1.jsxs)(antd_1.Col, { sm: 24, xxl: 24, children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${u.username}`, className: "paragraph-1r", children: u.username }), (0, jsx_runtime_1.jsx)(Paragraph_1.default, { style: { marginBottom: "0" }, className: "paragraph-2r", children: u.powered || "" })] }) }) }) }));
            } })] }));
exports.UsersList = UsersList;
// // header="Activity Stream"
// items={users || []}
// render={(u: UserReadPublicResponse) => {
const sliderStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    background: "#364d79",
    padding: 12,
    width: "min(100%,300px)",
};
const UsersHorizontalScroller = ({ users, powerUp, title, layout }) => {
    const { disableScroll, enableScroll } = (0, usePreventBodyScroll_1.default)();
    console.log(users);
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            width: "100%",
            height: 200,
            marginBottom: 100,
            marginTop: "1em",
        }, onMouseEnter: disableScroll, onMouseLeave: enableScroll, children: [title ? ((0, jsx_runtime_1.jsx)("h2", { className: "app-main-full-width header-2", children: title })) : (""), (0, jsx_runtime_1.jsx)(react_horizontal_scrolling_menu_1.ScrollMenu
            // LeftArrow={<LeftOutlined />} RightArrow={<RightOutlined />}
            , { children: users?.map((u, i) => {
                    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { align: "middle", style: {
                            width: /*180*/ "auto",
                            height: 150,
                            marginLeft: "20px",
                            marginRight: "20px",
                            flexWrap: "inherit",
                        }, justify: "center", wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Col
                            /*sm={16} xxl={6}*/
                            , { 
                                /*sm={16} xxl={6}*/
                                className: "u-margin-small", children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { size: "medium", ...u }) }) }), (0, jsx_runtime_1.jsxs)(antd_1.Col /*sm={16} xxl={8}*/, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${u.username}`, className: "paragraph-1b", children: u.username }), (0, jsx_runtime_1.jsx)("br", {}), u.powered || ""] })] }));
                }) || (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) })] }));
};
exports.UsersHorizontalScroller = UsersHorizontalScroller;
const UsersGrid = ({ users, powerUp, title, layout }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title ? (0, jsx_runtime_1.jsx)("h2", { className: "app-main-full-width", children: title }) : "", (0, jsx_runtime_1.jsx)(ItemGrid_1.ItemGrid
        // header="Activity Stream"
        , { 
            // header="Activity Stream"
            items: users || [], render: (u) => {
                return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { align: "middle", gutter: 6, style: { padding: 12 }, justify: "center", wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { sm: 10, xxl: 4, children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { size: "small", ...u }) }) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { sm: 14, xxl: 20, children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${u.username}`, children: u.username }), (0, jsx_runtime_1.jsx)("br", {}), u.powered || ""] })] }));
            } })] }));
exports.UsersGrid = UsersGrid;
const UserSocialInfoRow = ({ user, }) => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "instagram,soundcloud,twitter,facebook,pinterest,tumblr" //,phone,status"
        .split(/,/)
        .filter((k) => user[k])
        .map((k) => ((0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: k, value: user[k], link: `https://www.${k}.com/${user[k]}` }))) }));
exports.UserSocialInfoRow = UserSocialInfoRow;
const PoolInfoDataRow = ({ pool, }) => {
    const poolInfo = (0, useCached_1.useCachedPool)(pool);
    const myPools = (0, overmind_1.useAppState)().newcoin.pools;
    return ((0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${poolInfo?.owner}`, children: poolInfo?.owner }), value: `${pool?.code} ${myPools[poolInfo?.code]} ${poolInfo?.code} / ${poolInfo?.total.quantity}`, link: `/user/${poolInfo?.owner}`, target: "" }));
    // <>${poolInfo?.owner} {JSON.stringify(poolInfo)}</>;
};
exports.PoolInfoDataRow = PoolInfoDataRow;
const UserNewcoinPoolsParticipation = ({ user = {} }) => {
    const nc = (0, overmind_1.useAppState)().newcoin;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Object.keys(nc.pools).map((code) => ((0, jsx_runtime_1.jsx)(exports.PoolInfoDataRow, { pool: { code } }))
        // <DataRow
        //     title={<PoolInfo pool={{code}} />}
        //     value={`${val as string} ${code}`}
        // />
        ) }));
};
exports.UserNewcoinPoolsParticipation = UserNewcoinPoolsParticipation;
const UserNewcoinInfo = ({ user = {}, }) => {
    const state = (0, overmind_1.useAppState)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "newcoin domain name", value: user.username, link: `https://explorer-dev.newcoin.org/account/${user.username}` }), (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "account balance", value: state.newcoin.account.acc_balances }), (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "newcoin pool", value: (0, jsx_runtime_1.jsx)(Links_1.BlockExplorerLink, { id: user.newcoinPoolId }) }), (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "newcoin account", value: (0, jsx_runtime_1.jsx)(Links_1.BlockExplorerLink, { id: user.newcoinAccTx }) }), (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "newcoin publisher public key", value: (0, jsx_runtime_1.jsx)(CryptoEntities_1.HashDisplay, { hash: user.newcoinPublisherPublicKey }) }), (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "newcoin publisher private key", value: (0, jsx_runtime_1.jsx)(RevealInfo_1.RevealInfo, { children: (0, jsx_runtime_1.jsx)(CryptoEntities_1.HashDisplay, { hash: user.newcoinPublisherPrivateKey }) }) })] }));
};
exports.UserNewcoinInfo = UserNewcoinInfo;
const UserPrivateInfo = ({ user, }) => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: user &&
        "instagram,soundcloud,twitter,facebook,pinterest,phone,status"
            .split(/,/)
            .filter((k) => user[k])
            .map((k) => {
            return ((0, jsx_runtime_1.jsx)(antd_1.Row, { style: { width: "100%" }, children: (0, jsx_runtime_1.jsxs)(antd_1.Col, { span: 12, children: [user.firstName, " ", user.lastName, " ", user.fullName] }) }));
        }) }));
exports.UserPrivateInfo = UserPrivateInfo;
//# sourceMappingURL=UserWidget.js.map