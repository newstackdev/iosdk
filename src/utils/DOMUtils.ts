import isEmpty from "lodash/isEmpty";

export const getOGMeta = (html: string, ogTag: string) => {
  let doc = new DOMParser().parseFromString(html, "text/html");
  const metas = doc.getElementsByTagName("meta");

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("property") === ogTag) {
      return metas[i].getAttribute("content");
    }
  }
  return;
};

export const getOGContent = (html: string) => {
  const title = getOGMeta(html, "og:title");
  const image = getOGMeta(html, "og:image");
  const description = getOGMeta(html, "og:description");

  if (isEmpty(title)) {
    return;
  }

  return {
    title,
    image,
    description,
  };
};
