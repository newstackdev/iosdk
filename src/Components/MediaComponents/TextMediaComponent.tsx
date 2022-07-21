import { ContentElement } from "./types";
import { ContentPreview } from "../EmbedContent/ContentPreview";
import { Spin } from "../Spin";
import { findFirstUrl } from "../../utils/urlHelpers";
import { useEmbed } from "../../hooks/useEmbed";
import isEmpty from "lodash/isEmpty";

export const TextMediaComponent: ContentElement = ({ content, thumbnail, embed }) => {
  const { isLoading, error, embedContent } = useEmbed(findFirstUrl(content), "500", "650");

  return (
    <div
      style={
        thumbnail
          ? { paddingTop: 50, width: "100%" }
          : isEmpty(embedContent) || !embed
          ? { fontSize: "min(3vh,3vw)", wordBreak: "break-word" }
          : {
              fontSize: "min(10vh,10vw)",
              lineHeight: "1em",
              width: "400px",
            }
      }
    >
      {isLoading ? <Spin /> : isEmpty(error) && embedContent && embed ? <ContentPreview content={embedContent} /> : content}
    </div>
  );
};
