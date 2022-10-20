import { Action, ContentType } from "../../types";
import { CreativeSearchResponse, MoodReadResponse, PostPagedListReadPublicResponse, PostReadResponse, PostTagsSearchPublicResponse, UserPagedListReadPublicResponse, UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
export declare type CreativeSearchHits = NonNullable<CreativeSearchResponse["hits"]>[number];
export declare type CreativeSearchItem = NonNullable<CreativeSearchHits["_source"]>;
export declare const listTopUsers: Action<{
    requestedPage?: number;
}>;
export declare const listTopPosts: Action<ContentType | undefined, void>;
export declare const searchUsers: Action<{
    query: string;
}>;
export declare const searchPosts: Action<{
    tags: string;
    force?: boolean;
}>;
export declare const searchTags: Action<{
    query: string;
}>;
declare type ListState<T> = {
    _items: Record<string, T>;
    items: T[];
    sortKey: string;
    page: number;
};
declare const _default: {
    state: {
        creativeSearch: {
            results: ListState<{
                image?: string | undefined;
                meta?: {
                    date?: string | undefined;
                    summary?: string | undefined;
                    id?: number | undefined;
                    blog_name?: string | undefined;
                    tags?: string[] | undefined;
                    short_url?: string | undefined;
                } | undefined;
                aesthetics?: object | undefined;
                content?: object | undefined;
            }>;
            tags: ListState<string>;
            lastQueried: {
                tags: string;
                aesthetics: string;
            };
            isActive: boolean;
        };
        postsSearch: {};
        top: {
            moods: ListState<MoodReadResponse>;
            users: ListState<UserReadPublicResponse>;
            posts: ListState<PostReadResponse>;
            videoPosts: ListState<PostReadResponse>;
            isNextMoodsAvailable: boolean;
            isNextPostsAvailable: boolean;
            isNextUsersAvailable: boolean;
        };
        selectedUser: {
            moods: ListState<MoodReadResponse>;
            posts: ListState<PostReadResponse>;
            isNextMoodsAvailable: boolean;
            isNextPostsAvailable: boolean;
        };
        search: {
            users: {
                query: string;
                results: UserPagedListReadPublicResponse | null;
            };
            posts: {
                query: string;
                results: PostPagedListReadPublicResponse | null;
                lastQueried: {
                    tags: string;
                    aesthetics: string;
                };
                isActive: boolean;
                page: number;
            };
            tags: {
                query: string;
                results: PostTagsSearchPublicResponse | null;
                lastQueried: string;
                isActive: boolean;
                page: number;
            };
        };
    };
    actions: {
        creativeSearch: Action<{
            tags: string;
            aesthetics: string;
        }, void>;
        searchUsers: Action<{
            query: string;
        }, void>;
        searchPosts: Action<{
            tags: string;
            force?: boolean | undefined;
        }, void>;
        searchTags: Action<{
            query: string;
        }, void>;
        resetMoodAndPostAvailability: Action<undefined, void>;
        top: {
            moods: Action<{
                requestedPage?: number | undefined;
            }, void>;
            users: Action<{
                requestedPage?: number | undefined;
            }, void>;
            posts: Action<ContentType | undefined, void>;
        };
    };
    effects: {};
};
export default _default;
