import { Avatar, Col, Row } from "antd";
import { Button } from "antd/lib/radio";
import { ContentImage } from "./Image";
import { ContentLayout } from "./ContentLayout";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { Link } from "react-router-dom";
import { LoadMore } from "./LoadMore";
import { NLView } from "../types";
import { UserPowerup } from "./UserWidget";
import { UserReadPublicResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { VerifiedIcon } from "./Icons/VerifiedIcon";
import { useActions, useAppState } from "../overmind";
import { useCachedPool, useCachedUser } from "../hooks/useCached";
import { useState } from "react";
import { useVerified } from "../hooks/useVerified";
import Title from "../Pages/Explore/Title";

type ICreators = {
  title?: string;
  maxItems?: number;
  users?: UserReadPublicResponse[];
  buttonType?: string;
  setAddedUsers?: React.Dispatch<React.SetStateAction<string[]>>;
  addedUsers?: string[];
};

// export const Creator: NLView

export const CreatorWidget: NLView<{
  creator: UserReadPublicResponse;
  avatarClassName?: string;
  buttonType?: string;
  setAddedUsers: React.Dispatch<any>;
  addedUsers: any;
}> = ({ creator, avatarClassName, buttonType, setAddedUsers, addedUsers }) => {
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
    <Link to={`/user/${user.username}`}>
      <Row className="bg-hover app-full-width" style={{ alignItems: "center", justifyContent: "space-between" }}>
        <Col className="top-creators-first-col u-margin-left-medium" xs={14}>
          <Col>
            <Avatar src={<ContentImage {...user} />} className={avatarClassName} />
          </Col>

          <Row align="bottom">
            <Col className="top-creators-username">
              <p className="top-creators-username__paragraph">
                {user.username}
                {isUserVerified ? (
                  <span className="u-margin-left-medium">
                    <VerifiedIcon />
                  </span>
                ) : (
                  false
                )}
              </p>
              {symbol && (
                <p className="paragraph-1r">
                  powering {creator.powering} {symbol}
                </p>
              )}
            </Col>
          </Row>
        </Col>
        <Col className="top-creators-second-col">
          <Col className="top-creators-number">
            <p
              className="header-1r top-creators-powered"
              style={{
                margin: "0",
                justifyContent: "end",
                display: "flex",
                minWidth: "64px",
              }}
            >
              {creator.powered}
            </p>
          </Col>
          <Col xs={12} style={{ display: "flex", justifyContent: "flex-end", zIndex: 9999 }}>
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
            ) : (
              <div onClick={(e) => e.preventDefault()}>
                <UserPowerup user={creator} />
              </div>
            )}
          </Col>
        </Col>
      </Row>
    </Link>
  );
};

export const CreatorsList: NLView<ICreators> = ({ title, maxItems, users, buttonType, addedUsers, setAddedUsers }) => {
  const state = useAppState();

  maxItems = maxItems || 100;
  users = maxItems ? users?.slice(0, Math.min(users?.length, maxItems)) : users;

  // const creators =
  // 	!users ? state.lists.top.users.items : maxUsers;

  return (
    <>
      {title === undefined && (
        <Row style={{ width: "100%" }}>
          {/* <LargeArrowBack /> */}
          <p className="header-2 u-margin-bottom-medium">Explore top creators</p>
        </Row>
      )}
      <div style={{ width: "100%" }}>
        {maxItems && maxItems !== 100 ? <Title title={title} href="/top/creators" /> : <></>}
        <div className="top-creators-wrapper">
          {users?.map((creator) => (
            <CreatorWidget creator={creator} buttonType={buttonType} setAddedUsers={setAddedUsers!} addedUsers={addedUsers} />
          ))}
        </div>
      </div>
    </>
  );
};

export const Creators: NLView<ICreators> = (props) => {
  return <CreatorsList {...props} />;
};

export const TopCreators: NLView<ICreators> = ({ maxItems, title, buttonType, addedUsers, setAddedUsers }) => {
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
        addedUsers={addedUsers}
        setAddedUsers={setAddedUsers}
      />
      {creators && (creators?.length || 0) < (maxItems || 100) && <LoadMore loadMore={() => actions.lists.top.users()} />}
    </>
  );
};

export default Creators;
