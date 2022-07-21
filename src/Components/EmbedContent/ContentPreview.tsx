import { NLView } from "../../types";
import EmbedContainer from "react-oembed-container";

export const ContentPreview: NLView<{
  content: string;
}> = ({ content }) => {
  return (
    <div className="nl-embed-preview">
      <EmbedContainer markup={content} className="nl-embed-container-preview">
        <div dangerouslySetInnerHTML={{ __html: content }} className="nl-embed-preview-content"></div>
      </EmbedContainer>
    </div>
  );
};
