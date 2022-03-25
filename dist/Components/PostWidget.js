"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWidget = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Image_1 = require("./Image");
var MaybeLink = function (_a) {
    var to = _a.to, children = _a.children, className = _a.className;
    return to ? ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: to, className: className }, { children: children }))) : ((0, jsx_runtime_1.jsx)("div", __assign({ className: className }, { children: children })));
};
var PostWidget = function (_a) {
    var _b, _c;
    var post = _a.post, mood = _a.mood, username = _a.username, aspectRatio = _a.aspectRatio, isSpotlight = _a.isSpotlight;
    var p = post;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(MaybeLink, __assign({ to: !p.id
                ? ""
                : !mood
                    ? "/post/".concat(p.id)
                    : "/folder/".concat(mood.id, "/").concat(p.id), className: p.contentType === "text/plain" ? "maybelink" : "" }, { children: p.contentType === "text/plain" ? ((0, jsx_runtime_1.jsx)("div", __assign({ className: "text-container" }, { children: (0, jsx_runtime_1.jsxs)("p", __assign({ className: "text-mood" }, { children: ["\"", ((_b = p.content) === null || _b === void 0 ? void 0 : _b.length) > 17
                            ? ((_c = p === null || p === void 0 ? void 0 : p.content) === null || _c === void 0 ? void 0 : _c.substring(0, 12)) + "..."
                            : p.content || "", "\""] })) }))) : ((0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({ size: "small" }, p, { width: "100%", style: { aspectRatio: "".concat(aspectRatio) }, className: isSpotlight || aspectRatio >= 1
                    ? "post-rounded"
                    : "" }))) })) }));
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