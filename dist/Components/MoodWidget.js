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
exports.MoodWidget = exports.MoodFolderWidget = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_1 = require("@ant-design/icons");
var useCached_1 = require("../hooks/useCached");
var overmind_1 = require("../overmind");
var Image_1 = require("./Image");
var Closed_1 = require("./Icons/Folder/Closed");
var MoodFolderWidget = function (_a) {
    var _b, _c;
    var mood = _a.mood, onClick = _a.onClick, selected = _a.selected, force = _a.force, selectedFolder = _a.selectedFolder, setSelectedFolder = _a.setSelectedFolder;
    var state = (0, overmind_1.useAppState)();
    var m = (0, useCached_1.useCachedMood)(mood, force);
    var url = m.contentUrl || ((_c = (_b = m.posts) === null || _b === void 0 ? void 0 : _b.find(function (p) { return p.contentUrl; })) === null || _c === void 0 ? void 0 : _c.contentUrl);
    var p = ((m === null || m === void 0 ? void 0 : m.posts) && m.posts[0]) || {};
    return ((0, jsx_runtime_1.jsxs)("div", __assign({}, (onClick ? { onClick: function () { return onClick(); } } : {}), { style: {
            textAlign: "center",
            color: "white",
            width: "100%",
            border: "none",
        }, className: selected
            ? "selected-folder bg-selected-folder"
            : "selectable-folder bg-hover" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ style: { width: "90%", margin: "0 auto" } }, { children: (0, jsx_runtime_1.jsx)(Closed_1.FolderClosed, {}) })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "folder-name" }, { children: m.title }))] })));
};
exports.MoodFolderWidget = MoodFolderWidget;
var MoodWidget = function (_a) {
    var _b, _c;
    var mood = _a.mood, onClick = _a.onClick, selected = _a.selected, force = _a.force;
    var state = (0, overmind_1.useAppState)();
    var m = (0, useCached_1.useCachedMood)(mood, force);
    var url = m.contentUrl || ((_c = (_b = m.posts) === null || _b === void 0 ? void 0 : _b.find(function (p) { return p.contentUrl; })) === null || _c === void 0 ? void 0 : _c.contentUrl);
    var p = ((m === null || m === void 0 ? void 0 : m.posts) && m.posts[0]) || {};
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: selected ? "selected" : "" }, (onClick ? { onClick: function () { return onClick(); } } : {}), { children: (0, jsx_runtime_1.jsx)(Image_1.ContentImage
        // src={url && `1000x1000/${url}`}
        // href={`/mood/${m.id}`}
        // {...m}
        , __assign({}, p, { 
            // contentUrl={onClick ? "" : `/mood/${m.id}${m.posts?.length ? `/${m.posts[0].id}` : ""}`}
            mask: (0, jsx_runtime_1.jsxs)("div", __assign({ style: { textAlign: "center" } }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(icons_1.CaretRightFilled, { style: { fontSize: "35px", color: "white" } }) }), (0, jsx_runtime_1.jsx)("p", { children: m.title })] })) })) })));
    // return <Card
    //     style={{ maxWidth: "clamp(300, 20vw, 400)" }}
    //     // title={<Link to={`/mood/${mood.id}`}>{mood.title}</Link>}
    //     cover={<ContentImage width="100%" src={mood.contentUrl || get(mood, "posts[0].contentUrl") || ""} />}
    // />
};
exports.MoodWidget = MoodWidget;
//# sourceMappingURL=MoodWidget.js.map