import isNil from "lodash/isNil";

export const findFirstUrl = (content?: string) => {
  const sanitizedContent = content?.replace(/\n/g, " ");
  // eslint-disable-next-line
  const findUrls = sanitizedContent?.match("(https?:\/\/[^ ]*)"); // prettier-ignore
  const firstUrl = !isNil(findUrls) && findUrls?.length > 0 ? findUrls[0] : "";

  return firstUrl;
};

// pick internal URL or first that comes up

export const urlify = (text?: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text?.match(urlRegex)?.toString().split(",");

  let url: string | undefined = undefined;

  if (urls) {
    for (let i = 0; i < urls.length; i++) {
      if (urls[i].includes("https://www.newlife.io")) {
        url = urls[i];
        break;
      }
    }
    if (url === undefined) {
      url = urls[0];
    }
  }

  return url;
};

export const validUrl = (str: string) => {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  var pattern = new RegExp(regex);
  return pattern.test(str);
};
