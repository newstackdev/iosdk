import { DetailedHTMLProps, HTMLAttributes, MouseEventHandler, ReactElement } from "react";
import { EventHandler, IOView } from "../types";
import { Link } from "react-router-dom";
import { UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { UserStake } from "./UserWidget";
import { useActions } from "../overmind";
import { useCurrentUserStakeEligibility } from "../hooks/useBlockchainInfo";

const DefaultPrivateContentView: IOView<{
  stakeInfo: ReturnType<typeof useCurrentUserStakeEligibility>;
  onClick?: MouseEventHandler;
}> = ({ stakeInfo, onClick }) => (
  <div
    {...(onClick ? { onClick } : {})}
    style={{
      position: "absolute",
      left: 0,

      width: "100%",
      padding: 15,
      borderRadius: 30,
      textAlign: "center",

      ...(onClick ? { cursor: "pointer" } : {}),
    }}
  >
    <div
      onClick={(e) => onClick && e.stopPropagation()} // if the onClick above needs to take us to details this will prevent it from getting the event so that
      // we can stake from the list of folders directly
      className="iosdk-premium-content-notification"
      style={{
        background: "rgba(0,0,0,.3)",
        padding: "20px",
        borderRadius: "8px",
        width: "auto",
        maxWidth: "min(100vw,600px)",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      Premium content: stake {stakeInfo.currentUserNeeds} ${stakeInfo.currency} to access.
      <br />
      <br />
      <UserStake onDone={() => {}} user={stakeInfo.owner} />
    </div>
  </div>
);

export const PremiumContent: IOView<
  {
    stakeToAccess?: number;
    owner?: UserReadPublicResponse;
    privateContentView?: IOView<{
      stakeInfo: ReturnType<typeof useCurrentUserStakeEligibility>;
    }>;
    link?: string;
  } & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ stakeToAccess, owner, children, className, style, privateContentView, link, ...rest }) => {
  const actions = useActions();

  const stakeInfo = useCurrentUserStakeEligibility(owner, stakeToAccess);

  const blur = !stakeInfo.currentUserEligible;

  className += "iosdk-premium-content";
  style = {
    ...style,
    ...(blur
      ? {
          filter: "blur(7px)",
        }
      : {}),
  };

  const PrivateContentView = privateContentView || DefaultPrivateContentView;

  const onClick = () => link && actions.routing.historyPush({ location: link });

  if (!blur) return <>{children}</>;
  else
    return (
      <>
        <div
          className="iosdk-premium-content"
          {...(blur
            ? {
                onClickCapture: (e) => {
                  e.preventDefault();
                  onClick();
                },
              }
            : {})}
          {...rest}
          style={style}
        >
          {children}
        </div>
        {blur ? <PrivateContentView stakeInfo={stakeInfo} onClick={onClick} /> : <></>}
      </>
    );
};
