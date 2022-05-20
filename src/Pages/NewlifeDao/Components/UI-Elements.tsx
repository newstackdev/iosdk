import { Link } from "react-router-dom";
import { Avatar, Button, Col, Row, Tooltip } from "antd"
import { Hands, ProgressBar } from "./Icons";
import { Info } from "../../../Components/Icons/Info";
import { ContentImage } from "../../../Components/Image";

export const ProposalRow = ( { daoOwner, proposal, buttonType, wrapperClass }: any ) => {
	const randomStatus = () => {
		const statuses = [ "approved", "declined", "expired", "live" ];
		const randomIndex = Math.floor( Math.random() * statuses.length );
		return statuses[ randomIndex ];
	}
	const status = randomStatus();
	return <Link to={`/dao/${daoOwner}/proposal/${proposal.id}`}>
		<Row className={wrapperClass} align="middle">
			<Row align="middle" className={"u-margin-left-large"}>
				<p className={"header-5 u-margin-right-large"}>#{proposal.id}</p>
				<span className={"u-margin-right-large"}>
					<Hands />
				</span>
				<p className={"u-dao-h-35px-r"}>{proposal.title}</p>
			</Row>
			<Row align="middle" className={"u-margin-right-large"}>
				<Row align="middle" className={" proposal-list-timestamp-ctn u-margin-right-large"} >
					<p className={"header-5 u-margin-right-large"}>{proposal.date}</p>
					<p className={"header-5"}>{proposal.time}</p>
				</Row>
				<Row className={"proposal-list-btns-ctn"}>
					<Button className={ `u-dao-proposal-${proposal.status || status }-tag-status-btn u-margin-right-medium`}>
						{ proposal.status || status }
					</Button>
					<Link to={`/dao/${daoOwner}/proposal/${proposal.id}`}><Button>{ buttonType }</Button></Link>
				</Row>
			</Row>
		</Row>
	</Link>
}

export const ProposalCard = ({ proposal }:any) => {
	return <Link to={`/newlife-dao/proposal/${proposal.id}`}>
		<Col className={"proposal-list-card-wrapper"} >
			<Row className="u-dao-card-top-details-wrapper" align={"middle"} justify={"space-between"}>
				<Row className="u-dao-card-top-details-left" align={"middle"}>
					<p className={"proposal-list-id-p"}>#{proposal.id}</p>
					<span className={"proposal-list-hands-icon-span"}><Hands/></span>
					<p className={"proposal-list-title-p"}>{proposal.title}</p>
				</Row>
				<Row className={"u-dao-card-top-details-right"}>
					<Link to={`/newlife-dao/proposal/${proposal.id}`}><Button>View</Button></Link>
				</Row>
			</Row>
			<Row className={"u-dao-card-mid-details-wrapper"}>
				<p className="proposal-list-votes-p">{proposal.votes} Votes</p>
				<ProgressBar width={ "642px" } proposal={ proposal } />
				<Col className={"proposal-list-vote-threshold-and-tooltip-ctn"} >
					<p className="proposal-list-time-left-p">{"Time Left: 3 Days" || proposal.time}</p>
					<Row align={"middle"}>
						<p className="view-proposal-vote-threshold-p">{`Vote Threshold: ${ proposal.vote_threshold || "50" }%`}</p>
						<Tooltip title="The amount of votes it has left to be approved!">
							<Row align={"middle"}>
								<Info color={"white"}/>
							</Row>
						</Tooltip>
					</Row>
				</Col>
			</Row>
			<p className={"proposal-list-summary-p"}> {proposal.summary}</p>
			<p className={"proposal-list-proposal-by-p"}>Proposal by</p>
			<Row className={"u-dao-card-btm-details-wrapper"} >
				<Col className={"proposal-list-card-btm-user-details-left-ctn"}>
					<Link
						className={"proposal-list-proposal-avi-link"}
						to={`/user/${proposal.proposer.username}`}
					> <Avatar
						src={<ContentImage {...proposal.proposer} />}
						className="proposal-list-proposal-avi-cmpt" />
					</Link>
				</Col>
				<Col className={"proposal-list-card-btm-user-details-right-ctn"}>
					<p className={"proposal-list-card-btm-user-display-name-p"}>{proposal.proposer.username || "Creator.io"}</p>
					<p className="paragraph-2r">{proposal.proposer.fullName || "Kadine James"}</p>
				</Col>
			</Row>
		</Col>
	</Link>
}