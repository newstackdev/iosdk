import { Avatar, Dropdown, Menu, Space } from "antd-latest";
import { Burger } from "../../../../Components/Icons/Burger";
import { Button, Col, Row } from "antd";
import { ContentImage } from "../../../../Components/Image";
import { Link, useParams } from "react-router-dom";
import { LoadMore } from "../../../../Components/LoadMore";
import { ProposalCard } from "../../Components/Previews/Standard/Card/ProposalCard";
import { ProposalRow } from "../../Components/Previews/Standard/Row/ProposalRow";
import { UserStake } from "../../../../Components/UserWidget";
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
import MemberRow from "../../Components/Previews/Member/MemberRow";

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

  const pool = useCachedPool({ owner: daoOwner });
  const myPools = state.newcoin.pools || {};
  let stakedAmt = myPools[pool.code];

  const daoProposals = useCachedDaoProposals({ daoOwner });
  const daoWhitelistProposals = useCachedDaoWhitelistProposals({ daoOwner });
  const daoMembers = useCachedDaoWhitelist({ daoOwner });

  const [toggleView, setToggleView] = useState(false);
  const Toggle = () => setToggleView(!toggleView);

  const [showProposalType, setShowProposalType] = useState("standard");

  const showWhitelistProposals = () => {
    setShowProposalType("whitelist");
  };
  const showStandardProposals = () => {
    setShowProposalType("standard");
  };
  const showMembersProposals = () => {
    setShowProposalType("members");
  };

  const [sortSelection, setSortSelection] = useState("all");

  let proposals;
  if (sortSelection == "all") {
    showProposalType == "standard" && (proposals = convertDaoProposalsForUI(daoProposals.rows));
    showProposalType == "whitelist" && (proposals = convertDaoProposalsForUI(daoWhitelistProposals.rows));
    showProposalType == "members" && (proposals = daoMembers.rows);
  }
  if (sortSelection == "byMe") {
    !showProposalType && (proposals = convertDaoProposalsForUI(daoProposals.rows)?.filter((row) => row.proposer == currUser));
    showProposalType &&
      (proposals = convertDaoProposalsForUI(daoWhitelistProposals.rows)?.filter((row) => row.proposer == currUser));
  }
  if (sortSelection == "byOthers") {
    !showProposalType && (proposals = convertDaoProposalsForUI(daoProposals.rows)?.filter((row) => row.proposer != currUser));
    showProposalType &&
      (proposals = convertDaoProposalsForUI(daoWhitelistProposals.rows)?.filter((row) => row.proposer != currUser));
  }
  if (sortSelection == "expired") {
    !showProposalType &&
      (proposals = convertDaoProposalsForUI(daoProposals.rows)?.filter((row) => row.time_data.time_left_minutes < 0));
    showProposalType &&
      (proposals = convertDaoProposalsForUI(daoWhitelistProposals.rows)?.filter((row) => row.time_data.time_left_minutes < 0));
  }
  if (sortSelection == "needsApproval") {
    !showProposalType &&
      (proposals = convertDaoProposalsForUI(daoProposals.rows)?.filter(
        (row) => row.status == "created" && row.time_data.time_left_minutes > 0,
      ));
    showProposalType &&
      (proposals = convertDaoProposalsForUI(daoWhitelistProposals.rows)?.filter(
        (row) => (row.status = "created" && row.time_data.time_left_minutes > 0),
      ));
  }
  if (sortSelection == "needsExecution") {
    !showProposalType &&
      (proposals = convertDaoProposalsForUI(daoProposals.rows)?.filter(
        (row) =>
          row.status == "approved" &&
          row.time_data.time_left_minutes < 0 &&
          (row.vote_no.quantity[0] !== "0" || row.vote_yes.quantity[0] != "0"),
      ));
    showProposalType &&
      (proposals = convertDaoProposalsForUI(daoWhitelistProposals.rows)?.filter(
        (row) =>
          row.status == "approved" &&
          row.time_data.time_left_minutes < 0 &&
          (row.vote_no.quantity[0] !== "0" || row.vote_yes.quantity[0] !== "0"),
      ));
  }
  if (sortSelection == "needsVoting") {
    !showProposalType &&
      (proposals = convertDaoProposalsForUI(daoProposals.rows)?.filter(
        (row) => row.status == "approved" && row.time_data.time_left_minutes > 0,
      ));
    showProposalType &&
      (proposals = convertDaoProposalsForUI(daoWhitelistProposals.rows)?.filter(
        (row) => row.status == "approved" && row.time_data.time_left_minutes > 0,
      ));
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

  const daoOwnerObj = useCachedUser({ username: daoOwner });

  if (!inProgress && !daoProposals.dao_id && !ownDao) {
    return window.location.pathname === "/dao/create" ? null : (
      <p className="paragraph-2b">User {daoOwner} had not created their dao yet.</p>
    );
  }

  return (
    <Col>
      <Row align={"middle"} className={"dao-details-ctn"}>
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
          <div>
            <UserStake buttonText={`Get $${pool.code}`} user={{ username: daoOwner }} hideButton={false} />
          </div>
        </Row>
        <Button type={"primary"} className={"new-proposal-btn"}>
          <Link to={`/dao/${daoOwner}/new-proposal`}>New Proposal</Link>
        </Button>
      </Row>

      <Row>
        <Row align={"middle"} className={"dao-tabs-ctn"}>
          <h2 className={`menu-h2-${showProposalType == "standard" ? "active" : "inactive"}`} onClick={showStandardProposals}>
            {" "}
            Proposal History
          </h2>
          <h2 className={`menu-h2-${showProposalType == "whitelist" ? "active" : "inactive"}`} onClick={showWhitelistProposals}>
            {" "}
            Members Proposals
          </h2>
          <h2 className={`menu-h2-${showProposalType == "members" ? "active" : "inactive"}`} onClick={showMembersProposals}>
            {" "}
            Members
          </h2>

          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Sort By
                <ArrowDown />
              </Space>
            </a>
          </Dropdown>

          <Row onClick={Toggle}>{toggleView ? <Burger /> : <ListToggle />}</Row>
        </Row>
      </Row>
      <div className={"toggle-wrapper"}>
        {showProposalType == "standard" &&
          proposals.reverse().map((proposal) =>
            !toggleView ? (
              <ProposalRow
                daoOwner={daoOwner}
                proposal={proposal}
                proposalId={proposal.id}
                wrapperClass={"row-wrapper"}
                buttonType={"view"}
              />
            ) : (
              // <Row justify={"space-between"}>
              <ProposalCard daoOwner={daoOwner} proposal={proposal} />
              // </Row>
            ),
          )}
        {showProposalType == "whitelist" &&
          proposals.reverse().map((proposal) =>
            !toggleView ? (
              <WhitelistProposalRow
                daoOwner={daoOwner}
                proposal={proposal}
                proposalId={proposal.id}
                wrapperClass={"row-wrapper"}
                buttonType={"view"}
              />
            ) : (
              <Row justify={"space-between"}>
                <ProposalCard daoOwner={daoOwner} proposal={proposal} />
              </Row>
            ),
          )}
        {showProposalType == "members" &&
          proposals.map((member) => <MemberRow user={member.user} daoId={daoProposals.dao_id} ticker={pool.code} />)}
        {shouldLoadMore && <LoadMore loadMore={loadMore} />}
      </div>
    </Col>
  );
};

export default Proposals;
