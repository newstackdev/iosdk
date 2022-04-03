import { Action } from "../state";
import { MoodReadResponse, UserPagedListReadPublicResponse, UserReadPublicResponse, PostReadResponse, CreativeSearchResponse } from "@newlife/newlife-creator-client-api";
export declare type CreativeSearchHits = NonNullable<CreativeSearchResponse["hits"]>[number];
export declare type CreativeSearchItem = NonNullable<CreativeSearchHits["_source"]>;
export declare const listTopUsers: Action;
export declare const listTopPosts: Action;
export declare const searchUsers: Action<{
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
                image?: string;
                meta?: {
                    date?: string;
                    summary?: string;
                    id?: number;
                    blog_name?: string;
                    tags?: string[];
                    short_url?: string;
                };
                aesthetics?: object;
                content?: object;
            }>;
            tags: ListState<string>;
            lastQueried: {
                tags: string;
                aesthetics: string;
            };
            isActive: boolean;
        };
        top: {
            moods: ListState<MoodReadResponse>;
            users: ListState<UserReadPublicResponse>;
            posts: ListState<PostReadResponse>;
        };
        search: {
            users: {
                query: string;
                results: UserPagedListReadPublicResponse;
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
        top: {
            moods: Action<undefined, void>;
            users: Action<undefined, void>;
            posts: Action<undefined, void>;
        };
    };
    effects: {};
};
export default _default;
//# sourceMappingURL=index.d.ts.map