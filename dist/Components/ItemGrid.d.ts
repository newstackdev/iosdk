import { ReactElement } from "react";
import { NLView } from "../types";
export declare type ItemGridParams<T> = {
    title?: string;
    titleLink?: string;
    items?: T[];
    limit?: number;
    render: (item: object, index: number) => ReactElement;
    loadMore?: () => void;
    setSelectedFolder?: React.Dispatch<React.SetStateAction<boolean>>;
    selectedFolder?: boolean;
    noEmptyResults?: boolean;
};
export declare const ItemGrid: NLView<ItemGridParams<object>>;
