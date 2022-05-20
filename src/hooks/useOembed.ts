import { useEffect, useState } from "react";
import micromatch from "micromatch";
import isEmpty from "lodash/isEmpty";
// import fetchJsonp from "fetch-jsonp";
import { OEMBED_PROVIDERS } from "../constants";

type Endpoint = {
  schemes: string[];
  url: string;
  discovery: boolean;
};

type Provider = {
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

async function fetchJson(url: string) {
  const resp = await fetch(url);
  return await resp.json();
}

export const useOembed = (
  url: string,
  maxHeight?: string,
  maxWidth?: string
) => {
  const [error, setError] = useState("");
  const [oembed, setOembed] = useState<SupportedEmbedData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isEmpty(url)) {
      let apiUrl: string = "";
      for (const prov of OEMBED_PROVIDERS as Provider[]) {
        for (const endpoint of prov.endpoints) {
          if (endpoint.schemes && micromatch.isMatch(url, endpoint.schemes)) {
            apiUrl = endpoint.url.replace("{format}", "json");
            break;
          } else if (
            !endpoint.schemes &&
            prov.provider_url &&
            url.startsWith(prov.provider_url)
          ) {
            apiUrl = prov.provider_url;
            break;
          }
        }
      }
      if (isEmpty(apiUrl)) {
        setError(`No Oembed Provider found for: <i>${url}</i>
        This URL may not be publicly embeddable. See the <a href"/">list of support providers on the home page</a>
        `);
      } else {
        try {
          const params = new URLSearchParams();
          params.set("url", url);
          params.set("format", "json");
          params.set("maxwidth", maxWidth || "");
          params.set("maxheight", maxHeight || "");
          const fetchOembedData = async () => {
            setIsLoading(true);
            // if noembed fails in the future, use this:
            // const data = await (
            //   await fetchJsonp(apiUrl + "?" + params.toString(), {
            //     jsonpCallbackFunction: "json    ",
            //   })
            // ).json();
            //const data = await fetchJson(apiUrl + "?" + params.toString());
            const data = await fetchJson(
              // more information: https://noembed.com/
              "https://noembed.com/embed?" + params.toString()
            );
            setOembed(data);
            setIsLoading(false);
          };
          fetchOembedData();
          setError("");
        } catch (e) {
          setError("Oembed API Json could not be loaded: " + apiUrl);
          setIsLoading(false);
        }
      }
    }
  }, [maxHeight, maxWidth, url]);

  useEffect(() => {
    if (!isEmpty(error)) {
      console.log(error);
    }
  }, [error]);

  return {
    isLoading,
    error,
    oembed,
  };
};
