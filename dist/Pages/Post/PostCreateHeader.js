import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row } from "antd";
import Form from "antd/lib/form";
import { PicturesWall } from "../../Components/PicturesWall";
import { Text } from "../../Components/Icons/Text";
import { Image } from "../../Components/Icons/Image";
import { Video } from "../../Components/Icons/Video";
import SupportBox from "../../Components/SupportBox";
const PostCreateHeader = ({ contentType, setContentType }) => {
    return (_jsx("div", { className: "post-create-header-wrapper", children: _jsxs(Row, { style: {
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "column",
            }, children: [_jsx(Row, { children: _jsx("h2", { className: "text-center header-5", style: { margin: "0 auto 20px auto" }, children: "Upload node" }) }), _jsxs(Row, { style: { flex: 1, flexDirection: "column" }, children: [!contentType ? (_jsx(Form.Item, { name: "file", valuePropName: "fileList", getValueFromEvent: (ev) => {
                                return ev?.target?.files || [];
                            }, rules: [
                                {
                                    required: !contentType,
                                    message: "What are you uploading?",
                                },
                            ], children: _jsx("div", { style: { margin: "auto" }, children: _jsxs(PicturesWall, { name: "uploadNode", listType: "picture-card", className: "avatar-uploader", showUploadList: false, 
                                    // setContentType={setContentType}
                                    contentType: contentType, children: [_jsx("span", { style: {
                                                marginRight: "20px",
                                                cursor: "pointer",
                                            }, onClick: (e) => {
                                                e.stopPropagation();
                                                setContentType("text/plain");
                                            }, children: _jsx(Text, {}) }), _jsx("span", { style: { marginRight: "20px" }, children: _jsx(Image, {}) }), _jsx(Video, {})] }) }) })) : (_jsx(Form.Item, { name: "content", children: _jsx("div", { style: { margin: "auto" }, className: "content-uploader", children: _jsxs(PicturesWall, { children: [_jsx("span", { onClick: (e) => {
                                                e.stopPropagation();
                                            }, children: _jsx(Text, {}) }), _jsxs("div", { onClick: (e) => {
                                                e.stopPropagation();
                                                setContentType("");
                                            }, style: {
                                                bottom: 0,
                                                left: 0,
                                                position: "absolute",
                                            }, children: [_jsx("span", { style: {
                                                        marginRight: "20px",
                                                        cursor: "pointer",
                                                    }, children: _jsx(Image, {}) }), _jsx("span", { style: {
                                                        cursor: "pointer",
                                                    }, children: _jsx(Video, {}) })] })] }) }) })), _jsx(SupportBox, {})] })] }) }));
};
export default PostCreateHeader;
//# sourceMappingURL=PostCreateHeader.js.map