import { Avatar, Row } from "antd";
import { ContentImage } from "../../../../../../Components/Image";
import { Link } from "react-router-dom";
import { VerifiedIcon } from "../../../../../../Components/Icons/VerifiedIcon";
import { useAppState } from "../../../../../../overmind";
import { useCachedDaoWhitelist, useCachedPool, useCachedUser } from "../../../../../../hooks/useCached";
import { useVerified } from "../../../../../../hooks/useVerified";
import map from "lodash/map";

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

  const { verifiedUsers } = useVerified(map(useCachedDaoWhitelist().rows as string[], "user"));
  const isUserVerified = verifiedUsers && user && verifiedUsers.includes(user);

  return (
    <Link className={""} to={`/user/${user}`}>
      <Row align={"middle"} className={"member-row-wrapper"}>
        <Row>
          <Link to={`/user/${user}`}>
            <Avatar src={<ContentImage {...userObj} />} className="member-row-avi" />
          </Link>
          <Row align={"middle"} className={"member-row-user-ctn"}>
            <p className={"member-row-p"}>{user || "Creator.io"}</p>
            {isUserVerified && <VerifiedIcon />}
          </Row>
        </Row>
        <Row align={"middle"}>
          <p className={"member-row-p"}>
            {amtLocked || 0} ${ticker}
          </p>
        </Row>
      </Row>
    </Link>
  );
};

export default MemberRow;
