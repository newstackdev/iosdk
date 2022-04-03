import React, { ReactElement } from "react";
import { UploadFile } from "antd/lib/upload/interface";
import { EventHandler, NLView } from "@newcoin-foundation/core";
export declare class PicturesWall extends React.Component<React.ComponentPropsWithRef<React.ElementType & {
    onChange: EventHandler;
    uploadText: string;
    setContentType: React.Dispatch<React.SetStateAction<string>>;
    contentType: string;
    children: ReactElement;
}>> {
    state: {
        previewVisible: boolean;
        previewImage: string;
        previewTitle: string;
        fileList: any[];
        value: UploadFile<any>;
    };
    handleCancel: () => void;
    handlePreview: (file: UploadFile) => Promise<void>;
    handleChange: ({ fileList }: {
        fileList: UploadFile[];
    }) => void;
    render(): JSX.Element;
}
export declare const PictureWallFormItem: NLView<{
    onChange?: EventHandler;
    uploadText?: string;
}>;
//# sourceMappingURL=PicturesWall.d.ts.map