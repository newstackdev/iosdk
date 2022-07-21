import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Modal, Tooltip } from "antd";
import { Clipboard } from "./Icons/Clipboard";
import { CrossCircle } from "./Icons/CrossCircle";
import { PinterestIcon } from "./Icons/PinterestIcon";
import { PinterestShareButton, TelegramShareButton, TumblrShareButton, TwitterShareButton } from "react-share";
import { QRCodeSVG } from "qrcode.react";
import { ShareIcon } from "./Icons/ShareIcon";
import { TelegramIcon } from "./Icons/TelegramIcon";
import { TumblrIcon } from "./Icons/TumblrIcon";
import { TwitterIcon } from "./Icons/TwitterIcon";
import { useContentImageUrl } from "./MediaComponents/ImageMediaComponent";
import CopyToClipboard from "react-copy-to-clipboard";
import { useCallback, useEffect, useState } from "react";
const ShareModalContent = ({ children, label, style }) => {
    return (_jsxs("div", { className: "nl-white-box-content-row", style: {
            paddingBottom: 15,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            ...style,
        }, children: [label ? (_jsx("label", { className: "header-2", htmlFor: `nl-share-btn-${label}`, style: { width: "100%", cursor: "pointer" }, children: label })) : (false), children] }));
};
export const Share = ({ currentPostProps, urlToShare, user }) => {
    const URL = !currentPostProps && urlToShare
        ? urlToShare
        : process.env.NODE_ENV === "production"
            ? window.location.href
            : `https://web-dev.newlife.io${window.location.pathname}`;
    const [isVisible, setIsVisible] = useState(false);
    const [hashtags, setHashtags] = useState([]);
    const [copyToClipboard, setCopyToClipboard] = useState(false);
    const [viewQR, setViewQR] = useState(false);
    const onCancelHandler = useCallback(() => {
        setIsVisible(false);
        setViewQR(false);
    }, [setIsVisible, setViewQR]);
    useEffect(() => {
        if (currentPostProps?.tags) {
            const tags = currentPostProps.tags.map((tag) => tag.value?.replace(/ /g, ""));
            setHashtags(tags);
        }
    }, [currentPostProps?.tags]);
    const contentImageUrl = useContentImageUrl(currentPostProps ? { ...currentPostProps } : { ...user });
    return (_jsxs(_Fragment, { children: [isVisible ? (_jsxs(Modal, { closeIcon: _jsx(CrossCircle, {}), visible: isVisible, onCancel: onCancelHandler, className: "nl-white-box-modal", footer: null, width: 375, title: _jsxs(_Fragment, { children: [_jsx("div", { className: "header-2", style: { paddingBottom: 15 }, children: "Share to" }), _jsx("p", { className: "paragraph-2r", children: "Share this content to your networks!" })] }), children: [viewQR ? (_jsx("div", { style: { paddingBottom: 15 }, children: _jsx(QRCodeSVG, { value: URL, size: 238 }) })) : (_jsxs(_Fragment, { children: [_jsx(ShareModalContent, { label: "Twitter", children: _jsx(TwitterShareButton, { url: URL, title: currentPostProps?.title, className: "nl-share-btn-Twitter", id: "nl-share-btn-Twitter", children: _jsx(TwitterIcon, {}) }) }), _jsx(ShareModalContent, { label: "Tumblr", children: _jsx(TumblrShareButton, { url: URL, title: currentPostProps?.title, className: "nl-share-btn-Tumblr", id: "nl-share-btn-Tumblr", tags: hashtags, children: _jsx(TumblrIcon, {}) }) }), _jsx(ShareModalContent, { label: "Telegram", children: _jsx(TelegramShareButton, { url: URL, title: currentPostProps?.title, className: "nl-share-btn-Telegram", id: "nl-share-btn-Telegram", children: _jsx(TelegramIcon, {}) }) }), _jsx(ShareModalContent, { label: "Pinterest", children: _jsx(PinterestShareButton, { url: URL, title: currentPostProps?.title, className: "nl-share-btn-Pinterest", id: "nl-share-btn-Pinterest", media: contentImageUrl, children: _jsx(PinterestIcon, {}) }) }), _jsx(ShareModalContent, { label: "Copy", children: _jsx(CopyToClipboard, { text: URL, children: _jsx(Tooltip, { title: "copied to clipboard", placement: "right", visible: copyToClipboard, afterVisibleChange: (visible) => {
                                            if (visible) {
                                                setTimeout(() => {
                                                    setCopyToClipboard(false);
                                                }, 500);
                                            }
                                        }, children: _jsx("button", { className: "copy-to-clipboard-button nl-share-btn-Copy", id: "nl-share-btn-Copy", onClick: () => {
                                                setCopyToClipboard(true);
                                            }, children: _jsx(Clipboard, {}) }) }) }) })] })), _jsx(ShareModalContent, { style: { paddingBottom: "none", justifyContent: "center" }, children: _jsx(Button, { className: "ant-btn ant-btn-primary", onClick: () => {
                                setViewQR(!viewQR);
                            }, children: viewQR ? "Back" : "QR Code" }) })] })) : (false), _jsx("span", { onClick: () => setIsVisible(true), style: { cursor: "pointer", height: 30 }, children: _jsx(ShareIcon, {}) })] }));
};
//# sourceMappingURL=Share.js.map