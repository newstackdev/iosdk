import { NLView } from "../types";
import { ReactElement } from "react";
export declare type ItemGridParams<T> = {
    title?: string;
    titleLink?: string;
    items?: any[];
    limit?: number;
    render: (item: object, index: number) => ReactElement;
    loadMore?: () => void;
    setSelectedFolder?: React.Dispatch<React.SetStateAction<boolean>>;
    selectedFolder?: boolean;
    noEmptyResults?: boolean;
    gridRow?: number;
    wrapAt?: number;
    deeplikeActions?: boolean;
    deepLikeContainer?: React.MutableRefObject<null>;
};
export declare const ItemGrid: NLView<ItemGridParams<object>>;
