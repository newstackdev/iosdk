import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Row } from "antd";
import { Image } from "../../Components/Icons/Image";
import { PicturesWall } from "../../Components/PicturesWall";
import { Text } from "../../Components/Icons/Text";
import { Video } from "../../Components/Icons/Video";
import Form from "antd/lib/form";
import SupportBox from "../../Components/SupportBox";
const PostCreateHeader = ({ contentType, setContentType, onChangeContent }) => {
    return (_jsx("div", { className: "post-create-header-wrapper", children: _jsxs(Col, { children: [_jsx(Row, { children: _jsx("h2", { className: "header-5", style: { marginBottom: "20px", textAlign: "left" }, children: "Upload node" }) }), _jsx(Row, { style: { flex: 1, flexDirection: "column" }, children: _jsxs("div", { children: [_jsxs("div", { className: "postCreateHeader-uploadIcons-wrapper", children: [_jsx("span", { style: {
                                            cursor: "pointer",
                                        }, onClick: (e) => {
                                            e.stopPropagation();
                                            setContentType("text/plain");
                                        }, className: contentType === "text/plain" ? "uploadIconActive" : "uploadIconInactive", children: _jsx(Text, {}) }), _jsx("span", { style: {
                                            cursor: "pointer",
                                        }, onClick: (e) => {
                                            e.stopPropagation();
                                            setContentType("");
                                        }, className: contentType !== "text/plain" && contentType !== "video/mp4" ? "uploadIconActive" : "uploadIconInactive", children: _jsx(Image, {}) }), _jsx("span", { style: {
                                            cursor: "pointer",
                                        }, onClick: (e) => {
                                            e.stopPropagation();
                                            setContentType("video/mp4");
                                        }, className: contentType === "video/mp4" ? "uploadIconActive" : "uploadIconInactive", children: _jsx(Video, {}) })] }), _jsx("div", { style: { margin: "auto" }, children: _jsx(Form.Item, { name: "file", valuePropName: "fileList", getValueFromEvent: (ev) => {
                                        return ev?.fileList || []; //ev?.target?.files || [];
                                    }, rules: [
                                        {
                                            required: !contentType,
                                            message: "What are you uploading?",
                                        },
                                    ], children: _jsx(PicturesWall, { name: "uploadNode", listType: "picture-card", className: "avatar-uploader", showUploadList: false, contentType: contentType, onContentChange: onChangeContent }) }) })] }) }), _jsx(Row, { children: _jsx(SupportBox, {}) })] }) }));
};
export default PostCreateHeader;
//# sourceMappingURL=PostCreateHeader.js.map