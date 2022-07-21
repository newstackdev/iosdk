import { useCachedDaoWhitelist } from "./useCached";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";

export const useVerified = (usernames: Array<string | undefined> | undefined) => {
  const whitelistMembers = map(useCachedDaoWhitelist().rows as string[], "user");

  const verifiedUsers = isEmpty(usernames) ? undefined : usernames?.filter((user) => whitelistMembers.includes(user));

  return { verifiedUsers };
};

export const useVerifiedPosts = (posts: any[]) => {
  const postUsers = posts.map((p) => p?.author?.username);
  const { verifiedUsers } = useVerified(postUsers);

  return { verifiedUsers };
};
