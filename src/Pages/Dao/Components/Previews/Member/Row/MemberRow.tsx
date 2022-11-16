import { AviLinkMedium } from "../../../AviLink";
import { useAppState } from "../../../../../../overmind";
import { useCachedUser } from "../../../../../../hooks/useCached";

const MemberRow = ({ user, daoId, ticker }: any) => {
  const state = useAppState();
  const userObj = useCachedUser({ username: user });

  let votes = state.newcoin.cache.votes[user]?.rows;
  let amtLocked;

  if (votes?.length) {
    let quantities = votes && votes?.filter((row) => row.dao_id == daoId).map((vote) => vote.quantity?.quantity);
    if (quantities?.length) {
      let amtsLocked = quantities && quantities?.map((qt) => Number(qt?.split(" ")[0]));
      if (amtsLocked?.length) {
        amtLocked = amtsLocked?.reduce((a, b) => a + b);
      }
    }
  }

  return (
    <div className="member-row-wrapper">
      <AviLinkMedium showVerified={true} wrapperClass="avi" username={user} userObj={userObj} />
      <p className={"member-row-p"}>
        {amtLocked || 0} ${ticker}
      </p>
    </div>
  );
};

export default MemberRow;
