import isNil from "lodash/isNil";

export const findFirstUrl = (content?: string) => {
  const sanitizedContent = content?.replace(/\n/g, " ");
  // eslint-disable-next-line
  const findUrls = sanitizedContent?.match("(https?:\/\/[^ ]*)"); // prettier-ignore
  const firstUrl = !isNil(findUrls) && findUrls?.length > 0 ? findUrls[0] : "";

  return firstUrl;
};

export const urlify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part) => {
    if (part.match(urlRegex)) {
      return <a href={part}>{part}</a>;
    }
    return part;
  });
};

export const validUrl = (str: string) => {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  var pattern = new RegExp(regex);
  return pattern.test(str);
};
