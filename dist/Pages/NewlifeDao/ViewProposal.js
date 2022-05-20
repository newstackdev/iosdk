import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAppState, useActions } from "../../overmind";
import { Avatar, Button, Col, Form, Image, Input, Row, Switch, Tooltip } from "antd";
import { Link } from "react-router-dom";
import ProgressBar from "../../Components/Icons/ProgressBar";
import { Info } from "../../Components/Icons/Info";
import { ContentImage } from "../../Components/Image";
import { useEffect } from "react";
import { useCachedDaoProposal, useCachedPool, useCachedUser } from "../../hooks/useCached";
import { UserStake } from "../../Components/UserWidget";
import { useParams } from "react-router-dom";
import { ProgressButton } from "../../Components/ProgressButton";
import { pad } from "../../utils/pad";
export const ViewProposalPage = () => {
    const { daoOwner, id } = useParams();
    return _jsx(ViewProposal, { daoOwner: daoOwner, proposalId: id });
};
const normalizeQuantity = (q) => {
    const [whole, decimal] = q.split(/\./);
    const padded = pad(decimal || "", 4, "right");
    return [whole, padded].join(".");
};
const ViewProposal = (props) => {
    const state = useAppState();
    const actions = useActions();
    const daoOwner = props.daoOwner || state.config.settings.newcoin.daoDomain;
    const proposalId = props.proposalId || "0";
    const proposal = useCachedDaoProposal({ daoOwner, proposalId });
    const proposer = useCachedUser({ username: proposal.proposer });
    const owner = useCachedUser({ username: daoOwner });
    // const owner = useCachedUser({ username: ownerDomain }, true);
    const pool = useCachedPool({ owner: daoOwner });
    const myPools = state.newcoin.pools;
    const currUser = state.api.auth.user?.username || "";
    const isOwner = currUser === daoOwner;
    const isMember = myPools[pool.code];
    const ticker = owner.newcoinTicker?.toUpperCase();
    useEffect(() => {
        actions.newcoin.voterListVotes({ voter: currUser });
    }, [currUser]);
    const alreadyVoted = (state.newcoin.cache.votes[currUser] || [])
        .rows?.find(r => r.dao_id?.toString() == proposal.dao_id && r.proposal_id == Number(proposalId) && r.proposal_type == "standart");
    const imgUrl = (proposal.url.match(/(.*\.jpe?g|png)/) || [])[1] || "";
    return _jsxs(Col, { className: "full-prop-ctn", children: [_jsxs("h1", { children: [daoOwner, " DAO Proposal #", proposalId] }), "Status: ", proposal.status, _jsx("br", {}), _jsx("br", {}), proposal.status === "created" ?
                _jsxs(_Fragment, { children: ["This proposal requires approval.", isOwner ?
                            _jsxs(_Fragment, { children: ["You are the owner of this dao. Please approve to activate the proposal.\u00A0", _jsx(Button, { onClick: () => actions.newcoin.daoApproveProposal({ daoOwner, proposalId }), children: "Approve" })] }) :
                            _jsx(_Fragment, {})] }) :
                proposal.status === "approved" ?
                    _jsx(_Fragment, { children: isMember ?
                            alreadyVoted ?
                                _jsxs(_Fragment, { children: ["You voted for this proposal. Amount locked: ", alreadyVoted?.quantity?.quantity] })
                                :
                                    _jsx("div", { style: { color: "white" }, children: _jsx(Form, { onFinish: ({ quantity, option }) => {
                                                actions.newcoin.daoVoteProposal({
                                                    quantity: normalizeQuantity(quantity) + " " + ticker,
                                                    option: option ? "YES" : "NO",
                                                    proposal_id: proposalId.toString(),
                                                    dao_owner: daoOwner
                                                });
                                            }, children: _jsxs("div", { className: "nl-white-box text-center", style: { maxWidth: 400 }, children: [_jsxs("div", { children: ["As a member of ", owner.username, " DAO you are eligible to vote. Lock up to $", ~~myPools[pool.code], " ", pool.code, " to cast your vote.", _jsx("br", {}), _jsx(Form.Item, { name: "quantity", label: "Locking", children: _jsx(Input, { suffix: ticker }) })] }), _jsx("div", { children: _jsxs(Form.Item, { valuePropName: "checked", name: "option", label: "Your vote", children: ["No ", _jsx(Switch, {}), " Yes"] }) }), _jsx("div", { children: _jsx(ProgressButton, { actionName: "newcoin.daoVoteProposal", progressText: "Voting...", htmlType: "submit", children: "Vote" }) })] }) }) })
                            :
                                _jsxs("div", { style: { color: "white" }, children: ["Only ", pool.code, " owners can vote for this proposal. Stake to ", daoOwner, "'s pool to vote!", _jsx("br", {}), _jsx(UserStake, { user: { username: daoOwner } })] }) })
                    : _jsx(_Fragment, {}), _jsx("br", {}), _jsx("br", {}), imgUrl && _jsx(Image, { className: "full-prop-img", height: "600px", width: "100%", src: imgUrl }), _jsxs("p", { className: "full-p", children: ["YES: ", proposal.vote_yes?.quantity] }), _jsxs("p", { className: "full-p", children: ["NO: ", proposal.vote_no?.quantity] }), _jsx(ProgressBar, { width: "100%", className: "full-bar" }), _jsxs("p", { className: "full-p", children: ["Vote start: ", proposal.vote_start] }), _jsxs("p", { className: "full-p", children: ["Vote end: ", proposal.vote_end] }), _jsx(Row, { justify: "space-between", className: "full-p", children: _jsx(Tooltip, { title: "The amount of votes it has left to be approved!", children: _jsx(Info, { color: "white" }) }) }), _jsxs("h1", { className: "full-p", children: [" ", proposal.title || "Title missing"] }), _jsxs("p", { className: "full-p", children: [" ", proposal.summary || "This is the proposal to This is the proposal to build a communal space in one of Europes largest cities. This is the proposal to build a communal space in one of Europes largest cities."] }), _jsx("p", { className: "full-p", children: _jsx("a", { href: proposal.url, target: "_blank", children: proposal.url || "" }) }), _jsx("p", { className: "full-p", children: "Proposed By" }), _jsxs(Row, { align: "middle", className: "full-profile", children: [_jsx(Link, { to: `/user/${proposal.proposer}`, className: "full-avi", children: _jsx(Avatar, { src: _jsx(ContentImage, { ...proposer }), className: "avatar-image-top-creators" }) }), _jsxs(Col, { className: "full-user", children: [_jsx("p", { className: "full-p", children: proposal.proposer }), _jsx("p", { className: "full-p", children: proposer.displayName || "Kadine James" })] })] })] });
};
export default ViewProposal;
//# sourceMappingURL=ViewProposal.js.map