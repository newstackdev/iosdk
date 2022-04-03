import { NLView } from "@newcoin-foundation/core";
export interface OpenSearchResponse {
    _index: string;
    _type: string;
    _id: string;
    _score: null;
    _source: OpenSearchDocument;
    sort: number[];
}
export interface OpenSearchDocument {
    image: string;
    content: {
        [key: string]: number;
    };
    aesthetics: {
        [key: string]: number;
    };
    meta: Meta;
}
export declare type Aesthetics = Record<string, number>;
export interface Meta {
    blog_name: string;
    id: number;
    date: string;
    tags: string[];
    short_url: string;
    summary: string;
}
export declare const SearchItemWidget: NLView<{
    item: any;
    index: number;
}>;
//# sourceMappingURL=SearchItemWidget.d.ts.map