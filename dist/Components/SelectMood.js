"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMoodForm = exports.SelectMood = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const MoodWidget_1 = require("./MoodWidget");
const lodash_1 = require("lodash");
const react_1 = require("react");
const ItemGrid_1 = require("./ItemGrid");
const overmind_1 = require("../overmind");
const antd_1 = require("antd");
const ProgressButton_1 = require("./ProgressButton");
const MoodCreate_1 = require("../Pages/Mood/MoodCreate");
const SelectMood = ({ moods, onChange, limit, title }) => {
    const [_value, _setValue] = (0, react_1.useState)({});
    const [selectedFolder, setSelectedFolder] = (0, react_1.useState)(false);
    const state = (0, overmind_1.useAppState)();
    const checkMoods = moods === undefined ? state.api.auth.moods || [] : moods;
    const toggle = (ni) => {
        if (!ni.id)
            return;
        const nv = _value[ni.id || ""]
            ? { ...(0, lodash_1.omit)(_value, [ni.id]) }
            : { ..._value, [ni.id]: ni };
        _setValue(nv);
        onChange && onChange(Object.values(nv));
    };
    const createMood = (0, jsx_runtime_1.jsx)("div", { style: {
            textAlign: "center",
            color: "white",
            width: "100%",
            border: "none",
            padding: "10px",
        }, children: (0, jsx_runtime_1.jsx)("div", { style: { width: "90%", margin: "0 auto" }, children: (0, jsx_runtime_1.jsx)(MoodCreate_1.MoodCreateModal, {}) }) });
    return ((0, jsx_runtime_1.jsx)(ItemGrid_1.ItemGrid, { items: [{}, ...checkMoods], limit: limit, 
        // titleLink="/save-folder"
        title: "Select a folder to share", setSelectedFolder: setSelectedFolder, selectedFolder: selectedFolder, render: (m, index) => (!index ?
            createMood :
            (0, jsx_runtime_1.jsx)(MoodWidget_1.MoodFolderWidget, { setSelectedFolder: setSelectedFolder, selectedFolder: selectedFolder, mood: m, onClick: () => toggle(m), selected: !!_value[m.id || ""] })) }));
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
const SelectMoodForm = ({ title, onFinish, }) => ((0, jsx_runtime_1.jsxs)(antd_1.Form, { className: "app-main-full-width", onFinish: onFinish, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "moods", style: { marginBottom: "40px" }, children: title ? (0, jsx_runtime_1.jsx)(exports.SelectMood, { title: title }) : (0, jsx_runtime_1.jsx)(exports.SelectMood, {}) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "", wrapperCol: { offset: 0, span: 24 }, className: "text-right", children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "api.post.attachToMoods", type: "primary", htmlType: "submit", progressText: "Adding to moods...", children: "Share" }) })] }));
exports.SelectMoodForm = SelectMoodForm;
//# sourceMappingURL=SelectMood.js.map