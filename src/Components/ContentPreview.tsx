/* eslint-disable no-useless-escape*/
import EmbedContainer from "react-oembed-container";
import reactStringReplace from "react-string-replace";
import isNil from "lodash/isNil";
import { useOembed } from "../hooks/useOembed";
import { NLView } from "../types";
import { Spin } from "./Spin";
import isEmpty from "lodash/isEmpty";
import React from "react";

export const ContentPreview: NLView<{
  content?: string;
  embedContentWidth?: string;
  embedContentHeight?: string;
  style?: React.CSSProperties;
}> = ({ content, embedContentHeight, embedContentWidth, style }) => {
  const sanitizedContent = content?.replace(/\n/g, " ");
  const findUrls = sanitizedContent?.match("(https?:\/\/[^ ]*)"); // prettier-ignore
  const embedableUrl =
    !isNil(findUrls) && findUrls?.length > 0 ? findUrls[0] : "";

  const { isLoading, error, oembed } = useOembed(
    embedableUrl,
    embedContentHeight,
    embedContentWidth
  );

  return (
    <div className="nl-embed-preview" style={style}>
      {isLoading && !isEmpty(findUrls) ? (
        <Spin />
      ) : (
        reactStringReplace(
          sanitizedContent,
          new RegExp("(https?:\/\/[^ ]*)"), // prettier-ignore
          (match, i) => {
            return i === 1 && !error && oembed?.html && oembed ? (
              <EmbedContainer
                key={i + match}
                markup={oembed?.html}
                className="nl-embed-container-preview"
              >
                <div dangerouslySetInnerHTML={{ __html: oembed?.html }}></div>
              </EmbedContainer>
            ) : (
              <a href={match}>{match}</a>
            );
          }
        )
      )}
    </div>
  );
};
