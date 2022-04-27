"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWidget = exports.MaybeLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Image_1 = require("./Image");
const MaybeLink = ({ to, children, className }) => to ? ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: to, className: className, children: children })) : ((0, jsx_runtime_1.jsx)("div", { className: className, children: children }));
exports.MaybeLink = MaybeLink;
const PostWidget = ({ post, mood, username, aspectRatio, isSpotlight }) => {
    const p = post;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: p.contentType === "text/plain" ? ((0, jsx_runtime_1.jsx)("div", { className: "text-container", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-mood", children: ["\"", p.content?.length > 17
                        ? p?.content?.substring(0, 12) + "..."
                        : p.content || "", "\""] }) })) : ((0, jsx_runtime_1.jsx)(Image_1.ContentImage, { size: "small", ...p, width: "100%", style: { aspectRatio: `${aspectRatio}` }, className: isSpotlight || aspectRatio >= 1 ? "post-rounded" : "" })) }));
    // return <Card
    //     style={{ width: "100%" }}
    //     title={<Link to={`/post/${p.id}`}>{p.title}</Link>}
    //     cover={<ContentImage  width="100%" src={p.contentUrl} />}
    // >
    //     {/* <Space direction="vertical"> */}
    //         By <Link to={`/user/${p?.author?.id}`}>{ p.author?.username }</Link>
    //         <Paragraph ellipsis={{ rows: 3, expandable: false }}>
    //             { post.description }
    //         </Paragraph>
    //     {/* </Space> */}
    // </Card>
};
exports.PostWidget = PostWidget;
//# sourceMappingURL=PostWidget.js.map