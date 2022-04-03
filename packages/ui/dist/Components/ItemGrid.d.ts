import { NLView } from "@newcoin-foundation/core";
import { ReactElement } from "react";
export declare type ItemGridParams<T> = {
    title?: string;
    titleLink?: string;
    items?: T[];
    limit?: number;
    render: (item: object, index: number) => ReactElement;
    loadMore?: () => void;
    setSelectedFolder?: React.Dispatch<React.SetStateAction<boolean>>;
    selectedFolder?: boolean;
};
export declare const ItemGrid: NLView<ItemGridParams<object>>;
//# sourceMappingURL=ItemGrid.d.ts.map