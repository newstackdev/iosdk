import { useAppState, useActions } from "../../overmind";
import { Avatar, Button, Col, Form, Image, Input, Row, Switch, Tooltip } from "antd";
import Hands from "../../Components/Icons/Hands";
import { Link } from "react-router-dom";
import ProgressBar from "../../Components/Icons/ProgressBar";
import { Info } from "../../Components/Icons/Info";
import { ContentImage } from "../../Components/Image";
import { useEffect } from "react";
import { useCachedDaoProposal, useCachedPool, useCachedUser } from "../../hooks/useCached";
import Modal from "antd/lib/modal/Modal";
import { UserStake } from "../../Components/UserWidget";
import { JoinDaoWidget } from "../JoinDao";
import { useParams } from "react-router-dom";
import { ProgressButton } from "../../Components/ProgressButton";
import { pad } from "../../utils/pad";

export const ViewProposalPage = () => {
	const { daoOwner, id } = useParams<{ daoOwner: string, id: string }>();

	return <ViewProposal daoOwner={daoOwner} proposalId={id} />
}

const normalizeQuantity = (q) => {
	const [whole, decimal] = q.split(/\./);
	const padded = pad(decimal || "", 4, "right");
	return [whole, padded].join(".");
}

const ViewProposal = (props: { daoOwner: string, proposalId: string }) => {
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

	return <Col className="full-prop-ctn">
		<h1>{daoOwner} DAO Proposal #{proposalId}</h1>

		{/* <Modal visible={true}>

		</Modal> */}
		{/* !{JSON.stringify(state.newcoin.cache.votes)}! */}
		Status: {proposal.status}
		<br /><br />

		{
			proposal.status === "created" ?
				<>
					This proposal requires approval.
					{
						isOwner ?
							<>
								You are the owner of this dao. Please approve to activate the proposal.&nbsp;
								<Button onClick={() =>
									actions.newcoin.daoApproveProposal({ daoOwner, proposalId })}>Approve</Button>
							</> :
							<>

							</>
					}
				</> :
				proposal.status === "approved" ?
					<>
						{
							isMember ?
								alreadyVoted ? 
									<>You voted for this proposal. Amount locked: {alreadyVoted?.quantity?.quantity}</>
								:
								<div style={{ color: "white" }}>

									<Form
										onFinish={({ quantity, option }: { quantity: string, option: string }) => {
											actions.newcoin.daoVoteProposal({
												quantity: normalizeQuantity(quantity) + " " + ticker,
												option: option ? "YES" : "NO",
												proposal_id: proposalId.toString(),
												dao_owner: daoOwner
											})
										}}
									>
										<div className="nl-white-box text-center" style={{ maxWidth: 400 }}>
											<div>
												As a member of {owner.username} DAO you are eligible to vote.
												Lock up to ${~~myPools[pool.code]} {pool.code} to cast your vote.
												<br />
												<Form.Item name="quantity" label="Locking">
													<Input 
														suffix={ticker}
													/>
												</Form.Item>
											</div>
											<div>
												<Form.Item valuePropName="checked" name="option" label="Your vote">
													No <Switch /> Yes
												</Form.Item>
											</div>
											<div>
												<ProgressButton
													actionName="newcoin.daoVoteProposal"
													progressText="Voting..."
													htmlType="submit"
												>Vote</ProgressButton>
											</div>
										</div>
									</Form>

								</div>
								:
								<div style={{ color: "white" }}>
									Only {pool.code} owners can vote for this proposal. Stake to {daoOwner}'s pool to vote!<br />
									<UserStake user={{ username: daoOwner }} />
									{/* <JoinDaoWidget /> */}
								</div>
						}
					</>
					: <></>
		}
		<br /><br />

		
		{ imgUrl && <Image className={"full-prop-img"}
			height={"600px"}
			width={"100%"}
			src={
				imgUrl
				// "https://eu-dev-creator-api-cdn.s3.eu-west-1.amazonaws.com/videos/68c94b1eb4ce3bd3902d59f9432c5e1e/thumbnail/b9cf1877a5dc36a43af27fc4160857e3.0000000.jpg"
			} /> }
		<p className="full-p">YES: {proposal.vote_yes?.quantity}</p>
		<p className="full-p">NO: {proposal.vote_no?.quantity}</p>
		<ProgressBar width={"100%"} className={"full-bar"} />
		<p className="full-p">Vote start: {proposal.vote_start}</p>
		<p className="full-p">Vote end: {proposal.vote_end}</p>
		<Row justify="space-between" className={"full-p"}>
			{/* <p className="-p">{props.voteThreshold || "Vote Threshold: 2%"} </p> */}
			<Tooltip title="The amount of votes it has left to be approved!">
				<Info color={"white"} />
			</Tooltip>
		</Row>
		<h1 className={"full-p"}> {proposal.title || "Title missing"}</h1>
		<p className={"full-p"}> {proposal.summary || "This is the proposal to This is the proposal to build a communal space in one of Europes largest cities. This is the proposal to build a communal space in one of Europes largest cities."}</p>
		<p className={"full-p"}><a href={proposal.url} target="_blank">{proposal.url || ""}</a></p>
		<p className={"full-p"}>Proposed By</p>
		<Row align={"middle"} className={"full-profile"}>
			<Link to={`/user/${proposal.proposer}`} className={"full-avi"}>
				<Avatar
					src={<ContentImage {...proposer} />}
					className="avatar-image-top-creators"
				/>
			</Link>
			<Col className={"full-user"}>
				<p className={"full-p"}>{proposal.proposer}</p>
				<p className="full-p">{proposer.displayName || "Kadine James"}</p>
			</Col>
		</Row>
	</Col>
}

export default ViewProposal;

