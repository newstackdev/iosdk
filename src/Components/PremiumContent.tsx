import { DetailedHTMLProps, HTMLAttributes, MouseEventHandler, ReactElement } from "react";
import { EventHandler, IOView } from "../types";
import { Link } from "react-router-dom";
import { UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { UserStake } from "./UserWidget";
import { round } from "lodash";
import { useActions } from "../overmind";
import { useCurrentUserStakeEligibility } from "../hooks/useBlockchainInfo";
import React from "react";

const DefaultPrivateContentView: IOView<{
  stakeInfo: ReturnType<typeof useCurrentUserStakeEligibility>;
  onClick?: MouseEventHandler;
}> = ({ stakeInfo, onClick }) => (
  <div
    {...(onClick ? { onClick } : {})}
    style={{
      position: "absolute",
      left: 0,
      top: 1,
      width: "100%",
      height: "calc(100% - 2px)",
      padding: 15,
      borderRadius: 30,
      textAlign: "center",

      ...(onClick ? { cursor: "pointer" } : {}),
    }}
  >
    <div
      style={{
        backdropFilter: "blur(10px)",
        opacity: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {/* xyz */}
    </div>
    <div
      onClick={(e) => onClick && e.stopPropagation()} // if the onClick above needs to take us to details this will prevent it from getting the event so that
      // we can stake from the list of folders directly
      className="iosdk-premium-content-notification"
      style={{
        background: "rgba(0,0,0,.05)",
        padding: "20px",
        borderRadius: "8px",
        width: "90%",
        maxWidth: "min(100vw,800px)",
        marginLeft: "auto",
        marginRight: "auto",
        // height: "100%",
        top: "10%",
        left: "50%",
        transform: "translate(-50%, 0)",
        position: "absolute",
      }}
    >
      Premium content: stake {round(stakeInfo.currentUserNeeds, 2)} ${stakeInfo.currency} to access.
      <br />
      <UserStake stakeInNewsafe={true} onDone={() => {}} user={stakeInfo.owner} />
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
          filter: "blur(2px)",
        }
      : {}),
  };

  const PrivateContentView = privateContentView || DefaultPrivateContentView;

  const onClick = () => link && actions.routing.historyPush({ location: link });

  if (!blur) return <>{children}</>;
  else
    return (
      <>
        {/* <div
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
    
        </div> */}
        {React.Children.map(children, (c: React.ReactNode) => {
          return React.cloneElement(c as any, { onClick });
        })}
        {/* {children} */}
        {blur ? <PrivateContentView stakeInfo={stakeInfo} onClick={onClick} /> : <></>}
      </>
    );
};
