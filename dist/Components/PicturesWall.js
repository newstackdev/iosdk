import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Upload, Modal, Row } from "antd";
import React from "react";
import { Image } from "./Icons/Image";
import { Edit } from "./Icons/Edit";
import { CrossCircle } from "./Icons/CrossCircle";
// type File = { status: UploadFileStatus, originFileObj: Blob, preview: string, url: string, name: string } & UploadFile;
// type FileList = File[];
function getBase64(file) {
    if (!file)
        throw new Error("No data received");
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
export class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: "",
        previewTitle: "",
        fileList: [],
        value: null,
    };
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name ||
                file.url.substring(file.url.lastIndexOf("/") + 1),
            value: file,
        });
    };
    handleChange = ({ fileList }) => {
        this.setState({ fileList });
        this.props.onChange && this.props.onChange({ fileList });
    };
    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (_jsx(Row, { style: { alignItems: "flex-start" }, justify: "space-between", children: this.props.children ? this.props.children : _jsx(Image, {}) }));
        return (_jsxs(_Fragment, { children: [_jsx(Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                , { 
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType: "picture-card", fileList: fileList, 
                    // onPreview={this.handlePreview}
                    onChange: this.handleChange, beforeUpload: () => false, openFileDialogOnClick: this.props.contentType === "text/plain" ? false : true, children: fileList.length > 0 ? null : this.props.name ===
                        "avatar" ? (_jsx(Row, { children: _jsx(Edit, {}) })) : (uploadButton) }), _jsx(Modal, { closeIcon: _jsx(CrossCircle, {}), visible: previewVisible, title: previewTitle, footer: null, onCancel: this.handleCancel, children: _jsx("img", { alt: "example", style: { width: "100%" }, src: previewImage }) })] }));
    }
}
export const PictureWallFormItem = ({ onChange, uploadText }) => {
    return (_jsx("div", { style: { margin: "auto" }, className: "upload-profile-update-icon", children: _jsx(PicturesWall, { name: "avatar", listType: "picture-card", showUploadList: false, onChange: onChange, uploadText: uploadText }) }));
};
//# sourceMappingURL=PicturesWall.js.map