import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ContentImage } from "./Image";
import { Link } from "react-router-dom";
export const MaybeLink = ({ to, children, className, style }) => to ? (_jsx(Link, { style: style, to: to, className: className, children: children })) : (_jsx("div", { className: className, children: children }));
export const PostWidget = ({ post, mood, username, aspectRatio, isSpotlight }) => {
    const p = post;
    return (_jsx(_Fragment, { children: p.contentType === "text/plain" ? (_jsx("div", { className: "text-container", children: _jsxs("p", { className: "text-mood", children: ["\"", p.content?.length > 17 ? p?.content?.substring(0, 12) + "..." : p.content || "", "\""] }) })) : (_jsx(ContentImage, { size: "small", ...p, width: "100%", style: { aspectRatio: `${aspectRatio}` }, className: isSpotlight || aspectRatio >= 1 ? "post-rounded" : "post-rounded" })) }));
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
//# sourceMappingURL=PostWidget.js.map