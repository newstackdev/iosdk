import { Avatar, Col, Row, Tooltip } from "antd";
import { Button } from "antd/lib/radio";
import { ContentImage } from "./Image";
import { CopyClipboardHashInput } from "./CopyClipboardHashInput";
import { Link } from "react-router-dom";
import { LoadMore } from "./LoadMore";
import { NLView } from "../types";
import { UserInvitationReadPublicResponse, UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { UserPowerup } from "./UserWidget";
import { VerifiedIcon } from "./Icons/VerifiedIcon";
import { useActions, useAppState } from "../overmind";
import { useCachedPool, useCachedUser } from "../hooks/useCached";
import { useState } from "react";
import { useVerified } from "../hooks/useVerified";
import BadgeWidget from "./BadgeWidget";
import CountUp from "react-countup";
import PowerupDialog from "../Components/PowerupDialog";
import Title from "../Pages/Explore/Title";

type ICreators = {
  title?: string;
  maxItems?: number;
  users: UserInvitationReadPublicResponse[];
  buttonType?: string;
  setAddedUsers?: React.Dispatch<React.SetStateAction<string[]>>;
  addedUsers?: string[];
  to?: string;
  newPowerup?: boolean;
  columns?: boolean;
  thumbnailOnly?: boolean;
};

// export const Creator: NLView

export const CreatorWidget: NLView<{
  creator: UserInvitationReadPublicResponse;
  avatarClassName?: string;
  buttonType?: string;
  setAddedUsers: React.Dispatch<any>;
  addedUsers: any;
  newPowerup?: boolean;
  thumbnailOnly?: boolean;
}> = ({ creator, avatarClassName, buttonType, setAddedUsers, addedUsers, newPowerup = true, thumbnailOnly = false }) => {
  const state = useAppState();
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const user = useCachedUser(creator); //TODO: use this later when we have infinite load
  const { verifiedUsers } = useVerified([creator.username || ""]);
  const isUserVerified = verifiedUsers && creator.username && verifiedUsers.includes(creator.username);
  avatarClassName = avatarClassName || "avatar-image-top-creators";
  const buttonClassName = activeButton ? "primary-green-btn" : "secondary-button";
  const buttonName = activeButton ? "Added!" : "Add";

  const poolInfo = useCachedPool({ owner: creator?.username });
  const symbol = poolInfo.code;

  return (
    <Row className="bg-hover app-full-width" style={{ alignItems: "center", justifyContent: "space-between" }}>
      <Col className="top-creators-first-col" xs={13}>
        <Col>
          <Tooltip title={creator.username}>
            <Link to={`/user/${creator.username || creator.fullName}`}>
              <Avatar src={<ContentImage {...creator} />} className={avatarClassName} />
            </Link>
          </Tooltip>
        </Col>
        {!thumbnailOnly && (
          <Row align="bottom" style={{ overflow: "hidden" }}>
            <Col className="top-creators-username" style={{ overflow: "hidden" }}>
              <Row justify="center">
                <Link to={`/user/${creator.username || creator.fullName}`} style={{ width: "100%" }}>
                  <p className="top-creators-username__paragraph typography-overflow">
                    {creator.username || creator.fullName}
                    {isUserVerified ? (
                      <span className="u-margin-left-medium">
                        <VerifiedIcon />
                      </span>
                    ) : (
                      false
                    )}
                  </p>
                </Link>
              </Row>
              {state.routing.location === "/user/invite" && (
                <Row justify="center">
                  <BadgeWidget user={creator} className="nl-badges-creators" />
                </Row>
              )}
            </Col>
          </Row>
        )}
      </Col>

      {!thumbnailOnly && (
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
              {/** */}
              {/**@ts-ignore */}
              <CountUp delay={1} end={creator.watts} />
            </p>
          </Col>
          <Col style={{ display: "flex", justifyContent: "flex-end", zIndex: 9999 }}>
            {buttonType === "addUser" ? (
              <Button
                onClick={() => {
                  if (addedUsers.includes(creator.username)) {
                    const arr = [...addedUsers];
                    const index = arr.indexOf(creator.username);
                    index !== -1 && arr.splice(index, 1);
                    setAddedUsers(arr);
                  } else {
                    setAddedUsers((p) => [...p, creator.username]);
                  }
                  setActiveButton(!activeButton);
                }}
                className={`${buttonClassName} u-margin-bottom-medium`}
              >
                <span className="paragraph-2b">{buttonName}</span>
              </Button>
            ) : newPowerup ? (
              <div onClick={(e) => e.preventDefault()}>
                <PowerupDialog user={creator} />
              </div>
            ) : (
              <div onClick={(e) => e.preventDefault()}>
                <UserPowerup user={creator} />
              </div>
            )}
          </Col>
        </Col>
      )}
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
  newPowerup,
  columns,
  thumbnailOnly,
}) => {
  users = maxItems ? users?.slice(0, Math.min(users?.length, maxItems)) : users;

  const t = users.find((creator) => creator.invitation) ? "My invited members" : "Explore top creators";

  return (
    <>
      {title === undefined && (
        <Row style={{ width: "100%" }}>
          <p className="header-2 u-margin-bottom-medium">{t}</p>
        </Row>
      )}
      {thumbnailOnly ? (
        <>
          {maxItems ? <Title title={title} href={to} /> : <></>}
          {users?.map((creator) => (
            <div>
              <CreatorWidget
                creator={creator}
                buttonType={buttonType}
                setAddedUsers={setAddedUsers!}
                addedUsers={addedUsers}
                newPowerup={newPowerup}
                thumbnailOnly={thumbnailOnly}
              />
            </div>
          ))}
        </>
      ) : (
        <div style={{ width: "100%" }}>
          {maxItems ? <Title title={title} href={to} /> : <></>}
          <div className={columns ? "top-creators-columns" : ""} style={title ? { display: "flex", flexWrap: "wrap" } : {}}>
            {users?.map((creator) => (
              <div>
                <CreatorWidget
                  creator={creator}
                  buttonType={buttonType}
                  setAddedUsers={setAddedUsers!}
                  addedUsers={addedUsers}
                  newPowerup={newPowerup}
                  thumbnailOnly={thumbnailOnly}
                />
              </div>
            ))}
          </div>
        </div>
      )}
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
        users={creators as (UserReadPublicResponse & { watts: number })[]}
        maxItems={maxItems}
        title={title}
        buttonType={buttonType}
        setAddedUsers={setAddedUsers}
        addedUsers={addedUsers}
        to={to}
        columns={true}
      />
      {creators && (creators?.length || 0) < (maxItems || 100) && <LoadMore loadMore={() => actions.lists.top.users({})} />}
    </>
  );
};

export default Creators;
