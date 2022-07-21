import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form } from "antd";
import { ItemGrid } from "./ItemGrid";
import { MoodCreateModal } from "../Pages/Mood/MoodCreate";
import { MoodFolderWidget } from "./MoodWidget";
import { ProgressButton } from "./ProgressButton";
import { omit } from "lodash";
import { useAppState } from "../overmind";
import { useState } from "react";
export const SelectMood = ({ moods, onChange, limit, title }) => {
    const [_value, _setValue] = useState({});
    const state = useAppState();
    const filteredMoods = state.api.auth.moods.filter(() => true);
    const checkMoods = moods === undefined ? filteredMoods || [] : moods.filter((m) => m.title !== "My uploads");
    const toggle = (ni) => {
        if (!ni.id)
            return;
        const nv = _value[ni.id || ""] ? { ...omit(_value, [ni.id]) } : { ..._value, [ni.id]: ni };
        _setValue(nv);
        onChange && onChange(Object.values(nv));
    };
    const createMood = (_jsx("div", { style: {
            textAlign: "center",
            color: "white",
            width: "100%",
            border: "none",
            padding: "10px",
        }, children: _jsx("div", { style: { width: "90%", margin: "0 auto" }, children: _jsx(MoodCreateModal, { onCreated: (v) => v?.id && toggle(v) }) }) }));
    return (_jsx(ItemGrid, { items: [{}, ...checkMoods], limit: limit, 
        // titleLink="/save-folder"
        title: "Add to a folder", 
        // setSelectedFolder={setSelectedFolder}
        // selectedFolder={selectedFolder}
        render: (m, index) => {
            return !index ? (createMood) : (_jsx(MoodFolderWidget
            // setSelectedFolder={setSelectedFolder}
            // selectedFolder={selectedFolder}
            , { 
                // setSelectedFolder={setSelectedFolder}
                // selectedFolder={selectedFolder}
                mood: m, onClick: () => toggle(m), selected: !!_value[m.id || ""] }));
        } }));
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
export const SelectMoodForm = ({ title, onFinish }) => (_jsxs(Form, { className: "app-main-full-width", onFinish: onFinish, children: [_jsx(Form.Item, { name: "moods", style: { marginBottom: "40px" }, children: title ? _jsx(SelectMood, { title: title }) : _jsx(SelectMood, {}) }), _jsx(Form.Item, { label: "", wrapperCol: { offset: 0, span: 24 }, className: "text-right", children: _jsx(ProgressButton, { actionName: "api.post.attachToMoods", type: "primary", htmlType: "submit", progressText: "Adding to moods...", children: "Share" }) })] }));
//# sourceMappingURL=SelectMood.js.map