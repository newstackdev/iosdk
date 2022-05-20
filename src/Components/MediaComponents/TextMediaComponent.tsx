import { ContentElement } from "./types";
import { ContentPreview } from "../ContentPreview";

export const TextMediaComponent: ContentElement = ({ content, thumbnail }) => {
  // eslint-disable-next-line no-useless-escape
  const findUrls = content?.match("(https?:\/\/[^ ]*)"); // prettier-ignore
  return (
    <div
      style={
        thumbnail
          ? { paddingTop: 50, width: "100%" }
          : findUrls && findUrls.length > 0
          ? { fontSize: "min(3vh,3vw)" }
          : { fontSize: "min(10vh,10vw)", lineHeight: "1em" }
      }
    >
      {findUrls && findUrls.length > 0 ? (
        <ContentPreview
          content={content}
          embedContentHeight="480"
          embedContentWidth="650"
          style={{ padding: 10 }}
        />
      ) : (
        content
      )}
    </div>
  );
};
