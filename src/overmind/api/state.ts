import { AUTH_FLOW_STATUS, AUTH_FLOW_STATUS_TYPE } from "../auth/state";
import { CreatorApi } from "../../types";
import {
  MoodReadResponse,
  PagedRatedResponseUser,
  PostReadResponse,
  UserInvitationPagedListReadPublicResponse,
  UserReadPrivateResponse,
  UserReadPublicResponse,
} from "@newstackdev/iosdk-newgraph-client-js";
import { derived } from "overmind";

export const api: CreatorApi = <CreatorApi>{};

export type PowerupsCacheItem = {
  in: PagedRatedResponseUser;
  out: PagedRatedResponseUser;
  promise?: Promise<PowerupsCacheItem>;
};
export type PowerupsCache = Record<string, PowerupsCacheItem>;

type State = {
  client: CreatorApi;
  auth: {
    // newlife
    status: AUTH_FLOW_STATUS_TYPE;
    user: UserReadPrivateResponse;
    moods: MoodReadResponse[];
    authorized: boolean;
    admitted: boolean;
    userDisplayHandler: string;
    attempted: boolean;
    inviteesList: UserInvitationPagedListReadPublicResponse;
  };
  cache: {
    users: {
      byUsername: Record<string, UserReadPublicResponse & { moods?: MoodReadResponse[] }>;
      byId: Record<string, UserReadPublicResponse & { moods?: MoodReadResponse[] }>;
    };
    powerups: PowerupsCache;
    posts: Record<string, PostReadResponse>;
    moods: Record<string, MoodReadResponse & { promise?: Promise<any> | null }>;
    stakeHistory: {
      user: UserReadPublicResponse;
      amount: string;
      response: any;
      error: any;
    }[];
  };
  // post: Record<string, PostReadResponse>
};
type AuthorizedUserState = State["auth"];

export default {
  client: api,

  auth: {
    // newlife
    user: {},
    moods: [],
    status: AUTH_FLOW_STATUS.ANONYMOUS,
    attempted: false,
    userDisplayHandler: derived((state: AuthorizedUserState, rs: any) => {
      return state.user?.username || (rs.firebase?.user?.phoneNumber || "...") + (state.user?.id ? "*" : "");
    }),
    authorized: derived((s: AuthorizedUserState, rs: any) => rs.auth.status >= AUTH_FLOW_STATUS.AUTHORIZED),
    admitted: derived((s: AuthorizedUserState) => ["admitted", "registered"].includes(s.user?.status || "")),
    inviteesList: { value: [] },
  },

  cache: {
    posts: {},
    moods: {},
    users: {
      byId: {},
      byUsername: {},
    },
    powerups: {},
    stakeHistory: [],
  },
  // post: derived((state: State) => (id: string) => state._posts[id] || actions.getPost(id) )
} as State;
