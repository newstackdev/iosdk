import { OverridableRoute } from "../../Components/OverridableRoute";
import { ProposalsPage } from "./Views/Proposals/ProposalList";
import { ViewProposalPage } from "./Views/ProposalView/ViewProposal";
import { ViewWhitelistProposalPage } from "./Views/WhitelistProposalView/ViewWhitelistProposal";
import DaoCreate from "./Views/DaoCreate/DaoCreate";
import NewProposal from "./Views/NewProposal/NewProposal";

export const daoRoutes = [
  <OverridableRoute key="da" exact path="/dao/:daoOwner/proposal/:id" component={ViewProposalPage} />,
  <OverridableRoute key="db" exact path="/dao/:daoOwner/member-proposal/:id" component={ViewWhitelistProposalPage} />,
  <OverridableRoute key="dc" exact path="/dao/:daoOwner/proposals/:type?" component={ProposalsPage} />,
  <OverridableRoute key="dd" exact path="/dao/:daoOwner/new-proposal" component={NewProposal} />,
  <OverridableRoute key="de" exact path="/dao/create" component={DaoCreate} />,
  <OverridableRoute key="df" exact path="/dao/:daoOwner" component={ProposalsPage} />,

  <OverridableRoute key="da" exact path="/dao/proposal/:id" component={ViewProposalPage} />,
  <OverridableRoute key="db" exact path="/dao/member-proposal/:id" component={ViewWhitelistProposalPage} />,
  //   <OverridableRoute key="dc" exact path="/dao/proposals/:type?" component={ProposalsPage} />,
  <OverridableRoute key="dd" exact path="/dao/new-proposal" component={NewProposal} />,
];
