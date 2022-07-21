import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Discord } from "./Icons/Discord";
import { FacebookIcon } from "./Icons/FacebookIcon";
import { Instagram } from "./Icons/Instagram";
import { PinterestIcon } from "./Icons/PinterestIcon";
import { Soundcloud } from "./Icons/Soundcloud";
import { TumblrIcon } from "./Icons/TumblrIcon";
import { TwitterIcon } from "./Icons/TwitterIcon";
import { YoutubeIcon } from "./Icons/YouTubeIcon";
export const SocialLink = ({ platform, user, disableLink }) => {
    const getSocialIcon = () => {
        switch (platform) {
            case "instagram":
                return _jsx(Instagram, {});
            case "tumblr":
                return _jsx(TumblrIcon, {});
            case "twitter":
                return _jsx(TwitterIcon, {});
            case "youtube":
                return _jsx(YoutubeIcon, {});
            case "pinterest":
                return _jsx(PinterestIcon, {});
            case "facebook":
                return _jsx(FacebookIcon, {});
            case "soundcloud":
                return _jsx(Soundcloud, {});
            case "discord":
                return _jsx(Discord, {});
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
    return disableLink ? (_jsx("span", { className: "nl-socialIcon", children: getSocialIcon() })) : user[platform] ? (_jsxs("a", { href: getSocialLink(), target: "_blank", rel: "noreferrer", className: `nl-socialIcon ${user.verifiedSocialIds?.includes(platform) ? "nl-verifyIcon-active" : "nl-verifyIcon-disabled"}`, children: [platform === "youtube" ? console.log(user) : false, _jsx("span", { className: "paragraph-3b stroke-btn-white", style: { padding: "7px" }, children: platform })] })) : (_jsx(_Fragment, {}));
};
//# sourceMappingURL=SocialLink.js.map