import { AviLinkMedium } from "../../../AviLink";
import { Link } from "react-router-dom";
import { useAppState } from "../../../../../../overmind";
import { useCachedUser } from "../../../../../../hooks/useCached";

export const MemberCard = ({ user, daoId, ticker }: any) => {
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
    <Link className={""} to={`/user/${user}`}>
      <div className={"member-card-ctn"}>
        <AviLinkMedium showVerified={true} wrapperClass="avi" username={user} userObj={userObj} />
      </div>
    </Link>
  );
};
