import { Avatar } from "antd-latest";
import { ContentImage } from "../../../Components/Image";
import { Link } from "react-router-dom";
import { VerifiedIcon } from "../../../Components/Icons/VerifiedIcon";
import { useVerified } from "../../../hooks/useVerified";

export const AviLinkLarge = ({ showVerified, wrapperClass, username, userObj }) => {
  const { verifiedUsers } = useVerified([username || ""]);
  const isUserVerified = verifiedUsers && username && verifiedUsers.includes(username);
  return (
    <div className={wrapperClass || ""}>
      <Link to={`/user/${username}`}>
        <Avatar size={100} src={<ContentImage {...userObj} />} />
      </Link>
      <p className={"header-1r"}>{username} </p>
      {showVerified && isUserVerified && <VerifiedIcon />}
    </div>
  );
};

export const AviLinkMedium = ({ showVerified, wrapperClass, username, userObj }) => {
  const { verifiedUsers } = useVerified([username || ""]);
  const isUserVerified = verifiedUsers && username && verifiedUsers.includes(username);
  return (
    <div className={wrapperClass || ""}>
      <Link to={`/user/${username}`}>
        <Avatar size={75} src={<ContentImage {...userObj} />} />
      </Link>
      <p className={"u-dao-header-2r"}>{username} </p>
      {showVerified && isUserVerified && <VerifiedIcon />}
    </div>
  );
};

export const AviLinkRegular = ({ showVerified, wrapperClass, username, userObj }) => {
  const { verifiedUsers } = useVerified([username || ""]);
  const isUserVerified = verifiedUsers && username && verifiedUsers.includes(username);
  return (
    <div className={wrapperClass || ""}>
      <Link to={`/user/${username}`}>
        <Avatar size={50} src={<ContentImage {...userObj} />} />
      </Link>
      <p className={"header-3"}>{username} </p>
      {showVerified && isUserVerified && <VerifiedIcon />}
    </div>
  );
};
export const AviLinkVariable = ({ showVerified, wrapperClass, aviSize, username, userObj }) => {
  const { verifiedUsers } = useVerified([username || ""]);
  const isUserVerified = verifiedUsers && username && verifiedUsers.includes(username);
  return (
    <div className={wrapperClass || ""}>
      <Link to={`/user/${username}`}>
        <Avatar size={aviSize} src={<ContentImage {...userObj} />} />
      </Link>
      <p className={"header-3"}>{username} </p>
      {showVerified && isUserVerified && <VerifiedIcon />}
    </div>
  );
};
