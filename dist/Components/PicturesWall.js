"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureWallFormItem = exports.PicturesWall = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const Image_1 = require("./Icons/Image");
const Edit_1 = require("./Icons/Edit");
const CrossCircle_1 = require("./Icons/CrossCircle");
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
class PicturesWall extends react_1.default.Component {
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
        const uploadButton = ((0, jsx_runtime_1.jsx)(antd_1.Row, { style: { alignItems: "flex-start" }, justify: "space-between", children: this.props.children ? this.props.children : (0, jsx_runtime_1.jsx)(Image_1.Image, {}) }));
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                , { 
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType: "picture-card", fileList: fileList, 
                    // onPreview={this.handlePreview}
                    onChange: this.handleChange, beforeUpload: () => false, openFileDialogOnClick: this.props.contentType === "text/plain" ? false : true, children: fileList.length > 0 ? null : this.props.name ===
                        "avatar" ? ((0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(Edit_1.Edit, {}) })) : (uploadButton) }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}), visible: previewVisible, title: previewTitle, footer: null, onCancel: this.handleCancel, children: (0, jsx_runtime_1.jsx)("img", { alt: "example", style: { width: "100%" }, src: previewImage }) })] }));
    }
}
exports.PicturesWall = PicturesWall;
const PictureWallFormItem = ({ onChange, uploadText }) => {
    return ((0, jsx_runtime_1.jsx)("div", { style: { margin: "auto" }, className: "upload-profile-update-icon", children: (0, jsx_runtime_1.jsx)(PicturesWall, { name: "avatar", listType: "picture-card", showUploadList: false, onChange: onChange, uploadText: uploadText }) }));
};
exports.PictureWallFormItem = PictureWallFormItem;
//# sourceMappingURL=PicturesWall.js.map