import { UrlContentPreview } from "../Components/EmbedContent/UrlContentPreview";
import { findFirstUrl } from "../utils/urlHelpers";
import { findOembedProvider, hasOembedProvider } from "../utils/oembedProviders";
import { getOGContent } from "../utils/DOMUtils";
import { useActions } from "../overmind";
import { useCallback, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import isEmpty from "lodash/isEmpty";

type Endpoint = {
  schemes: string[];
  url: string;
  discovery: boolean;
};

export type Provider = {
  provider_name: string;
  provider_url: string;
  endpoints: Endpoint[];
};

/**
 * Basic data structure of every oembed response see https://oembed.com/
 */
export interface OembedData {
  type: "rich" | "video" | "photo" | "link";
  version: string;
  /** A text title, describing the resource. */
  title?: string;
  /** The name of the author/owner of the resource. */
  author_name?: string;
  /** A URL for the author/owner of the resource. */
  author_url?: string;
  /** The name of the resource provider. */
  provider_name?: string;
  /** The url of the resource provider. */
  provider_url?: string;
  /** The suggested cache lifetime for this resource, in seconds. Consumers may choose to use this value or not. */
  cache_age?: string | number;
  /**
   * A URL to a thumbnail image representing the resource.
   * The thumbnail must respect any maxwidth and maxheight parameters.
   * If this parameter is present, thumbnail_width and thumbnail_height must also be present.
   */
  thumbnail_url?: string;
  /**
   * The width of the optional thumbnail.
   * If this parameter is present, thumbnail_url and thumbnail_height must also be present.
   */
  thumbnail_width?: number;
  /**
   * The height of the optional thumbnail.
   * If this parameter is present, thumbnail_url and thumbnail_width must also be present.
   */
  thumbnail_height?: number;
}

export interface SupportedEmbedData extends OembedData {
  /**
   * The HTML required to display the resource.
   * The HTML should have no padding or margins.
   * Consumers may wish to load the HTML in an off-domain iframe to avoid XSS vulnerabilities.
   * The markup should be valid XHTML 1.0 Basic.
   */
  html: string;
  /** The width in pixels required to display the HTML. */
  width: number;
  /** The height in pixels required to display the HTML. */
  height: number;
}

export const useEmbed = (content: string, maxHeight?: string, maxWidth?: string) => {
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [embedContent, setEmbedContent] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const actions = useActions();

  const getUrlContent = useCallback(() => {
    const callPromise = async () => {
      try {
        const data = await actions.api.post.getRemoteMeta({
          url,
        });
        if (data.text && !isEmpty(data.text)) {
          const ogContent = getOGContent(data.text);
          if (ogContent) {
            setEmbedContent(
              ReactDOMServer.renderToStaticMarkup(
                <UrlContentPreview
                  imgSrc={ogContent.image || ""}
                  title={ogContent.title || ""}
                  description={ogContent.description || ""}
                  redirectUrl={url}
                />,
              ),
            );
          } else {
            setEmbedContent("");
          }
        }
        setIsLoading(false);
        setError("");
      } catch (e: any) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    callPromise();
  }, [actions.api.post, url]);

  const getEmbedData = useCallback(() => {
    const callPromise = async () => {
      const provider = findOembedProvider(url);
      const params = new URLSearchParams();
      params.set("url", url);
      params.set("format", "json");
      params.set("maxwidth", maxWidth || "");
      params.set("maxheight", maxHeight || "");

      try {
        const data = await actions.api.post.getRemoteMeta({
          url: provider?.fetchEndpoint + "?" + params.toString(),
        });
        if (data?.text) {
          setEmbedContent(JSON.parse(data.text).html);
        }
      } catch (e: any) {
        getUrlContent();
      } finally {
        setIsLoading(false);
      }
    };
    callPromise();
  }, [actions.api.post, getUrlContent, maxHeight, maxWidth, url]);

  useEffect(() => {
    const url = findFirstUrl(content);
    setUrl(url);
    if (isEmpty(url)) {
      setUrl("");
    }
  }, [content]);

  useEffect(() => {
    if (!isEmpty(url)) {
      setIsLoading(true);
      if (!hasOembedProvider(url)) {
        getUrlContent();
      } else {
        getEmbedData();
      }
    } else {
      setEmbedContent("");
    }
  }, [getEmbedData, getUrlContent, url]);

  return {
    isLoading,
    error,
    embedContent,
  };
};
