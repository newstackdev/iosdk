import { Row, Button, Col } from "antd";
import ArrowDown from '../../Components/Icons/ArrowDown';
import ListToggle from '../../Components/Icons/ListToggle';
import { Burger } from '../../Components/Icons/Burger';
import { Link, useParams } from "react-router-dom";
import { useAppState } from "../../overmind";
import { useState, useEffect } from "react";
import { useCachedDaoProposals } from "src/hooks/useCached";
import { convertDaoProposalsForUI, createSeedProposalsForUI } from "./Utils/Helpers";
import { ProposalRow, ProposalCard } from "./Components/UI-Elements";

export const ProposalsPage = () => {
	const { daoOwner, id } = useParams<{ daoOwner: string, id: string }>();
	return <Proposals daoOwner={ daoOwner } />
}

const Proposals = ( props: { daoOwner: string } ) => {
	const state = useAppState();
	const daoOwner = props.daoOwner || state.config.settings.newcoin.daoDomain;
	const daoProposals = useCachedDaoProposals( { daoOwner } );
	const ownDao = state.api.auth.user?.username === daoOwner;

	const [ toggleView, setToggleView ] = useState( false );
	const [ proposals, setProposals ] = useState<any[]>([]) ;

	const Toggle = () => setToggleView( !toggleView );
	const ProcessDaoProposalsForUi = async () => {
		if(daoProposals.rows?.length){
			setProposals( convertDaoProposalsForUI( daoProposals.rows ) );
		// } else {
		// 	setProposals( createSeedProposalsForUI() );
		}
	};

	useEffect( () => { ProcessDaoProposalsForUi() }, [] );

	if(daoProposals.dao_id) {
		return <>
			{
				ownDao ?
					<>
						You have not created your DAO yet. Creating a DAO is easy:&nbsp;
						<Link to="/dao/create">click here to start</Link>
					</> :
					<>
						User {daoOwner} had not created their dao yet.
					</>
			}
		</>
	}

	return <Col className={"u-dao-page-wrapper"}>
		<Row className={ "u-dao-menu-wrapper" } justify={ "space-between" }>
			<Row align={ "middle" }>
				<h2 className="proposal-list-menu-community-history-h2">Community history</h2>
				<Row className={ "proposal-list-menu-sort-ctn" }>
					<p className={ "proposal-list-menu-sort-p" }>Sort by</p>
					<ArrowDown/>
				</Row>
				<Row onClick={ Toggle }>
					{ toggleView ? <Burger/> : <ListToggle/> }
				</Row>
			</Row>
			<Button type={ "primary" }>
				<Link to={ "/newlife-dao/new-proposal" }>New Proposal</Link>
			</Button>
		</Row>
		<Col className={"u-dao-view-toggle-wrapper"}>
			{ !toggleView
				? ( proposals || [] ).map( proposal => <ProposalRow daoOwner={daoOwner} proposal={ proposal } buttonType={"View"} wrapperClass={"proposal-list-row-wrapper app-main-full-width"} /> )
				: <Row justify={"space-between"}>
					{ ( proposals || [] ).map( proposal => <ProposalCard proposal={ proposal } /> )}
				</Row>
			}
		</Col>
	</Col>
};

export default Proposals;