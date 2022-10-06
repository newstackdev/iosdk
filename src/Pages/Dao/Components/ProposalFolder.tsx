import { useCachedMood } from "../../../hooks/useCached";
import TopFolders from "../../../Components/TopFolders";

export const ProposalFolder = ({ proposal }: { proposal: { url?: string } }) => {
  const maybeProposalFolderId = (proposal.url?.match(/newlife.io\/folder\/([^\/]+)$/) || [])[1];
  const maybeProposalFolder = useCachedMood({ id: maybeProposalFolderId });

  return maybeProposalFolderId && maybeProposalFolder ? (
    <TopFolders
      userMoods={[maybeProposalFolder]}
      maxItems={5}
      maxPostsToShow={5}
      title=""
      enableScrollForMoreMoods={false}
      randomizeMoods={false}
    />
  ) : (
    <></>
  );
};
