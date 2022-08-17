import { Button } from "antd";
import { Discord } from "./Icons/Discord";
import { FacebookIcon } from "./Icons/FacebookIcon";
import { Instagram } from "./Icons/Instagram";
import { NLView } from "../types";
import { PinterestIcon } from "./Icons/PinterestIcon";
import { Soundcloud } from "./Icons/Soundcloud";
import { TumblrIcon } from "./Icons/TumblrIcon";
import { TwitterIcon } from "./Icons/TwitterIcon";
import { UserReadPrivateResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { YoutubeIcon } from "./Icons/YouTubeIcon";

export const SocialLink: NLView<{
  platform: string;
  user: UserReadPrivateResponse;
  disableLink?: boolean;
}> = ({ platform, user, disableLink }) => {
  const getSocialIcon = () => {
    switch (platform) {
      case "instagram":
        return <Instagram />;
      case "tumblr":
        return <TumblrIcon />;
      case "twitter":
        return <TwitterIcon />;
      case "youtube":
        return <YoutubeIcon />;
      case "pinterest":
        return <PinterestIcon />;
      case "facebook":
        return <FacebookIcon />;
      case "soundcloud":
        return <Soundcloud />;
      case "discord":
        return <Discord />;
    }
  };

  const getSocialLink = () => {
    switch (platform) {
      case "tumblr":
        return `https://${user[platform]}.${platform}.com`;
      case "youtube":
        return `https://${platform}.com/c/${user[platform]}`;
      default:
        return `https://${platform}.com/${user[platform]}`;
    }
  };

  return disableLink ? (
    <span className="nl-socialIcon">{getSocialIcon()}</span>
  ) : user[platform] ? (
    <Button className="stroke-btn-white nl-user-widget-heading__social-btn">
      <a
        href={getSocialLink()}
        target="_blank"
        rel="noreferrer"
        className={`nl-socialIcon ${
          user.verifiedSocialIds?.includes(platform) ? "nl-verifyIcon-active" : "nl-verifyIcon-disabled"
        }`}
      >
        {platform === "youtube" ? console.log(user) : false}
        <span className="paragraph-3b ">{platform}</span>
      </a>
    </Button>
  ) : (
    <></>
  );
};
