import { jsx as _jsx } from "react/jsx-runtime";
import { ContentPreview } from "../ContentPreview";
export const TextMediaComponent = ({ content, thumbnail }) => {
    // eslint-disable-next-line no-useless-escape
    const findUrls = content?.match("(https?:\/\/[^ ]*)"); // prettier-ignore
    return (_jsx("div", { style: thumbnail
            ? { paddingTop: 50, width: "100%" }
            : findUrls && findUrls.length > 0
                ? { fontSize: "min(3vh,3vw)" }
                : { fontSize: "min(10vh,10vw)", lineHeight: "1em" }, children: findUrls && findUrls.length > 0 ? (_jsx(ContentPreview, { content: content, embedContentHeight: "480", embedContentWidth: "650", style: { padding: 10 } })) : (content) }));
};
//# sourceMappingURL=TextMediaComponent.js.map