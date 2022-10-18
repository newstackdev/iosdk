import { Avatar, Col, Row } from "antd";
import { Button } from "antd/lib/radio";
import { Clipboard } from "./Icons/Clipboard";
import { ContentImage } from "./Image";
import { ContentLayout } from "./ContentLayout";
import { CopyClipboardHashInput } from "./CopyClipboardHashInput";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { Link } from "react-router-dom";
import { LoadMore } from "./LoadMore";
import { NLView } from "../types";
import { UserInvitationReadPublicResponse, UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { UserPowerup, UserStake } from "./UserWidget";
import { VerifiedIcon } from "./Icons/VerifiedIcon";
import { useActions, useAppState } from "../overmind";
import { useCachedPool, useCachedUser } from "../hooks/useCached";
import { useState } from "react";
import { useVerified } from "../hooks/useVerified";
import Title from "../Pages/Explore/Title";

type ICreators = {
  title?: string;
  maxItems?: number;
  users: UserInvitationReadPublicResponse[];
  buttonType?: string;
  setAddedUsers?: React.Dispatch<React.SetStateAction<string[]>>;
  addedUsers?: string[];
  to?: string;
  stakeMode?: boolean;
};

// export const Creator: NLView

export const CreatorWidget: NLView<{
  creator: UserInvitationReadPublicResponse;
  avatarClassName?: string;
  buttonType?: string;
  setAddedUsers: React.Dispatch<any>;
  addedUsers: any;
  stakeMode?: boolean;
}> = ({ creator, avatarClassName, buttonType, setAddedUsers, addedUsers, stakeMode = false }) => {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const user = useCachedUser(creator);
  const { verifiedUsers } = useVerified([user.username || ""]);
  const isUserVerified = verifiedUsers && user.username && verifiedUsers.includes(user.username);
  avatarClassName = avatarClassName || "avatar-image-top-creators";
  const buttonClassName = activeButton ? "primary-green-btn" : "secondary-button";
  const buttonName = activeButton ? "Added!" : "Add";

  const poolInfo = useCachedPool({ owner: user?.username });
  const symbol = poolInfo.code;

  return (
    <Row className="bg-hover app-full-width" style={{ alignItems: "center", justifyContent: "space-between" }}>
      <Col className="top-creators-first-col u-margin-left-medium" xs={13}>
        <Col>
          <Avatar src={<ContentImage {...user} />} className={avatarClassName} />
        </Col>
        <Row align="bottom" style={{ overflow: "hidden" }}>
          <Col className="top-creators-username" style={{ overflow: "hidden" }}>
            <Link to={`/user/${user.username || user.fullName}`} style={{ width: "100%" }}>
              <p className="top-creators-username__paragraph typography-overflow">
                {user.username || user.fullName}
                {isUserVerified ? (
                  <span className="u-margin-left-medium">
                    <VerifiedIcon />
                  </span>
                ) : (
                  false
                )}
              </p>
            </Link>

            {symbol && (
              <p className="paragraph-1r typography-overflow">
                {stakeMode ? "staking " : "powering "}
                {creator.powering} ${symbol}
              </p>
            )}
          </Col>
        </Row>
      </Col>

      <Col className="top-creators-second-col" xl={10}>
        {creator.invitation && creator.invitation.hash && <CopyClipboardHashInput hash={creator.invitation.hash} />}
        <Col className="top-creators-number">
          <p
            className="header-1r top-creators-powered"
            style={{
              margin: "0",
              display: "flex",
              minWidth: "64px",
            }}
          >
            {creator.powered}
          </p>
        </Col>
        <Col style={{ display: "flex", justifyContent: "flex-end", zIndex: 9999 }}>
          {buttonType === "addUser" ? (
            <Button
              onClick={() => {
                if (addedUsers.includes(user.username)) {
                  const arr = [...addedUsers];
                  const index = arr.indexOf(user.username);
                  index !== -1 && arr.splice(index, 1);
                  setAddedUsers(arr);
                } else {
                  setAddedUsers((p) => [...p, user.username]);
                }
                setActiveButton(!activeButton);
              }}
              className={`${buttonClassName} u-margin-bottom-medium`}
            >
              <span className="paragraph-2b">{buttonName}</span>
            </Button>
          ) : stakeMode ? (
            <div onClick={(e) => e.preventDefault()}>
              <UserStake user={creator} />
            </div>
          ) : (
            <div onClick={(e) => e.preventDefault()}>
              <UserPowerup user={creator} />
            </div>
          )}
        </Col>
      </Col>
    </Row>
  );
};

export const CreatorsList: NLView<ICreators> = ({
  title,
  maxItems,
  users,
  buttonType,
  addedUsers,
  setAddedUsers,
  to,
  stakeMode,
}) => {
  users = maxItems ? users?.slice(0, Math.min(users?.length, maxItems)) : users;

  const t = users.find((creator) => creator.invitation) ? "My invited members" : "Explore top creators";

  // const creators =
  // 	!users ? state.lists.top.users.items : maxUsers;

  return (
    <>
      {title === undefined && (
        <Row style={{ width: "100%" }}>
          <p className="header-2 u-margin-bottom-medium">{t}</p>
        </Row>
      )}
      <div style={{ width: "100%" }}>
        {maxItems ? <Title title={title} href={to} /> : <></>}
        <div className="top-creators-wrapper" style={title ? { display: "flex", flexWrap: "wrap" } : {}}>
          {users?.map((creator) => (
            <div>
              <CreatorWidget
                creator={creator}
                buttonType={buttonType}
                setAddedUsers={setAddedUsers!}
                addedUsers={addedUsers}
                stakeMode={stakeMode}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const Creators: NLView<ICreators> = (props) => {
  return <CreatorsList {...props} />;
};

export const TopCreators: NLView<ICreators> = ({ maxItems, title, buttonType, setAddedUsers, addedUsers, to }) => {
  const state = useAppState();
  const actions = useActions();

  const creators = maxItems ? state.lists.top.users.items.slice(0, maxItems) : state.lists.top.users.items;

  return (
    <>
      <CreatorsList
        users={creators as UserReadPublicResponse[]}
        maxItems={maxItems}
        title={title}
        buttonType={buttonType}
        setAddedUsers={setAddedUsers}
        addedUsers={addedUsers}
        to={to}
      />
      {creators && (creators?.length || 0) < (maxItems || 100) && <LoadMore loadMore={() => actions.lists.top.users()} />}
    </>
  );
};

export default Creators;
