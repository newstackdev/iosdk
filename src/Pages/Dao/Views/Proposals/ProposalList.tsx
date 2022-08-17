import { Avatar, Dropdown, Menu } from "antd-latest";
import { BulkActionModal } from "../../Components/Modals/BulkActionModal";
import { Burger } from "../../../../Components/Icons/Burger";
import { Button, Col, Row } from "antd";
import { ContentImage } from "../../../../Components/Image";
import { Link, useParams } from "react-router-dom";
import { LoadMore } from "../../../../Components/LoadMore";
import { ProposalCard } from "../../Components/Previews/Standard/Card/ProposalCard";
import { ProposalRow } from "../../Components/Previews/Standard/Row/ProposalRow";
import { UserStake } from "../../../../Components/UserWidget";
import { WhitelistCard } from "../../Components/Previews/Whitelist/Card/WhitelistCard";
import { WhitelistProposalRow } from "../../Components/Previews/Whitelist/Row/WhitelistProposalRow";
import { convertDaoProposalsForUI } from "../../Utils/Helpers";
import { useActions, useAppState } from "../../../../overmind";
import {
  useCachedDaoProposals,
  useCachedDaoWhitelist,
  useCachedDaoWhitelistProposals,
  useCachedPool,
  useCachedUser,
} from "../../../../hooks/useCached";
import { useState } from "react";
import ArrowDown from "../../../../Components/Icons/ArrowDown";
import ListToggle from "../../../../Components/Icons/ListToggle";
import MemberRow from "../../Components/Previews/Member/Row/MemberRow";

export const ProposalsPage = () => {
  const { daoOwner } = useParams<{ daoOwner: string; id: string }>();
  return <Proposals daoOwner={daoOwner} />;
};

const Proposals = (props: { daoOwner: string }) => {
  const state = useAppState();
  const actions = useActions();

  const currUser = state.api.auth.user?.username || "";
  const daoOwner = props.daoOwner || state.config.settings.newcoin.daoDomain;
  const ownDao = state.api.auth.user?.username === daoOwner;

  const daoProposals = useCachedDaoProposals({ daoOwner });
  const daoWhitelistProposals = useCachedDaoWhitelistProposals({ daoOwner });
  const daoMembers = useCachedDaoWhitelist({ daoOwner });
  const daoOwnerObj = useCachedUser({ username: daoOwner });
  const pool = useCachedPool({ owner: daoOwner });

  const myPools = state.newcoin.pools || {};
  const stakedAmt = myPools[pool.code];

  const [toggleView, setToggleView] = useState(false);
  const [showProposalType, setShowProposalType] = useState("standard");
  const [bulkAction, setBulkAction] = useState({ state: false, action: "" });
  const [sortSelection, setSortSelection] = useState("all");

  let proposals;
  const proposalTypes = {
    standard: convertDaoProposalsForUI(daoProposals.rows),
    whitelist: convertDaoProposalsForUI(daoWhitelistProposals.rows),
  };
  if (showProposalType == "members") proposals = daoMembers.rows;
  else if (sortSelection == "all") proposals = proposalTypes[showProposalType];
  else {
    proposals = proposalTypes[showProposalType].filter((row) => {
      if (sortSelection == "byMe") return row.proposer == currUser;
      if (sortSelection == "byOthers") return row.proposer != currUser;
      if (sortSelection == "expired") return row.time_data.time_left_seconds < 0;
      if (sortSelection == "needsApproval") return row.status == "created" && row.proposer == currUser;
      if (sortSelection == "needsExecution")
        return row.status == "approved" && row.time_data.time_left_seconds < 0 && row.proposer == currUser;
      if (sortSelection == "needsVoting") return row.status == "approved" && row.time_data.time_left_seconds > 0;
    });
  }

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <p onClick={() => setSortSelection("needsApproval")}>Needs Approval</p>,
        },

        {
          key: "2",
          label: <p onClick={() => setSortSelection("needsVoting")}>Needs Votes</p>,
        },
        {
          key: "3",
          label: <p onClick={() => setSortSelection("needsExecution")}>Needs Execution</p>,
        },
        {
          key: "4",
          label: <p onClick={() => setSortSelection("expired")}>Expired</p>,
        },
        {
          key: "5",
          label: <p onClick={() => setSortSelection("all")}>See All</p>,
        },
        {
          key: "6",
          label: <p onClick={() => setSortSelection("byMe")}>By Me</p>,
        },
        {
          key: "7",
          label: <p onClick={() => setSortSelection("byOthers")}>By Others</p>,
        },
      ]}
    />
  );

  const menu2 = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <p
              onClick={() => {
                setSortSelection("needsApproval");
                setBulkAction({ state: true, action: "approve" });
              }}
            >
              Approve All
            </p>
          ),
        },
        {
          key: "2",
          label: (
            <p
              onClick={() => {
                setSortSelection("needsExecution");
                setBulkAction({ state: true, action: "execute" });
              }}
            >
              Execute All
            </p>
          ),
        },
      ]}
    />
  );

  let proposalsState;
  showProposalType == "whitelist" && (proposalsState = (state.newcoin.daos[daoOwner] || {})["whitelistProposals"] || {});
  showProposalType == "standard" && (proposalsState = (state.newcoin.daos[daoOwner] || {})["standardProposals"] || {});
  showProposalType == "members" && (proposalsState = (state.newcoin.daos[daoOwner] || {})["memberProposals"] || {});

  let inProgress;
  showProposalType == "whitelist" && (inProgress = !!state.indicators.specific[`newcoin.daoGetWhitelistProposals`]);
  showProposalType == "standard" && (inProgress = !!state.indicators.specific[`newcoin.daoGetProposals`]);
  showProposalType == "members" && (inProgress = !!state.indicators.specific[`newcoin.daoGetWhitelist`]);

  const shouldLoadMore = !inProgress && (!proposalsState || proposalsState?.more);
  const loadMore = () => {
    showProposalType == "whitelist" && actions.newcoin.daoGetWhitelistProposals({ daoOwner });
    showProposalType == "standard" && actions.newcoin.daoGetProposals({ daoOwner });
    showProposalType == "members" && actions.newcoin.daoGetWhitelist({ daoOwner });
  };

  if (!inProgress && !daoProposals.dao_id && !ownDao) {
    return window.location.pathname === "/dao/create" ? null : (
      <div className={"dao-not-found"}>
        <h1>Can't find anything!</h1>
        <p>Try to search with another name.</p>
      </div>
    );
  }

  return (
    <Col>
      <Row align={"middle"} className={" u-margin-top-medium  dao-details-ctn"}>
        <Row align={"middle"} className={"dao-details-left"}>
          <Link to={`/user/${daoOwner}`}>
            <Avatar src={<ContentImage {...daoOwnerObj} />} className="dao-owner-avi" />
          </Link>
          <Col>
            <p className={"header-1r"}>{daoOwner} DAO</p>
            <p>
              {" "}
              {Math.round(stakedAmt)} ${pool.code} Staked
            </p>
          </Col>
          <UserStake buttonText={`Get $${pool.code}`} user={{ username: daoOwner }} hideButton={false} />
        </Row>
        <Button className={"power-up-btn"}>
          <Link to={`/dao/${daoOwner}/new-proposal`}>New Proposal</Link>
        </Button>
      </Row>
      <Row justify={"space-between"} align={"middle"} className={"dao-tabs-ctn"}>
        <h2
          className={`menu-h2-${showProposalType == "standard" ? "active" : "inactive"}`}
          onClick={() => setShowProposalType("standard")}
        >
          {" "}
          Proposals
        </h2>
        <h2
          className={`menu-h2-${showProposalType == "whitelist" ? "active" : "inactive"}`}
          onClick={() => setShowProposalType("whitelist")}
        >
          {" "}
          Member Proposals
        </h2>
        <h2
          className={`menu-h2-${showProposalType == "members" ? "active" : "inactive"}`}
          onClick={() => setShowProposalType("members")}
        >
          {" "}
          Members
        </h2>
        {ownDao && (
          <Row>
            <Dropdown overlay={menu2}>
              <a onClick={(e) => e.preventDefault()}>
                <Row className={"menu-h2-inactive u-gap-15"} align={"middle"}>
                  Multi Select
                  <ArrowDown />
                </Row>
              </a>
            </Dropdown>
            {bulkAction.state && (
              <BulkActionModal
                proposals={proposals}
                showProposalType={showProposalType}
                daoId={daoProposals.dao_id}
                actionType={bulkAction.action}
                dao_owner={daoOwner}
              />
            )}
          </Row>
        )}
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Row className={"menu-h2-inactive u-gap-15"} align={"middle"}>
              Sort By
              <ArrowDown />
            </Row>
          </a>
        </Dropdown>
        <Row align={"middle"} onClick={() => setToggleView(!toggleView)}>
          {toggleView ? <Burger /> : <ListToggle />}
        </Row>
      </Row>

      <Row className={"u-gap-40 toggle-wrapper"}>
        {showProposalType == "standard" &&
          proposals
            .reverse()
            .map((proposal) =>
              !toggleView ? (
                <ProposalRow
                  daoOwner={daoOwner}
                  proposal={proposal}
                  proposalId={proposal.id}
                  wrapperClass={"row-wrapper"}
                  buttonType={"view"}
                />
              ) : (
                <ProposalCard daoOwner={daoOwner} proposal={proposal} />
              ),
            )}
        {showProposalType == "whitelist" &&
          proposals
            .reverse()
            .map((proposal) =>
              !toggleView ? (
                <WhitelistProposalRow
                  daoOwner={daoOwner}
                  proposal={proposal}
                  proposalId={proposal.id}
                  wrapperClass={"row-wrapper"}
                  buttonType={"view"}
                />
              ) : (
                <WhitelistCard daoOwner={daoOwner} proposal={proposal} />
              ),
            )}
        {showProposalType == "members" &&
          proposals.map((member) => <MemberRow user={member.user} daoId={daoProposals.dao_id} ticker={pool.code} />)}
        {shouldLoadMore && <LoadMore loadMore={loadMore} />}
      </Row>
    </Col>
  );
};

export default Proposals;
