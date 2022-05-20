import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, Avatar, Col, Row, Button, Modal, Input, Slider, Tooltip, } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { Link } from "react-router-dom";
import { useCachedPool, useCachedPowerups, useCachedUser, } from "../hooks/useCached";
import { useActions, useAppState } from "../overmind";
import { DataRow } from "./DataRow";
import { ContentImage } from "./Image";
import { BlockExplorerLink, blockExplorerUrl } from "./Links";
import { useEffect, useState } from "react";
import { ItemGrid } from "./ItemGrid";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import usePreventBodyScroll from "../hooks/usePreventBodyScroll";
import { CrossCircle } from "./Icons/CrossCircle";
import { ProgressButton } from "./ProgressButton";
import { RevealInfo } from "./RevealInfo";
import { HashDisplay } from "./CryptoEntities";
import ShowMoreText from "react-show-more-text";
import { Instagram } from "./Icons/Instagram";
import { TumblrIcon } from "./Icons/TumblrIcon";
import { Soundcloud } from "./Icons/Soundcloud";
import { TwitterIcon } from "./Icons/TwitterIcon";
import { Edit } from "./Icons/Edit";
import { SocialLink } from "./SocialLink";
import { Smallinfo } from "./Icons/Smallinfo";
import { STAKE_STEPS } from "src/overmind/flows/stake/state";
// import { Info } from "./Icons/Info";
// import { CreatorWidget } from "./Creators";
// import { UserStakeButton } from "../Pages/User/UserStake";
const ellipsisStyle = {
    maxWidth: 125,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
};
export const UserWidgetVertical = ({ user, }) => {
    const u = useCachedUser({ id: user?.id || "" });
    if (!u)
        return _jsx(_Fragment, {});
    return (_jsxs("div", { style: { marginBottom: 24 }, children: [_jsx(Link, { to: `/user/${u.username}`, children: _jsx(ContentImage, { size: "small", width: "100%", src: u.contentUrl }) }), _jsxs(Link, { to: `/user/stake/${u.username}`, hidden: !u.username, children: ["Stake on ", u.username] })] }));
};
const round = (v) => Math.round(v * 1000) / 1000;
/**
 * User stake widget.
 * @param
 * @returns
 */
export const UserStake = ({ user, mode, value, minValue, hideButton, buttonText, hideSelect, closeOnDone, onDone, onCancel, }) => {
    // const [visible, setVisible] = useState(false);
    const actions = useActions();
    const poolInfo = useCachedPool({ owner: user?.username });
    const [preStakeValue, setPrestakeValue] = useState(0);
    const [_value, setValue] = useState(value || 100);
    const [fee, setFee] = useState(0.08 * _value);
    const state = useAppState();
    const [tx, setTx] = useState("");
    const [_mode, setMode] = useState(mode ?? STAKE_STEPS.DISABLED);
    const _user = useCachedUser(user, true);
    const balances = state.newcoin.mainPool?.acc_balances || []; //state.newcoin.account?.acc_balances || [];
    const ncoBalance = Number((balances[0] || "").replace(/ GNCO$/, ""));
    const membershipValue = state.newcoin.pools[poolInfo.code];
    const displayMembershipValue = membershipValue;
    minValue = minValue || 100;
    const stakeDelta = (membershipValue || 0) - (preStakeValue || 0);
    const hasDao = !!poolInfo.code; // && /\.(io|nco)$/.test(user?.username || "");
    useEffect(() => {
        setMode(mode ?? STAKE_STEPS.DISABLED);
    }, [mode]);
    useEffect(() => {
        const m = _mode ?? STAKE_STEPS.DISABLED;
        setMode(m);
        actions.flows.stake.setLatestMode({ stakingMode: m });
    }, [_mode]);
    useEffect(() => {
        !hasDao && _mode >= 0 && setMode(STAKE_STEPS.NODAO);
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
        setMode(success && closeOnDone ? STAKE_STEPS.DISABLED : STAKE_STEPS.DONE);
        // success && setTimeout(() => setMode(STAKE_STEPS.DISABLED));
    };
    const openUrl = (url) => {
        window.open(url, "_new");
    };
    const getContainer = () => {
        return state.flows.stake.options.stakingContainer;
    };
    const startStaking = () => {
        setMode(STAKE_STEPS.SELECT);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Modal, { closeIcon: _jsx(CrossCircle, {}), 
                // getContainer={getContainer}
                visible: _mode == STAKE_STEPS.NODAO, cancelText: "Ok", 
                // onCancel={() => setMode(STAKE_STEPS.SELECT)}
                onCancel: () => {
                    setMode(STAKE_STEPS.DISABLED);
                    onDone && onDone({});
                }, okButtonProps: { style: { display: "none" } }, className: "nl-white-box-modal", children: [_jsx(Row, { align: "middle", className: "text-center", children: _jsx(Col, { span: 8, className: "nl-avatar", children: _jsx(Avatar, { size: "large", src: _jsx(ContentImage, { size: "medium", ..._user }) }) }) }), _jsx("div", { className: "section-divider" }), _jsx(Row, { align: "middle", className: "text-center", children: _jsxs(Col, { span: 24, className: "nl-avatar", children: [_jsx("h2", { children: _user.username }), _jsx("div", { className: "section-divider" }), "had not created their DAO yet.", _jsx("div", { className: "section-divider" }), "Please check this profile later."] }) })] }), _jsxs(Modal, { closeIcon: _jsx(CrossCircle, {}), visible: _mode === STAKE_STEPS.DONE, 
                // getContainer={getContainer}
                okText: "Yes", cancelText: "No", onOk: () => stake(), 
                // onCancel={() => setMode(STAKE_STEPS.SELECT)}
                onCancel: () => {
                    onDone &&
                        onDone({
                            preStakeValue,
                            stakeValue: _value,
                            stakeDelta,
                        });
                    setMode(STAKE_STEPS.DISABLED);
                }, cancelButtonProps: { value: "No" }, footer: false, className: "nl-white-box-modal", children: [_jsxs(Row, { className: "text-center", children: [_jsx(Col, { span: 8, className: "nl-avatar", children: _jsx(Avatar, { size: "large", src: _jsx(ContentImage, { size: "medium", ..._user }) }) }), _jsx(Col, { span: 12, className: "text-left u-margin-left-small", children: _jsxs("div", { children: ["You", " ", preStakeValue
                                            ? "increased your stake in"
                                            : "joined", _jsx("br", {}), _jsx("p", { className: "header-3", children: _user?.username }), "'s DAO."] }) })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-left", children: [_jsx("br", {}), _jsx("h2", { className: "header-2", children: "Congratulations" }), preStakeValue ? (_jsxs(_Fragment, { children: ["Your stake in ", _user?.username, "'s DAO increased by ", stakeDelta, " ", poolInfo.code, "."] })) : (_jsxs(_Fragment, { children: ["You are now a member of the ", _user?.username, "'s DAO with all the rights and duties associated."] })), _jsx("br", {}), _jsx("br", {}), _jsxs("p", { children: [_value, " $GNCO", _jsx("br", {}), "\u2014 ", round((fee * 5) / 8), " $GNCO (5%) creator fee", _jsx("br", {}), "\u2014 ", round((fee * 3) / 8), " $GNCO (3%) DAO fee", _jsx("br", {}), _jsx("br", {})] })] }), _jsxs("h1", { children: [round(_value - fee), " $GNCO"] }), _jsx(Button, { className: "nl-button-primary", onClick: () => openUrl(blockExplorerUrl.newcoin(tx)), children: "View on Newcoin" }), _jsx(Button, { className: "nl-button-primary", onClick: () => openUrl(blockExplorerUrl.blocks(tx)), children: "View on Bloks.io" })] })] }), _jsxs(Modal, { visible: _mode === STAKE_STEPS.CONFIRM, onOk: () => stake(), closeIcon: _jsx(CrossCircle, {}), onCancel: () => {
                    setMode(hideButton ? STAKE_STEPS.DISABLED : STAKE_STEPS.SELECT);
                    // mode === STAKE_STEPS. : DONE
                    // 	? onDone && onDone()
                    // 	: onCancel &&  : onCancel();
                    // setMode(STAKE_STEPS.SELECT);
                    // }}
                }, 
                // cancelButtonProps={{ value: "No" }}
                // footer={
                // 	state.indicators.specific["api.user.stake"] ? (
                // 		<IndeterminateProgress inProgress={true} />
                // 	) : undefined
                // }
                footer: false, className: "nl-white-box-modal primary-buttons-modal", children: [_jsx(Col, { span: 24, className: "nl-avatar u-margin-bottom-medium", children: _jsx(Avatar, { size: "large", src: _jsx(ContentImage, { size: "medium", ..._user }) }) }), _jsx(Col, { span: 24, children: membershipValue > 0 ? (_jsxs("p", { className: "header-3", children: ["Your membership in ", poolInfo.owner.toUpperCase(), " DAO is at ", displayMembershipValue, ". Stake", " ", _value, " GNCO more to increase your membership value."] })) : (_jsxs("p", { className: "header-3", children: ["Join ", _user?.username || "", "'s DAO"] })) }), _jsx(Col, { style: { margin: "80px 0 " }, children: _jsxs("p", { className: "paragraph-2r", children: ["Are you sure you want to", membershipValue ? (_jsxs(_Fragment, { children: [" ", "increase your stake in ", _user?.username || "", "'s DAO by ", _value, " $GNCO"] })) : (_jsxs(_Fragment, { children: [" ", "stake ", _value, " $GNCO to join", " ", _user?.username || "", "'s DAO?"] })), "?", _jsx("br", {}), "You will deposit ", _value, " $GNCO and pay a ", round(fee), " ", "$GNCO fee."] }) }), _jsx(ProgressButton, { actionName: "api.user.stake", type: "primary", progressText: "Staking...", onClick: () => {
                            stake();
                        }, children: "Confirm" }), _jsxs(Col, { span: 24, className: "text-left u-margin-top-large", style: { width: "100%" }, children: [_jsxs("p", { className: "paragraph-2r ", children: ["This is only on Testnet! Need help?", _jsx("br", {}), _jsx("span", { className: "paragraph-2u", children: "Join our telegram group!" })] }), "id"] })] }), _jsx(Modal, { visible: _mode >= STAKE_STEPS.SELECT && !hideSelect, okText: "Close", footer: false, onCancel: () => {
                    _mode === STAKE_STEPS.DONE
                        ? onDone && onDone()
                        : onCancel && onCancel();
                    setMode(STAKE_STEPS.DISABLED);
                }, className: "nl-white-box-modal", closeIcon: _jsx(CrossCircle, {}), children: _jsxs(Row, { align: "middle", className: "text-center nl-row-vertical-space", children: [_jsx(Col, { span: 24, className: "nl-avatar", children: _jsx(Avatar, { size: "large", src: _jsx(ContentImage, { size: "medium", ..._user }) }) }), _jsx(Col, { span: 24, children: _jsx("p", { className: "header-3", children: membershipValue > 0 ? (_jsxs(_Fragment, { children: ["Your stake in ", _user.newcoinTicker, " is $", displayMembershipValue, " $", poolInfo.owner.toUpperCase(), ". Stake", " ", _value, " GNCO more to increase your membership value."] }))
                                    :
                                        _jsxs(_Fragment, { children: ["Join ", _user?.username || "", "'s DAO"] }) }) }), _jsx(Col, { span: 24, children: _jsx(Input, { onChange: (e) => setValue(Number(e.target.value)), value: _value, suffix: "$GNCO", className: "gnco_input" }) }), _jsx(Col, { span: 24, children: _jsx("div", { children: _jsx(Slider, { className: "nl-slider", value: _value, tooltipVisible: false, style: { width: "100%" }, onChange: updateValue, marks: {
                                        100: "0%",
                                        [(ncoBalance / 100) * 25]: "25%",
                                        [(ncoBalance / 100) * 50]: "50%",
                                        [(ncoBalance / 100) * 75]: "75%",
                                        [ncoBalance]: "100%",
                                    }, min: minValue, max: ncoBalance }) }) }), _jsx(Col, { span: 24, className: "u-margin-top-large", children: _jsx(Button, { className: "nl-button-primary stake-button-modal", onClick: () => {
                                    setMode(STAKE_STEPS.CONFIRM);
                                }, children: "Stake" }) }), _jsxs(Col, { span: 24, className: "text-left", children: [_jsxs("span", { className: "paragraph-2r", children: [Math.round(fee * 100) / 100, " $GNCO Fee"] }), _jsxs("p", { className: "paragraph-2r ", children: ["This is only on Testnet! Need help?", _jsx("br", {}), _jsx("span", { className: "paragraph-2u", children: "Join our telegram group!" })] })] })] }) }), hideButton ? ("") : (_jsx(ProgressButton, { actionName: "api.user.stake", onClick: () => startStaking(), className: "nl-button-primary", progressText: "Staking...", children: buttonText || "Stake" }))] }));
};
export const UserPowerup = ({ user, }) => {
    const [visible, setVisible] = useState(false);
    const actions = useActions();
    const state = useAppState();
    const currentUserPowerups = useCachedPowerups();
    const poolInfo = useCachedPool({ owner: user?.username });
    const membershipValue = state.newcoin.pools[poolInfo.code];
    const rating = currentUserPowerups?.out?.value?.find((u) => u.id === user?.id);
    const isPowering = !!rating;
    const timeSince = rating?.rating?.created
        ? Date.now() - new Date(rating?.rating?.created).getDate()
        : -1;
    const [stakeMode, setStakeMode] = useState(false);
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
    return (_jsxs(_Fragment, { children: [_jsx(Modal, { visible: visible, 
                // title="Multiply your powerup"
                okText: "Close", onOk: () => setVisible(false), onCancel: () => setVisible(false), cancelButtonProps: { hidden: true }, footer: false, className: "nl-white-box-modal", closeIcon: _jsx(CrossCircle, {}), children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { children: [_jsxs(Row, { className: "text-center", style: { alignItems: "center" }, children: [_jsx(Col, { span: 8, className: "nl-avatar", children: _jsx(Avatar, { size: "large", src: _jsx(ContentImage, { size: "medium", ...user }) }) }), _jsx(Col, { span: 12, className: "text-left u-margin-left-medium", children: _jsxs("div", { children: [isPowering && timeSince > 60000
                                                        ? "You powered"
                                                        : state.indicators.specific["api.user.powerup"]
                                                            ? "Powering..."
                                                            : "", _jsx("br", {}), _jsx("span", { className: "header-3", children: user?.username })] }) })] }), _jsx(Row, { gutter: 12, className: "text-center", style: { margin: "80px 0" }, children: _jsx(Col, { span: 24, children: _jsx("span", { className: "header-1b", children: "+1" }) }) })] }), _jsxs(Row, { gutter: 48, children: [_jsxs(Col, { span: 24, className: "u-margin-bottom-medium", children: [_jsx("br", {}), _jsxs("div", { style: {
                                                justifyContent: "center",
                                                display: "flex",
                                                alignItems: "center",
                                            }, className: "u-margin-bottom-medium", children: [_jsx("span", { className: "paragraph-2r u-margin-right-small ", children: "Multiply your power up" }), _jsx(Tooltip, { placement: "right", title: "You can add unlimited power to leonielx.io by joining their DAO. As a member of leonielx.io DAO you will purchase $LEONIE tokens which can be used to access content, buy NFTs and vote on community proposals. The more you buy, the more power you give to leonielx.io. This is only on Testnet! ", children: _jsx("span", { children: _jsx(Smallinfo, {}) }) })] }), _jsx(Button, { className: "nl-button-primary", onClick: () => { }, children: "8X Power up" })] }), _jsx(Col, { span: 24, className: "text-bold u-margin-bottom-medium", children: _jsx(Button, { className: "nl-button-primary inverse", onClick: toStakeMode, children: membershipValue
                                            ? "∞ Stake more"
                                            : "Join the DAO" }) })] }), _jsxs("p", { className: "paragraph-2r text-left", children: ["This is only on Testnet! Need help?", _jsx("br", {}), _jsx("span", { className: "paragraph-2u", children: "Join our telegram group!" })] })] }) }), _jsx(Button, { onClick: powerup, className: "powerup-btn", children: _jsx("p", { className: "paragraph-2b", style: { lineHeight: 0, margin: 0 }, children: "Power up" }) }), _jsx(UserStake, { onDone: () => setStakeMode(false), hideButton: true, user: user, mode: stakeMode ? STAKE_STEPS.SELECT : STAKE_STEPS.DISABLED })] }));
};
export const UserWidgetTopFixed = ({ user, }) => {
    return (_jsx("div", { style: { position: "fixed", left: 0, top: 54 }, children: _jsx(Link, { to: `/user/${user?.username}`, children: _jsx("div", { style: {
                    wordBreak: "break-all",
                    maxWidth: "100%",
                    minHeight: "1.5em",
                }, children: user?.username }) }) }));
};
export const UserWidgetHeading = ({ user, setActiveKey }) => {
    const u = useCachedUser({ username: user?.username }, true);
    const state = useAppState();
    const actions = useActions();
    if (!user)
        return _jsx(_Fragment, {});
    // return <Card title={""}
    // cover={<ContentImage width="100%" src={user.contentUrl} />}
    // >
    const toMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString("en-US", {
            month: "long",
        });
    };
    const monthNumber = new Date(user.created || "").getMonth();
    const fullYear = new Date(user.created || "").getFullYear();
    const joinedDate = "Joined " + toMonthName(monthNumber) + " " + fullYear;
    return (_jsxs(Row, { wrap: true, 
        // gutter={30}
        style: {
            textAlign: "center",
            minHeight: 250,
            paddingTop: "10px",
        }, className: "app-main-full-width", children: [_jsxs(Col, { xs: 24, xl: 16, className: "nl-avatar", children: [_jsx(Row, { className: "user-widget__first-row", children: _jsx(Col, { xs: 20, xl: 20, className: "text-left", children: _jsxs(Row, { children: [_jsx(Avatar, { src: _jsx(ContentImage, { ...u }) }), _jsxs(Col, { xs: 18, xl: 18, className: "u-margin-left-medium", style: {
                                            display: "flex",
                                            alignItems: "baseline",
                                        }, children: [_jsxs(Col, { children: [_jsx("p", { className: "header-1r", children: u.username }), _jsxs(Col, { className: "user__social-icons-wrapper", children: [_jsx(SocialLink, { platform: "instagram", user: user, children: _jsx(Instagram, {}) }), _jsx(SocialLink, { platform: "tumblr", user: user, children: _jsx(TumblrIcon, {}) }), _jsx(SocialLink, { platform: "soundcloud", user: user, children: _jsx(Soundcloud, {}) }), _jsx(SocialLink, { platform: "twitter", user: user, children: _jsx(TwitterIcon, {}) })] })] }), _jsx(Col, { style: { margin: "0 20px" }, children: u.id === state.api.auth.user?.id && (_jsx(Link, { to: "/my/profile/update", children: _jsx(Edit, {}) })) }), _jsx(Col, { style: { flex: 1 }, xs: 24, children: _jsx("p", { className: "header-3r", children: user.displayName }) })] })] }) }) }), _jsxs(Row, { className: "paragraph-2r text-left", style: { marginTop: "20px" }, children: [_jsx(ShowMoreText, { lines: 3, more: _jsx("span", { className: "paragraph-2u", children: "Show more" }), less: _jsx("span", { className: "paragraph-2u", children: "Show less" }), className: "content-css", anchorClass: "my-anchor-css-class", expanded: false, width: 280, truncatedEndingComponent: " ", children: user.description }), _jsx("p", { className: "paragraph-2b u-margin-left-small", style: { color: "#959595" }, children: joinedDate })] })] }), _jsx(Col, { xs: 24, xl: 8, className: "user-widget-heading", children: _jsxs(Row, { className: "user-widget-heading  user-widget__second-row", style: { width: "100%", textAlign: "left" }, justify: "start", children: [_jsx(Col, { xs: 24, sm: 12, className: "username", children: _jsxs(Row, { className: "user-widget-heading__powering", children: [_jsxs(Col, { xs: 12, xl: 12, children: [_jsx("p", { onClick: () => setActiveKey("1"), style: {
                                                    cursor: "pointer",
                                                }, className: "header-1r", children: u.powered || 0 }), _jsx("p", { className: "paragraph-2r", children: "powered by" })] }), _jsxs(Col, { xs: 12, xl: 12, children: [_jsx("p", { onClick: () => setActiveKey("2"), style: { cursor: "pointer" }, className: "header-1r", children: u.powering || 0 }), _jsx("p", { className: "paragraph-2r", children: "powering" })] })] }) }), _jsxs(Col, { xs: 24, sm: 12, className: "powerup text-right nl-vertical-space", children: [_jsx(UserPowerup, { user: u }), _jsx("div", { children: _jsx(Button, { className: "primary", onClick: () => actions.routing.historyPush({ location: "/dao/owner/" + u?.username }), children: "DAO" }) })] })] }) })] }));
};
// export const UserSocialInfo: NLView<{ user?: UserReadPrivateResponse }> = ({ user }) => <div>{JSON.stringify</div>
export const UserSocialInfo = ({ user, }) => (_jsx(List
// header="Activity Stream"
, { 
    // header="Activity Stream"
    itemLayout: "horizontal", dataSource: "instagram,soundcloud,twitter,facebook,pinterest"
        .split(/,/)
        .filter((k) => user[k]), renderItem: (k) => {
        return (_jsx(List.Item, { children: _jsx(List.Item.Meta, { description: _jsx(DataRow, { title: k, value: user[k], link: `https://www.${k}.com/${user[k]}` }) }) }));
    } }));
export const UsersList = ({ users, powerUp, title, layout }) => (_jsxs(_Fragment, { children: [title ? _jsx("h4", { className: "header-4", children: title }) : "", _jsx(List
        // header="Activity Stream"
        , { 
            // header="Activity Stream"
            itemLayout: layout || "horizontal", dataSource: users || [], renderItem: (u) => {
                return (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { src: _jsx(ContentImage, { ...u }) }), description: _jsx(Row, { align: "middle", gutter: 18, className: "app-main-full-width-only", justify: "start", wrap: true, children: _jsxs(Col, { sm: 24, xxl: 24, children: [_jsx(Link, { to: `/user/${u.username}`, className: "paragraph-1r", children: u.username }), _jsx(Paragraph, { style: { marginBottom: "0" }, className: "paragraph-2r", children: u.powered || "" })] }) }) }) }));
            } })] }));
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
export const UsersHorizontalScroller = ({ users, powerUp, title, layout }) => {
    const { disableScroll, enableScroll } = usePreventBodyScroll();
    console.log(users);
    return (_jsxs("div", { style: {
            width: "100%",
            height: 200,
            marginBottom: 100,
            marginTop: "1em",
        }, onMouseEnter: disableScroll, onMouseLeave: enableScroll, children: [title ? (_jsx("h2", { className: "app-main-full-width header-2", children: title })) : (""), _jsx(ScrollMenu
            // LeftArrow={<LeftOutlined />} RightArrow={<RightOutlined />}
            , { children: users?.map((u, i) => {
                    return (_jsxs(Row, { align: "middle", style: {
                            width: /*180*/ "auto",
                            height: 150,
                            marginLeft: "20px",
                            marginRight: "20px",
                            flexWrap: "inherit",
                        }, justify: "center", wrap: true, children: [_jsx(Col
                            /*sm={16} xxl={6}*/
                            , { 
                                /*sm={16} xxl={6}*/
                                className: "u-margin-small", children: _jsx(Avatar, { src: _jsx(ContentImage, { size: "medium", ...u }) }) }), _jsxs(Col /*sm={16} xxl={8}*/, { children: [_jsx(Link, { to: `/user/${u.username}`, className: "paragraph-1b", children: u.username }), _jsx("br", {}), u.powered || ""] })] }));
                }) || _jsx(_Fragment, {}) })] }));
};
export const UsersGrid = ({ users, powerUp, title, layout }) => (_jsxs(_Fragment, { children: [title ? _jsx("h2", { className: "app-main-full-width", children: title }) : "", _jsx(ItemGrid
        // header="Activity Stream"
        , { 
            // header="Activity Stream"
            items: users || [], render: (u) => {
                return (_jsxs(Row, { align: "middle", gutter: 6, style: { padding: 12 }, justify: "center", wrap: true, children: [_jsx(Col, { sm: 10, xxl: 4, children: _jsx(Avatar, { src: _jsx(ContentImage, { size: "small", ...u }) }) }), _jsxs(Col, { sm: 14, xxl: 20, children: [_jsx(Link, { to: `/user/${u.username}`, children: u.username }), _jsx("br", {}), u.powered || ""] })] }));
            } })] }));
export const UserSocialInfoRow = ({ user, }) => (_jsx(_Fragment, { children: "instagram,soundcloud,twitter,facebook,pinterest,tumblr" //,phone,status"
        .split(/,/)
        .filter((k) => user[k])
        .map((k) => (_jsx(DataRow, { title: k, value: user[k], link: `https://www.${k}.com/${user[k]}` }))) }));
export const PoolInfoDataRow = ({ pool, }) => {
    const poolInfo = useCachedPool(pool);
    const myPools = useAppState().newcoin.pools;
    const user = useCachedUser({ username: poolInfo.owner });
    return (_jsxs(Row, { style: { marginBottom: 10 }, children: [_jsx(Col, { span: 4, children: _jsx(Link, { to: `/user/${user.username}`, children: _jsx(Avatar, { src: _jsx(ContentImage, { ...user }), className: "avatar-image-small" }) }) }), _jsxs(Col, { span: 14, children: [_jsx("div", { children: _jsxs(Link, { to: `/user/${user.username}`, children: ["$", user.newcoinTicker?.toUpperCase(), "\u00A0", _jsx("b", { children: ~~myPools[poolInfo?.code] })] }) }), _jsxs("small", { children: ["TVL: ", poolInfo.total.quantity] })] }), _jsx(Col, { span: 6, children: _jsx(UserStake, { user: user }) })] })
    // <div>
    // 			<CreatorWidget avatarClassName="avatar-image-small" creator={{ username: poolInfo.owner }} />
    // 			{pool?.code} ${myPools[poolInfo?.code]} ${poolInfo?.code} 
    // 			/ ${poolInfo?.total.quantity }
    // 	</div>
    );
    // <DataRow
    // 	title={
    // 		// <Link to={`/user/${poolInfo?.owner}`}>{poolInfo?.owner}</Link>
    // 		<CreatorWidget avatarClassName="avatar-image-small" creator={{ username: poolInfo.owner }} />
    // 	}
    // 	value={
    // 		`${pool?.code} ${myPools[poolInfo?.code]} ${poolInfo?.code
    // 		} 
    // 		/ ${poolInfo?.total.quantity
    // 	}`}
    // 	link={`/user/${poolInfo?.owner}`}
    // 	target=""
    // />
    // );
    // <>${poolInfo?.owner} {JSON.stringify(poolInfo)}</>;
};
export const UserNewcoinPoolsParticipation = ({ user = {}, onStakeStart }) => {
    const nc = useAppState().newcoin;
    return (_jsx(_Fragment, { children: Object.keys(nc.pools).map((code) => (_jsx(PoolInfoDataRow, { pool: { code } }))
        // <DataRow
        //     title={<PoolInfo pool={{code}} />}
        //     value={`${val as string} ${code}`}
        // />
        ) }));
};
export const UserNewcoinInfo = ({ user = {}, }) => {
    const state = useAppState();
    return (_jsxs(_Fragment, { children: [_jsx(DataRow, { title: "newcoin domain name", value: user.username, link: `https://explorer-dev.newcoin.org/account/${user.username}`, collapse: true }), _jsx(DataRow, { title: "account balance", value: state.newcoin.account.acc_balances, collapse: true }), _jsx(DataRow, { title: "newcoin pool", value: _jsx(BlockExplorerLink, { id: user.newcoinPoolId }), collapse: true }), _jsx(DataRow, { title: "newcoin account", value: _jsx(BlockExplorerLink, { id: user.newcoinAccTx }), collapse: true }), _jsx(DataRow, { title: "newcoin publisher public key", value: _jsx(HashDisplay, { hash: user.newcoinPublisherPublicKey }), collapse: true }), _jsx(DataRow, { title: "newcoin publisher private key", value: _jsx(RevealInfo, { children: _jsx(HashDisplay, { hash: user.newcoinPublisherPrivateKey }) }), collapse: true })] }));
};
export const UserPrivateInfo = ({ user, }) => (_jsx(_Fragment, { children: user &&
        "instagram,soundcloud,twitter,facebook,pinterest,phone,status"
            .split(/,/)
            .filter((k) => user[k])
            .map((k) => {
            return (_jsx(Row, { style: { width: "100%" }, children: _jsxs(Col, { span: 12, children: [user.firstName, " ", user.lastName, " ", user.fullName] }) }));
        }) }));
//# sourceMappingURL=UserWidget.js.map