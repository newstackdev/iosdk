import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CrossCircle } from "./Icons/CrossCircle";
import { Edit } from "./Icons/Edit";
import { Input, Modal, Row, Upload } from "antd";
import Form from "antd/lib/form";
import React from "react";
import isEmpty from "lodash/isEmpty";
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
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
            value: file,
        });
    };
    handleChange = ({ fileList }) => {
        this.setState({ fileList });
        this.props.onChange && this.props.onChange({ fileList });
    };
    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const { contentType, placeholderImgSrc, uploadClassname } = this.props;
        return (_jsx(_Fragment, { children: contentType === "text/plain" ? (_jsx(Form.Item, { required: true, name: "content", rules: [
                    {
                        required: true,
                        message: "A couple of words here please",
                    },
                ], children: _jsx(Input.TextArea, { placeholder: "What's on your mind?", style: {
                        padding: "15px 19px",
                        height: 377,
                        borderRadius: 8,
                    }, className: "paragraph-2b", onChange: this.props.onContentChange }) })) : (_jsxs(_Fragment, { children: [_jsx(Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    , { 
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType: "picture-card", fileList: fileList, 
                        // onPreview={this.handlePreview}
                        onChange: this.handleChange, beforeUpload: () => false, 
                        // customRequest={({ file, onSuccess }) => {
                        //   onSuccess && onSuccess(() => ({ body: "ok", xhr: {} as XMLHttpRequest }));
                        // }}
                        className: isEmpty(fileList) ? uploadClassname : null, openFileDialogOnClick: true, children: fileList.length > 0 ? null : this.props.name === "avatar" ? (_jsxs(_Fragment, { children: [isEmpty(fileList) && (_jsx("img", { alt: "placeholderImg", src: placeholderImgSrc, className: "upload-profile-update-placeholder-img" })), _jsx(Row, { style: { textAlign: "left" }, children: _jsx(Edit, {}) })] })) : (_jsxs("div", { className: "paragraph-2b", style: { fontSize: 17 }, children: ["Drag and drop content here!", _jsx("br", {}), " JPEG, PNG, GIF"] })) }), _jsx(Modal, { closeIcon: _jsx(CrossCircle, {}), visible: previewVisible, title: previewTitle, footer: null, onCancel: this.handleCancel, children: _jsx("img", { alt: "example", style: { width: "100%" }, src: previewImage }) })] })) }));
    }
}
export const PictureWallFormItem = ({ onChange, uploadText, placeholderImgSrc }) => {
    return (_jsx("div", { style: { margin: "auto" }, className: "upload-profile-update-icon", children: _jsx(PicturesWall, { name: "avatar", listType: "picture-card", showUploadList: false, onChange: onChange, uploadText: uploadText, placeholderImgSrc: placeholderImgSrc, uploadClassname: "upload-profile-update-field" }) }));
};
//# sourceMappingURL=PicturesWall.js.map