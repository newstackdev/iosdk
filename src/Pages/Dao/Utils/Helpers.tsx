import { ProposalOnUI } from "./Models";
import { useAppState } from "../../../overmind";
import { useCachedDaoWhitelist, useCachedPool } from "../../../hooks/useCached";
import moment from "moment";

export const convertDaoProposalsForUI = (proposalsFromBackend): Array<any> => {
  let convertedProposals: Array<any> = [];

  proposalsFromBackend?.map((proposal) => {
    let convertedProposal = {
      ...proposal,
      time_data: getLocalTimeData(proposal),
    };
    convertedProposals.push(convertedProposal);
  });
  return convertedProposals;
};

export const getLocalTimeData = (proposal) => {
  const voteStartDateLocal = new Date(proposal.vote_start + "Z").toUTCString();
  const voteEndDateLocal = new Date(proposal.vote_end + "Z").toUTCString();
  const timeLeftInSeconds = moment(proposal.vote_end + "Z").diff(moment(), "seconds");
  const timeLeftFromNow = moment(new Date(proposal.vote_end + "Z")).fromNow();

  return {
    time_start_date: voteStartDateLocal,
    time_end_date: voteEndDateLocal,
    time_left_seconds: timeLeftInSeconds,
    time_left_from_now: timeLeftFromNow,
  };
};

export const useGetAuthorizedActions = ({ daoOwner, proposalId, proposal, currUser, proposal_type }) => {
  const state = useAppState();

  const pool = useCachedPool({ owner: daoOwner });
  const myPools = state.newcoin.pools || {};
  const timeData = getLocalTimeData(proposal);

  const isOwner = currUser === daoOwner;
  let hasStaked = myPools[pool.code];
  hasStaked = hasStaked > 0;

  let votes = state.newcoin.cache.votes[currUser]?.rows;
  votes = votes?.filter((row) => row.proposal_type == proposal_type && row.proposal_id == proposalId);
  const alreadyVoted = votes?.some(
    (row) => row.dao_id == proposal.dao_id && row.proposal_id == proposalId && row.lock_end_date == proposal.vote_end,
  );
  const vote = votes?.find(
    (row) => row.dao_id == proposal.dao_id && row.proposal_id == proposalId && row.lock_end_date == proposal.vote_end,
  );
  const isWhitelisted = useCachedDaoWhitelist(daoOwner).rows?.some((row) => row.user == currUser);
  const beforeExpiry = Number(timeData.time_left_seconds) >= 0;

  let { status_tag, action_type } = {
    status_tag: "",
    action_type: "",
  };

  if (proposal.status == "created") {
    if (isOwner) {
      if (beforeExpiry) {
        status_tag = "created";
        action_type = "Approve";
      } else {
        status_tag = "expired";
        action_type = "Approve";
      }
    } else if (!isOwner) {
      if (beforeExpiry) {
        status_tag = "created";
        action_type = "View";
      } else {
        status_tag = "expired";
        action_type = alreadyVoted ? "Withdraw" : "View";
      }
    }
  } else if (proposal.status == "approved") {
    if (isOwner) {
      if (beforeExpiry) {
        status_tag = "live";
        if (hasStaked && !alreadyVoted) {
          action_type = "Vote";
        } else if (alreadyVoted) {
          action_type = "Voted";
        } else if (!hasStaked) {
          action_type = "Stake";
        }
      } else {
        status_tag = "expired";
        action_type = alreadyVoted ? "Withdraw" : "Execute";
      }
    } else if (!isOwner) {
      if (Number(timeData.time_left_seconds) >= 0) {
        status_tag = "live";
        if (!isWhitelisted) {
          action_type = "GetWhitelisted";
        } else if (alreadyVoted) {
          action_type = "Voted";
        } else if (hasStaked) {
          action_type = "Vote";
        } else if (!hasStaked) {
          action_type = "Stake";
        }
      } else {
        status_tag = "expired";
        action_type = alreadyVoted ? "Withdraw" : "View";
      }
    }
  }
  return { status_tag, action_type, vote, timeData };
};
