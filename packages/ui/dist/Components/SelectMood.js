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
exports.__esModule = true;
exports.SelectMoodForm = exports.SelectMood = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var MoodWidget_1 = require("./MoodWidget");
var lodash_1 = require("lodash");
var react_1 = require("react");
var ItemGrid_1 = require("./ItemGrid");
var antd_1 = require("antd");
var ProgressButton_1 = require("./ProgressButton");
var state_1 = require("@newcoin-foundation/state");
var SelectMood = function (_a) {
    var moods = _a.moods, onChange = _a.onChange, limit = _a.limit, title = _a.title;
    var _b = (0, react_1.useState)({}), _value = _b[0], _setValue = _b[1];
    var _c = (0, react_1.useState)(false), selectedFolder = _c[0], setSelectedFolder = _c[1];
    var state = (0, state_1.useAppState)();
    var checkMoods = moods === undefined ? state.api.auth.moods || [] : moods;
    var toggle = function (ni) {
        var _a;
        if (!ni.id)
            return;
        var nv = _value[ni.id || ""]
            ? __assign({}, (0, lodash_1.omit)(_value, [ni.id])) : __assign(__assign({}, _value), (_a = {}, _a[ni.id] = ni, _a));
        _setValue(nv);
        onChange && onChange(Object.values(nv));
    };
    return ((0, jsx_runtime_1.jsx)(ItemGrid_1.ItemGrid, { items: checkMoods, limit: limit, 
        // titleLink="/save-folder"
        title: "Select a folder to share", setSelectedFolder: setSelectedFolder, selectedFolder: selectedFolder, render: function (m) { return ((0, jsx_runtime_1.jsx)(MoodWidget_1.MoodFolderWidget, { setSelectedFolder: setSelectedFolder, selectedFolder: selectedFolder, mood: m, onClick: function () { return toggle(m); }, selected: !!_value[m.id || ""] })); } }));
    // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} onClick={() => toggle(m)} selected={!!value[(m as any).id || ""]} />} />
    // return <ScrollMenu
    //     LeftArrow={LeftCircleOutlined}
    //     RightArrow={RightCircleOutlined}
    // >
    //     {
    //         moods.length ? moods.map(m => (
    //             <div style={{ maxWidth: 280 }}><MoodWidget mood={m} onClick={() => toggle(m)} selected={!!value[m.id || ""]} /></div>
    //         )) : <h1>no moods</h1>
    //     }
    // </ScrollMenu>
};
exports.SelectMood = SelectMood;
var SelectMoodForm = function (_a) {
    var title = _a.title, onFinish = _a.onFinish;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Form, __assign({ className: "app-main-full-width", onFinish: onFinish }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ name: "moods", style: { marginBottom: "40px" } }, { children: title ? (0, jsx_runtime_1.jsx)(exports.SelectMood, { title: title }) : (0, jsx_runtime_1.jsx)(exports.SelectMood, {}) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ label: "", wrapperCol: { offset: 0, span: 24 }, className: "text-right" }, { children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, __assign({ actionName: "api.post.attachToMoods", type: "primary", htmlType: "submit" }, { children: "Share" })) }))] })));
};
exports.SelectMoodForm = SelectMoodForm;
