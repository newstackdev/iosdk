import { EventHandler, NLView } from "../types";
import { UploadFile } from "antd/lib/upload/interface";
import React, { ReactElement } from "react";
export declare class PicturesWall extends React.Component<React.ComponentPropsWithRef<React.ElementType & {
    onChange: EventHandler;
    onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    uploadText: string;
    setContentType: React.Dispatch<React.SetStateAction<string>>;
    contentType: string;
    children?: ReactElement;
    name: string;
}>> {
    state: {
        previewVisible: boolean;
        previewImage: string;
        previewTitle: string;
        fileList: never[];
        value: UploadFile<any> | null;
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
