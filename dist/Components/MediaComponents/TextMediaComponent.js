import { jsx as _jsx } from "react/jsx-runtime";
import { ContentPreview } from "../EmbedContent/ContentPreview";
import { Spin } from "../Spin";
import { findFirstUrl } from "../../utils/urlHelpers";
import { useEmbed } from "../../hooks/useEmbed";
import isEmpty from "lodash/isEmpty";
export const TextMediaComponent = ({ content, thumbnail, embed }) => {
    const { isLoading, error, embedContent } = useEmbed(findFirstUrl(content), "500", "650");
    return (_jsx("p", { style: thumbnail
            ? { paddingTop: 50, width: "100%" }
            : // : isEmpty(embedContent) || !embed
                // ? { fontSize: "min(3vh,3vw)", wordBreak: "break-word", lineHeight: "1.3em" }
                // : {
                //     fontSize: "min(10vh,10vw)",
                //     lineHeight: "1.3em",
                //     width: "400px",
                //   }
                {}, className: "header-2", children: isLoading ? _jsx(Spin, {}) : isEmpty(error) && embedContent && embed ? _jsx(ContentPreview, { content: embedContent }) : content }));
};
//# sourceMappingURL=TextMediaComponent.js.map